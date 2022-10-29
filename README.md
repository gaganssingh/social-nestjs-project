# Server for Social Media App

- NestJS
- Prisma
- TypeScript
- PostgreSQL
- Docker
- Authentication using JWTs
- Full E2E testing of business routes

### App configuration:

- Application configuration (including loading of proper .env files) is located in:
  ```
  src/app/configuration/configuration.module.ts
  ```
- Database configuration is located in:
  ```
  src/app/database/database.module.ts
  ```

### How to run the dev server:

1. Rename `example.env.dev` to `.env.dev`, which has pre-filled database connection information matching the docker-compose.yml file.
2. Ensure that docker is installed and running. This project requires docker-compose.
3. Then run the database docker-container, and the dev server using:
   ```
   npm run db:dev:restart
   npm run start:dev
   ```

### Testing suite:

Only E2E tests are supported.

1. Rename `example.env.test` to `.env.test`, which has pre-filled database connection information.
2. To run the e2e tests: `npm run test:e2e`
   Note: This will automatically run the test docker-container, before running the end-to-end tests.
