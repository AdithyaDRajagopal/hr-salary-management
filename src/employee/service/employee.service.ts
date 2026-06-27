import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from '../repository/employee.repository';
import { Employee } from '../entity/employee.entity';
import { CreateEmployeeInput, UpdateEmployeeInput, EmployeeFilterInput } from '../dto/employee.dto';
import { PaginationInput } from '../../common/dto/common.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async getAllEmployees(filter?: EmployeeFilterInput, pagination?: PaginationInput): Promise<Employee[]> {
    return this.employeeRepository.findAll(filter, pagination);
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    return employee;
  }

  async createEmployee(input: CreateEmployeeInput): Promise<Employee> {
    return this.employeeRepository.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      country: input.country,
      department: input.department,
      salary: input.salary,
      currency: input.currency,
      startDate: input.startDate,
      isActive: input.isActive ?? true,
    });
  }

  async updateEmployee(id: string, input: UpdateEmployeeInput): Promise<Employee> {
    await this.findOne(id);
    const updated = await this.employeeRepository.update(id, input);
    if (!updated) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return updated;
  }

  async deleteEmployee(id: string): Promise<Employee> {
    return this.updateEmployee(id, { isActive: false });
  }
}
