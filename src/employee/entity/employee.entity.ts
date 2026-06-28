import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../common/entity/base.entity";

@Entity("employees")
export class Employee extends BaseEntity {
  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  lastName: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  country: string;

  @Column({ type: "varchar" })
  department: string;

  @Column({ type: "numeric" })
  salary: number;

  @Column({ type: "varchar" })
  currency: string;

  @Column({ type: "date" })
  startDate: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;
}
