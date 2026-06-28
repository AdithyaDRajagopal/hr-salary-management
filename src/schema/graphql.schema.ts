/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export class PaginationInput {
  limit?: Nullable<number>;
  offset?: Nullable<number>;
  sortBy?: Nullable<string>;
  sortOrder?: Nullable<SortOrder>;
}

export class EmployeeFilter {
  department?: Nullable<string>;
  country?: Nullable<string>;
  isActive?: Nullable<boolean>;
  search?: Nullable<string>;
}

export class CreateEmployeeInput {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  department: string;
  salary: number;
  currency: string;
  startDate: string;
  isActive?: Nullable<boolean>;
}

export class UpdateEmployeeInput {
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  email?: Nullable<string>;
  country?: Nullable<string>;
  department?: Nullable<string>;
  salary?: Nullable<number>;
  currency?: Nullable<string>;
  startDate?: Nullable<string>;
  isActive?: Nullable<boolean>;
  createdAt?: Nullable<Date>;
  updatedAt?: Nullable<Date>;
}

export class Employee {
  id?: Nullable<string>;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  email?: Nullable<string>;
  country?: Nullable<string>;
  department?: Nullable<string>;
  salary?: Nullable<number>;
  currency?: Nullable<string>;
  startDate?: Nullable<string>;
  isActive?: Nullable<boolean>;
}

export class GetAllEmployeesResponse {
  data?: Nullable<Nullable<Employee>[]>;
  total?: Nullable<number>;
}

export abstract class IQuery {
  abstract getAllEmployees(
    filter?: Nullable<EmployeeFilter>,
    pagination?: Nullable<PaginationInput>,
  ):
    | Nullable<GetAllEmployeesResponse>
    | Promise<Nullable<GetAllEmployeesResponse>>;

  abstract getEmployeeById(
    id: string,
  ): Nullable<Employee> | Promise<Nullable<Employee>>;
}

export abstract class IMutation {
  abstract createEmployee(
    input: CreateEmployeeInput,
  ): Nullable<Employee> | Promise<Nullable<Employee>>;

  abstract updateEmployee(
    id: string,
    input: UpdateEmployeeInput,
  ): Nullable<Employee> | Promise<Nullable<Employee>>;

  abstract deleteEmployee(
    id: string,
  ): Nullable<Employee> | Promise<Nullable<Employee>>;
}

type Nullable<T> = T | null;
