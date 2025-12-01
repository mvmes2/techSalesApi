import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { DeobfuscateTokenMiddleware } from '@app/auth/middlewares/unshadow-token.middleware';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  // app.use(new DeobfuscateTokenMiddleware().use);

    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Swagger documentation to Tech Manager By Mantovani Tech Solutions')
    .setDescription(
      "Initial App")
    .setVersion('1.0')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Middleware para registrar todas as solicitações HTTP
  app.use((req, res, next) => {
    Logger.log(`${req.method} ${req.url} - Request received`);
  
    res.on('finish', () => {
      Logger.log(`${req.method} ${req.url} - ${res.statusCode} - Response sent`);
    });
  
    next();
  });


  await app.listen(3331);
}
bootstrap();
