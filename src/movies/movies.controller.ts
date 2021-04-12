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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return movies';
  }

  @Get('search')
  search(@Query('year') year: string) {
    if (!year) return 'year is not defined. this is an error.';
    return `year is after ${year}`;
  }

  @Get(':id')
  getOne(@Param('id') requiredID: string) {
    return `id is ${requiredID}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  delete(@Param('id') requiredID: string) {
    return `required id is ${requiredID}`;
  }

  @Patch(':id')
  patch(@Param('id') requiredID: string, @Body() updates) {
    return {
      requestedMovie: requiredID,
      ...updates,
    };
  }
}
