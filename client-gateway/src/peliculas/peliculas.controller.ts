import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';
import { PaginationDto } from 'src/common';
import { PRODUCT_MICROSERVICE } from 'src/config';
@Controller('peliculas')
export class PeliculasController {
  constructor(
    @Inject(PRODUCT_MICROSERVICE) private readonly productClient: ClientProxy,) {}
    //Con esto de hace la injeccion del token para que nos authentique
 
  @Post()
  createProduct(@Body() createPeliculaDto: CreatePeliculaDto) {
   return this.productClient.send(
    {cmd: 'create_pelicula'}, 
    createPeliculaDto
   );
  }
 

  @Get()
  findAllProducts(@Query()PaginationDto: PaginationDto)
  {
    return this.productClient.send({cmd: 'find_all_pelicula'},PaginationDto);
  }
 
  @Get(':id')
  async findOne(@Param('id')id:string){
    try{
      const product = await firstValueFrom(
        this.productClient.send(
        {cmd: 'find_one_pelicula'},
        {id}
      ) );
      return product;
    }
    catch(error)
    {
      throw new RpcException(error)
    }




 
  }

  @Patch(':id')
  patchProduct(@Param('id', ParseIntPipe)id:number, 
              @Body()updatePeliculaDto: UpdatePeliculaDto){
    return this.productClient.send( 
      {cmd: 'update_pelicula'},
        { id, ...updatePeliculaDto } 
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id',ParseIntPipe)id:number){
    return this.productClient.send(
      { cmd: 'delete_pelicula' }, // Comando que envía la intención al microservicio
      { id } // Datos enviados al microservicio
    );
  }


}

