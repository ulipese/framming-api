const db = require("../../database/index");
const { callMovieAPI } = require("../api/movieApi");

class MovieRepository {
  async findAll(language, isNational) {
    if (!isNational) {
      const movies = (await callMovieAPI("discover/movie", language)).data.results;
      return movies;
    }

    const movies = await db.dbQuery("SELECT * FROM tbFilmeNacional;");
    return movies;
  }
  async findById(id, language, isNational) {
    if (!isNational) {
      const movie = (await callMovieAPI(`movie/${id}`, language)).data;
      return movie;
    }
    const movies = await db.dbQuery(
      "SELECT * FROM tbFilmeNacional WHERE idFilme = ?;",
      [id]
    );
    return movies;
  }
  async create() {}
  async update() {}
  async delete() {}
}

module.exports = new MovieRepository();
