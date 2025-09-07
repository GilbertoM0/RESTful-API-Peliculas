import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {}

  //@Post()
  @MessagePattern({cmd: 'create_pelicula'})
  create(@Payload() createPeliculaDto: CreatePeliculaDto) {
    return this.peliculasService.create(createPeliculaDto);
  }

  //@Get()
  @MessagePattern({cmd: 'find_all_pelicula'})
  findAll(@Payload() paginationDto:PaginationDto) {
    return this.peliculasService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({cmd: 'find_one_pelicula'})
  findOne(@Payload('id',ParseIntPipe) id: number) {
    return this.peliculasService.findOne(+id);
  }

  //@Patch(':id')
  @MessagePattern({cmd: 'update_pelicula'})
  update(@Payload() updatePeliculaDto: UpdatePeliculaDto) {
    return this.peliculasService.update(updatePeliculaDto.id, updatePeliculaDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd: 'delete_pelicula'})
  remove(@Payload('id',ParseIntPipe) id: number) {
    return this.peliculasService.remove(+id);
  }
}
