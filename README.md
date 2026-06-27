# HR Salary Management

This project provides a NestJS GraphQL boilerplate with Postgres via Docker Compose, TypeORM migrations, and GraphQL schema generation.

## Prerequisites

- Node.js 20+
- npm
- Docker Desktop or Docker Engine

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment

Copy the sample environment files and adjust values if needed:

```bash
cp .env.sample .env
cp docker.env.sample docker.env
```

## 3. Start Postgres with Docker Compose

```bash
npm run docker:up
```

Or using docker compose directly:

```bash
docker compose up -d
```

## 4. Run TypeORM migrations

Run pending migrations:

```bash
npm run migration:run
```

Generate a new migration:

```bash
npm run migration:generate --name=MigrationName
```

Revert the last migration:

```bash
npm run migration:revert
```

## 5. Generate GraphQL schema types

To generate TypeScript definitions from the GraphQL schema files (`src/**/graphql/*.graphql`):

```bash
npm run graphql:generate
```

This will write the generated types to `src/schema/graphql.schema.ts`.

## 6. Run the application

```bash
npm run start:dev
```

The GraphQL playground will be available at:

```text
http://localhost:4000/graphql
```
*(or whichever port is defined as `APP_PORT` in your `.env` file)*
