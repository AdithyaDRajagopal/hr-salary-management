import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../entity/employee.entity';
import { EmployeeFilterInput } from '../dto/employee.dto';
import { PaginationInput } from '../../common/dto/common.dto';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  findAll(filter?: EmployeeFilterInput, pagination?: PaginationInput): Promise<Employee[]> {
    const query = this.repository.createQueryBuilder('employee')
      .orderBy('employee.createdAt', 'DESC');

    if (filter) {
      const { country, department } = filter;
      if (country) {
        query.andWhere('employee.country = :country', { country });
      }
      if (department) {
        query.andWhere('employee.department = :department', { department });
      }
    }

    const limit = pagination?.limit ?? 50;
    const offset = pagination?.offset ?? 0;
    query.limit(limit).offset(offset);
    return query.getMany();
  }

  findById(id: string): Promise<Employee | null> {
    return this.repository.findOne({ where: { id } });
  }

  create(employee: Partial<Employee>): Promise<Employee> {
    const newEmployee = this.repository.create(employee);
    return this.repository.save(newEmployee);
  }

  async update(id: string, employee: Partial<Employee>): Promise<Employee | null> {
    await this.repository.update(id, employee);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
