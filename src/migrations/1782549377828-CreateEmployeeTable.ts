import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployeeTable1782549377828 implements MigrationInterface {
    name = 'CreateEmployeeTable1782549377828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "country" character varying NOT NULL, "department" character varying NOT NULL, "salary" numeric NOT NULL, "currency" character varying NOT NULL, "startDate" date NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE ("email"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
