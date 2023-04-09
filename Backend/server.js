const express = require("express");
const bodyParser = require("body-parser");
const shortUrlApi = require("./server/routes/shortUrl-api");
const databaseManager = require("./server/utilities/db-connection");
const CONSTANTS = require("./server/constants");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  next()
})

app.use("/", shortUrlApi);

databaseManager.connectToDb()

app.listen(CONSTANTS.PORT, function () {
  console.log(`Server running on ${CONSTANTS.PORT}`);
});
