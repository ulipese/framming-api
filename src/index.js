const express = require("express");
const router = require("./routes");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("The server is running at port 3000");
});
