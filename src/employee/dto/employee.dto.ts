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
}
