import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      expect(service.getAll()).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie object', () => {
      service.create({
        title: 'For Test...',
        genres: ['testing'],
        year: 2021,
      });
      const movie = service.getOne(1);
      expect(movie).toBeInstanceOf(Object);
    });
    it('should throw an error if there ain`t a movie to get', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', () => {
      service.create({
        title: 'For Test...',
        genres: ['testing'],
        year: 2021,
      });
      const movieList = service.getAll().length;
      service.deleteOne(1);
      expect(service.getAll().length + 1).toEqual(movieList);
    });
    it('should return an error if there ain`t a movie to delete', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const movieList = service.getAll().length;
      service.create({
        title: 'For Test...',
        genres: ['testing'],
        year: 2022,
      });
      expect(service.getAll().length).toEqual(movieList + 1);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'For Test...',
        genres: ['testing'],
        year: 2022,
      });
      service.update(1, { year: 2025 });
      expect(service.getOne(1).year).toEqual(2025);
    });
    it('should return an error if there ain`t a movie to update', () => {
      try {
        service.update(999, { title: 'this should be a not found movie' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
