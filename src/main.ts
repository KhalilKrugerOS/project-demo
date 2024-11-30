import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     transformOptions: { enableImplicitConversion: true },
  //     forbidNonWhitelisted: false,
  //     whitelist: true,
  //   }),
  // );

  await app.listen(3000);
}
bootstrap();
