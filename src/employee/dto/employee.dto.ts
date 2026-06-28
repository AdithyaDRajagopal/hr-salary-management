import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Employee {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  country: string;

  @Field()
  department: string;

  @Field(() => Number)
  salary: number;

  @Field()
  currency: string;

  @Field()
  startDate: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class GetAllEmployeesResponse {
  @Field(() => [Employee])
  data: Employee[];

  @Field(() => Number)
  total: number;
}

@InputType()
export class CreateEmployeeInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  country: string;

  @Field()
  department: string;

  @Field(() => Number)
  salary: number;

  @Field()
  currency: string;

  @Field()
  startDate: string;

  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;
}

@InputType()
export class UpdateEmployeeInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  department?: string;

  @Field(() => Number, { nullable: true })
  salary?: number;

  @Field({ nullable: true })
  currency?: string;

  @Field({ nullable: true })
  startDate?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}

@InputType()
export class EmployeeFilterInput {
  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  department?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  search?: string;
}

@ObjectType()
export class SalaryStats {
  @Field(() => Number)
  average: number;

  @Field(() => Number)
  median: number;

  @Field(() => Number)
  min: number;

  @Field(() => Number)
  max: number;

  @Field(() => Number)
  total: number;

  @Field(() => Number)
  count: number;
}

@ObjectType()
export class CountryBreakdown {
  @Field()
  country: string;

  @Field(() => Number)
  count: number;

  @Field(() => Number)
  averageSalary: number;

  @Field(() => Number)
  totalSalary: number;
}

@ObjectType()
export class DepartmentBreakdown {
  @Field()
  department: string;

  @Field(() => Number)
  count: number;

  @Field(() => Number)
  averageSalary: number;

  @Field(() => Number)
  totalSalary: number;
}

@ObjectType()
export class TopEarner {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  department: string;

  @Field()
  country: string;

  @Field(() => Number)
  salary: number;

  @Field()
  currency: string;
}

@ObjectType()
export class DashboardData {
  @Field(() => Number)
  totalEmployees: number;

  @Field(() => Number)
  activeEmployees: number;

  @Field(() => Number)
  inactiveEmployees: number;

  @Field(() => Number)
  totalPayroll: number;

  @Field(() => SalaryStats)
  salaryStats: SalaryStats;

  @Field(() => [CountryBreakdown])
  byCountry: CountryBreakdown[];

  @Field(() => [DepartmentBreakdown])
  byDepartment: DepartmentBreakdown[];

  @Field(() => [TopEarner])
  topEarners: TopEarner[];
}
