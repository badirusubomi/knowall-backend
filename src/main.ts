import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    }),
  );

  // const cacheMicroService = new CacheService():

  // connect message queueing service
  const queueService = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: config.get('redis'),
  });

  // const rmqService = app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: config.get('rmq'),
  // });

  app.enableCors();

  await app.startAllMicroservices();

  const port = config.get('port') ?? 3000;
  await app.listen(port, () => {
    console.log(`Knowall Backend Server Running on port -> ${port} `);
  });
}
bootstrap();
