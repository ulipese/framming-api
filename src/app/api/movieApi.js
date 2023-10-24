require("dotenv").config({ path: __dirname + "/./../../../.env" });
const axios = require("axios").default;
const https = require("https");

const callMovieAPI = async (path, language = "pt-BR") => {
  try {
    const request = await axios({
      method: "get",
      url: `https://api.themoviedb.org/3/${path}`,
      timeout: 60000, //optional
      httpsAgent: new https.Agent({ keepAlive: true }),
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
