import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Csak a DTO-ban definiált mezőket engedi át
      forbidNonWhitelisted: true, // Hibát dob, ha más mezőt küldenek
      transform: true, // Automatikusan a DTO osztály példányává alakítja
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
