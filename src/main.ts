import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UniqueConstraintFilter } from './share/filters/unique-constraint.filter';

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
  app.useGlobalFilters(new UniqueConstraintFilter());
  await app.listen(4000);
}
bootstrap();
