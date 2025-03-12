import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // ✅ Enable CORS
   app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from any origin (Change to specific origin for security)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Allow cookies if needed
  });

  await app.listen(5000);
}
bootstrap();
