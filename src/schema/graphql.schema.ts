
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Employee {
    id: string;
    name: string;
    email: string;
    position: string;
    salary: number;
}

export abstract class IQuery {
    abstract getAllEmployees(): Employee[] | Promise<Employee[]>;
}

type Nullable<T> = T | null;
