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
  app.enableCors({
    origin: 'http://localhost:5173', // Vite/React/Angular origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // ha cookie-t vagy token-t küldesz
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
