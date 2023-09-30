const db = require("../../database/index");
const { callMovieAPI } = require("../api/movieApi");

class MovieRepository {
  async findAll(language) {
    // const movies = await db.dbQuery("SELECT * FROM tbTeste", []);
    const movies = (await callMovieAPI("discover/movie", language)).data;
    return movies;
  }
  async findById(id, language) {
    const movie = (await callMovieAPI(`movie/${id}`, language)).data;
    return movie;
  }
  async create() {}
  async update() {}
  async delete() {}
}

module.exports = new MovieRepository();
