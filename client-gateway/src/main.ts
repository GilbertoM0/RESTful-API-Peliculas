import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const looger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.setGlobalPrefix('api');
  app.useGlobalPipes( 
    new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true, 
    }) 
   );


   app.useGlobalFilters(new RpcCustomExceptionFilter)
  await app.listen(envs.port);
  looger.log(`Gateway corriendo en el Puerto #${envs.port}`)
}
bootstrap();
