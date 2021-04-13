import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMovieDTO } from './DTO/update.movie.dto';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }
  getOne(id: number): Movie {
    // +id forces id which is typeof string to be typeof number
    const movie_array = this.movies.find((ele) => ele.id === id);
    if (!movie_array) {
      throw new NotFoundException(`404 Error : id ${id} doesn't exist.`);
    }
    return movie_array;
  }

  deleteOne(id: number): void {
    this.getOne(id);
    this.movies = this.movies.filter((ele) => ele.id !== id);
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, data: UpdateMovieDTO) {
    const movies = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movies, ...data });
  }
}
