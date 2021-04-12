import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateMovieDTO } from './DTO/update.movie.dto';
import { Movie } from './entities/movies.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') year: string) {
    if (!year) return 'year is not defined. this is an error.';
    return `year is after ${year}`;
  }

  @Get(':id')
  getOne(@Param('id') requiredID: number): Movie {
    return this.moviesService.getOne(requiredID);
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  delete(@Param('id') requiredID: number) {
    return this.moviesService.deleteOne(requiredID);
  }

  @Patch(':id')
  patch(@Param('id') requiredID: number, @Body() updates: UpdateMovieDTO) {
    return this.moviesService.update(requiredID, updates);
  }
}
