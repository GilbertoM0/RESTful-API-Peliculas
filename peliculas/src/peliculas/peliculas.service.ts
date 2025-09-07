import { HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PeliculasService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductService')
  onModuleInit() {
    this.$connect();
    this.logger.log("Base de datos conectada");
  }
  
  create(createPeliculaDto: CreatePeliculaDto) {
    return this.pelicula.create({
      //Desestructurar la data
      data: createPeliculaDto

    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalItems = await this.pelicula.count();// con esto lo que estoy haciendo es contar los productos que estan disponibles
    const lastPage = Math.ceil(totalItems / limit); //que hace el ceil: es redondear hacia arriba
 
    // Verifico si la página esta fuera del rango para mandarle que esta wey
    if (page > lastPage || page < 1) {
      throw new NotFoundException(`Página #${page} no encontrada`); 
    }
 
    return {
      data: await this.pelicula.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      meta: {
        total: totalItems,
        page: page, 
        lastPage: lastPage,
      }
    };
  }

  async findOne(id: number) {
    const product = await this.pelicula.findFirst({where:{id}})
    if(!product){
      throw new RpcException({
        message: `Product with id ${id} not found`,
        status: HttpStatus.BAD_REQUEST

      }); //Template string
    }
    return product;
  }

  async update(id: number, updatePeliculaDto: UpdatePeliculaDto) {
    const {id:__,...data} = updatePeliculaDto      //desestructurar para que data tenga todos los elementos menos id
    await this.findOne(id);
    return this.pelicula.update({
      where:{id},
      data: data,
      

    })
  }

  async remove(id: number) {
    await this.findOne(id);

     return this.pelicula.delete({
       where: {id}
     });
     

      
     
  }
}
 