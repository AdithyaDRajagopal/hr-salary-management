import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entity/employee.entity";
import { EmployeeResolver } from "./resolver/employee.resolver";
import { EmployeeService } from "./service/employee.service";
import { EmployeeRepository } from "./repository/employee.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeResolver, EmployeeService, EmployeeRepository],
  exports: [EmployeeService],
})
export class EmployeeModule {}
