const express = require("express");
const queryRequests = require("../utilities/queryRequests")
const CONSTANTS = require('../config')

const router = express.Router();

router.get("/shortUrls", function (req, res) {
  try {
    queryRequests.getShortUrls(res)
  } catch (error) {
    res.status(408).send({ message: CONSTANTS.SERVER_ERROR_DB_CONNECTION });
  }
});

router.get("/:id", function (req, res) {
  const id = req.params.id;
  try {
    queryRequests.getShortUrlById(res , id)
  } catch (error) {
    res.status(408).send({ message: CONSTANTS.SERVER_ERROR_DB_CONNECTION });
  }
});

router.post("/shortUrl", function (req, res) {
  const shortUrlData = req.body;

  try {
    queryRequests.createShortUrl(res, shortUrlData)
  } catch (error) {
    res.status(408).send({ message: CONSTANTS.SERVER_ERROR_DB_CONNECTION });
  }
});

router.delete("/shortUrl/:id", function (req, res) {
  const id = req.params.id;
  try {
    queryRequests.deleteShortUrl(res , id)
  } catch (error) {
    res.status(408).send({ message: CONSTANTS.SERVER_ERROR_DB_CONNECTION });
  }
});

module.exports = router;