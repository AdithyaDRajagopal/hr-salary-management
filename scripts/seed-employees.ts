import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Employee } from '../src/employee/entity/employee.entity';

dotenv.config({ path: path.join(__dirname, '../.env') });

const TOTAL_EMPLOYEES = 10_000;
const BATCH_SIZE = 1_000;

const COUNTRIES = [
  { code: 'US', weight: 0.4 },
  { code: 'UK', weight: 0.25 },
  { code: 'India', weight: 0.25 },
  { code: 'Australia', weight: 0.1 },
];

const DEPARTMENTS = ['Engineering', 'Finance', 'HR', 'Sales', 'Marketing'];
const CURRENCIES = ['USD', 'GBP', 'INR', 'AUD'];

function weightedPick(): string {
  const random = Math.random();
  let cumulative = 0;
  for (const country of COUNTRIES) {
    cumulative += country.weight;
    if (random <= cumulative) return country.code;
  }
  return 'US';
}

/**
 * Generates a guaranteed-unique email by appending a short UUID segment.
 * Format: firstname.lastname.<uuid-fragment>@domain.com
 * This avoids the retry loop entirely — no collisions possible.
 */
function uniqueEmail(firstName: string, lastName: string): string {
  const uid = uuidv4().replace(/-/g, '').slice(0, 8); // e.g. "a1b2c3d4"
  const domain = faker.internet.domainName();
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${uid}@${domain}`;
}

async function bootstrap() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'hr_salary_management',
    entities: [Employee],
    synchronize: false,
  });

  await dataSource.initialize();
  console.log('Database connected.');

  const employeeRepository = dataSource.getRepository(Employee);
  const totalBatches = Math.ceil(TOTAL_EMPLOYEES / BATCH_SIZE);

  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    const batchCount = Math.min(BATCH_SIZE, TOTAL_EMPLOYEES - batchIndex * BATCH_SIZE);

    const batch = Array.from({ length: batchCount }, () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      return {
        firstName,
        lastName,
        email: uniqueEmail(firstName, lastName),
        country: weightedPick(),
        department: faker.helpers.arrayElement(DEPARTMENTS),
        salary: faker.number.int({ min: 30_000, max: 200_000 }),
        currency: faker.helpers.arrayElement(CURRENCIES),
        startDate: faker.date.past({ years: 10 }).toISOString().slice(0, 10),
        isActive: faker.datatype.boolean(),
      };
    });

    await employeeRepository.insert(batch);

    console.log(`✓ Batch ${batchIndex + 1}/${totalBatches} inserted (${batchCount} rows)`);
  }

  console.log(`\n✅ Seeded ${TOTAL_EMPLOYEES} employees successfully.`);
  await dataSource.destroy();
}

bootstrap().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});