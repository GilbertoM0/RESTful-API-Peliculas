import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreatePeliculaDto {
    @IsString()
    public name: string;
    @IsNumber()
    @Type(()=> Number)
    public year: number;
    @IsString()
    public type: string;
    @IsString()
    public image_url: string;
}
