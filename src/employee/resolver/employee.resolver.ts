import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { EmployeeService } from "../service/employee.service";
import {
  CreateEmployeeInput,
  Employee,
  EmployeeFilterInput,
  GetAllEmployeesResponse,
  UpdateEmployeeInput,
} from "../dto/employee.dto";
import { PaginationInput } from "../../common/dto/common.dto";

@Resolver(Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => GetAllEmployeesResponse)
  async getAllEmployees(
    @Args("filter", { nullable: true }) filter?: EmployeeFilterInput,
    @Args("pagination", { nullable: true }) pagination?: PaginationInput,
  ): Promise<GetAllEmployeesResponse> {
    return this.employeeService.getAllEmployees(filter, pagination);
  }

  @Query(() => Employee)
  async getEmployeeById(@Args("id") id: string): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Mutation(() => Employee)
  async createEmployee(
    @Args("input") input: CreateEmployeeInput,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(input);
  }

  @Mutation(() => Employee)
  async updateEmployee(
    @Args("id") id: string,
    @Args("input") input: UpdateEmployeeInput,
  ): Promise<Employee> {
    return this.employeeService.updateEmployee(id, input);
  }

  @Mutation(() => Employee)
  async deleteEmployee(@Args("id") id: string): Promise<Employee> {
    return this.employeeService.deleteEmployee(id);
  }
}
