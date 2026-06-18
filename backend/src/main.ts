import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Дозволяємо запити з інших портів (наприклад, з React)

  await app.listen(3000);
}
bootstrap();
