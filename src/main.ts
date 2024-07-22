import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaExceptionFilter } from './share/filters/unique-constraint.filter';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  //se puede cambiar la ruta con otro nombre de ser necesario
  const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  app.useGlobalFilters(new PrismaExceptionFilter());
  
  // Habilitar CORS
  app.enableCors({
    origin: ConfigService.get<string>('FRONTEND_URL'), // Origen permitido (tu frontend)
    methods: ConfigService.get<string>('FRONTEND_METHODS'),
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap();

