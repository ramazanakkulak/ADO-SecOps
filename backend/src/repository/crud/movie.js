const Movie = require('../../models/movieModel');

class MovieRepository {
  async createMovie(movieData) {
    return await Movie.create(movieData);
  }

  async findAll() {
    return await Movie.find({});
  }

  async findByTitle(title) {
    return await Movie.findOne({ title: title });
  }

  async deleteMovie(movieId) {
    return await Movie.findByIdAndDelete(movieId);
  }

  async getMovie(movieId) {
    return await Movie.findById(movieId);
  }
}

module.exports = new MovieRepository();
