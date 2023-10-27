require("dotenv").config({ path: __dirname + "/./../../../.env" });
const axios = require("axios").default;

const callMovieAPI = async (path, language = "pt-BR") => {
  try {
    const request = await axios({
      method: "get",
      url: `https://api.themoviedb.org/3/${path}`,
      params: {
        api_key: process.env.API_KEY,
        language: language,
      },
    });
    return request;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { callMovieAPI };
