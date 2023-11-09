require("dotenv").config({ path: __dirname + "/./../../../.env" });
const axios = require("axios").default;

const callIconAPI = async (path) => {
  try {
    const request = await axios({
      method: "post",
      url: `https://api.imgbb.com/1/upload`,
      params: {
        expiration: 600,
        key: process.env.API_KEY,
        image: path,
      },
    });

    return request;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { callIconAPI };
