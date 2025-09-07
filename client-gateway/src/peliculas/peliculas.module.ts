import { Module } from '@nestjs/common';
import { PeliculasController } from './peliculas.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_MICROSERVICE } from 'src/config';

@Module({
  controllers: [PeliculasController],
  providers: [],
  imports: [

    ClientsModule.register([
      {name:PRODUCT_MICROSERVICE,
        transport: Transport.TCP,
        options:{
          host: envs.productsMicroserviceHost,
          port: envs.productsMicroservicePort
        }
      }
    ]),
  ]
})
export class PeliculasModule {}
