import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("APP_PORT", 4000);

  app.setGlobalPrefix("hr-salary-management/api");

  await app.listen(port);
  console.log(
    `Application is running on: http://localhost:${port}/hr-salary-management/api/graphql`,
  );
}

bootstrap();
