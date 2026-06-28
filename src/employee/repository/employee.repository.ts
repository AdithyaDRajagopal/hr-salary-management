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
}
