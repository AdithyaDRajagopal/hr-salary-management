import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    GraphqlModule,
    EmployeeModule,
  ],
})
export class AppModule {}
