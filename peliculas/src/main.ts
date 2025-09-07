import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envs } from './config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  const logger = new Logger('Main');//y poner tcp
  const app = await NestFactory.createMicroservice<MicroserviceOptions>
  (AppModule,{

    transport: Transport.TCP,
    options:{

      port:envs.port,

    }

  });
  await app.listen();//aqui tendre que quitar el env
  logger.log(`Microservicio de Products corriendo en el Puerto: ${envs.port}`);
}
bootstrap();
