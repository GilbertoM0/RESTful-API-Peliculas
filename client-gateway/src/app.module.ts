import { Module } from '@nestjs/common';
import { PeliculasModule } from './peliculas/peliculas.module';

@Module({
  imports: [PeliculasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
