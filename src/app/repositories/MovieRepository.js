const db = require("../../database/index");
const callMovieAPI = require("../api/movieApi");

class MovieRepository {
  async findAll() {
    // const movies = await db.dbQuery("SELECT * FROM tbTeste", []);
    const movies = (await callMovieAPI("discover/movie")).data;
    return movies;
  }
  async findById(id) {
    const movie = (await callMovieAPI(`/movie/${id}`)).data;
    return movie;
  }
}

module.exports = new MovieRepository();
