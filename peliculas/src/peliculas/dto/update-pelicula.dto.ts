import { PartialType } from '@nestjs/mapped-types';
import { CreatePeliculaDto } from './create-pelicula.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdatePeliculaDto extends PartialType(CreatePeliculaDto) {


    @IsNumber()
    @IsPositive()
    id: number;

}
