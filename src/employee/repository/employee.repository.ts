import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "../entity/employee.entity";
import { EmployeeFilterInput } from "../dto/employee.dto";
import { PaginationInput } from "../../common/dto/common.dto";

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  findAll(
    filter?: EmployeeFilterInput,
    pagination?: PaginationInput,
  ): Promise<[Employee[], number]> {
    const query = this.repository.createQueryBuilder("employee");

    if (filter) {
      const { country, department, isActive, search } = filter;
      if (country) {
        query.andWhere("employee.country = :country", { country });
      }
      if (department) {
        query.andWhere("employee.department = :department", { department });
      }
      if (isActive !== undefined) {
        query.andWhere("employee.isActive = :isActive", { isActive });
      }
      if (search) {
        query.andWhere(
          "(employee.firstName ILIKE :search OR employee.lastName ILIKE :search OR employee.email ILIKE :search)",
          { search: `%${search}%` },
        );
      }
    }

    const limit = pagination?.limit ?? 50;
    const offset = pagination?.offset ?? 0;
    const sortBy = pagination?.sortBy ?? "createdAt";
    const sortOrder = pagination?.sortOrder ?? "DESC";

    query.orderBy(`employee.${sortBy}`, sortOrder);
    query.limit(limit).offset(offset);
    return query.getManyAndCount();
  }

  findById(id: string): Promise<Employee | null> {
    return this.repository.findOne({ where: { id } });
  }

  create(employee: Partial<Employee>): Promise<Employee> {
    const newEmployee = this.repository.create(employee);
    return this.repository.save(newEmployee);
  }

  async update(
    id: string,
    employee: Partial<Employee>,
  ): Promise<Employee | null> {
    await this.repository.update(id, employee);
    return this.findById(id);
  }

  async getDashboardData(): Promise<{
    totalEmployees: number;
    activeEmployees: number;
    inactiveEmployees: number;
    totalPayroll: number;
    salaryStats: {
      average: number;
      median: number;
      min: number;
      max: number;
      total: number;
      count: number;
    };
    byCountry: {
      country: string;
      count: number;
      averageSalary: number;
      totalSalary: number;
    }[];
    byDepartment: {
      department: string;
      count: number;
      averageSalary: number;
      totalSalary: number;
    }[];
    topEarners: Employee[];
  }> {
    const totalEmployees = await this.repository.count();
    const activeEmployees = await this.repository.count({ where: { isActive: true } });
    const inactiveEmployees = await this.repository.count({ where: { isActive: false } });

    const statsRaw = await this.repository
      .createQueryBuilder("employee")
      .select("AVG(employee.salary)", "average")
      .addSelect("MIN(employee.salary)", "min")
      .addSelect("MAX(employee.salary)", "max")
      .addSelect("SUM(employee.salary)", "total")
      .addSelect("COUNT(employee.id)", "count")
      .addSelect(
        "percentile_cont(0.5) WITHIN GROUP (ORDER BY employee.salary)",
        "median",
      )
      .getRawOne();

    const byCountryRaw = await this.repository
      .createQueryBuilder("employee")
      .select("employee.country", "country")
      .addSelect("COUNT(employee.id)", "count")
      .addSelect("AVG(employee.salary)", "averageSalary")
      .addSelect("SUM(employee.salary)", "totalSalary")
      .groupBy("employee.country")
      .orderBy("count", "DESC")
      .getRawMany();

    const byDepartmentRaw = await this.repository
      .createQueryBuilder("employee")
      .select("employee.department", "department")
      .addSelect("COUNT(employee.id)", "count")
      .addSelect("AVG(employee.salary)", "averageSalary")
      .addSelect("SUM(employee.salary)", "totalSalary")
      .groupBy("employee.department")
      .orderBy("count", "DESC")
      .getRawMany();

    const topEarners = await this.repository.find({
      order: { salary: "DESC" },
      take: 5,
    });

    return {
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalPayroll: Number(statsRaw.total ?? 0),
      salaryStats: {
        average: Number(statsRaw.average ?? 0),
        median: Number(statsRaw.median ?? 0),
        min: Number(statsRaw.min ?? 0),
        max: Number(statsRaw.max ?? 0),
        total: Number(statsRaw.total ?? 0),
        count: Number(statsRaw.count ?? 0),
      },
      byCountry: byCountryRaw.map((row) => ({
        country: row.country,
        count: Number(row.count),
        averageSalary: Number(row.averageSalary),
        totalSalary: Number(row.totalSalary),
      })),
      byDepartment: byDepartmentRaw.map((row) => ({
        department: row.department,
        count: Number(row.count),
        averageSalary: Number(row.averageSalary),
        totalSalary: Number(row.totalSalary),
      })),
      topEarners,
    };
  }
}
