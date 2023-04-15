const express = require("express");
const queryRequests = require("../utilities/queryRequests")
const shortUrlUtil = require("../utilities/shortUrlUtil");
const CONSTANTS = require('../config')

const router = express.Router();

router.get("/shortUrls", async function (req, res) {
  try {
    const shortUrls = await queryRequests.getShortUrls()

    if(shortUrls === undefined || shortUrls.length === 0) {
      res.status(500).send({ message: "Failed to get Urls" });
      return
    }

    res.send(shortUrls);
  } catch (error) {
    res.status(408).send({ message: CONSTANTS.SERVER_ERROR_DB_CONNECTION });
  }
});

router.get("/shortUrl/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const shortUrl = await queryRequests.getShortUrlById(id)
    if(shortUrl === undefined) {
      res.status(400).send({ message: `Couldn't find url with id: ${id}`});
      return;
    }
    res.redirect(shortUrl.originalUrl);
  } catch (error) {
    res.status(408).send({ message: CONSTANTS.SERVER_ERROR_DB_CONNECTION });
  }
});

router.post("/shortUrl", async function (req, res) {
  const shortUrlData = req.body;
  const isValidUrl = await shortUrlUtil.isValidUrl(shortUrlData.originalUrl);
  const isExist = await shortUrlUtil.isShortUrlExist(shortUrlData.originalUrl);

  if (isExist) {
    res.status(409).send({ message: `${shortUrlData.originalUrl} already exist` });
    return;
  }
  if (!isValidUrl) {
    res.status(400).send({ message: `${shortUrlData.originalUrl} not a valid URL` });
    return;
  }

  try {
    queryRequests.createShortUrl(shortUrlData)
    res.status(201).send({message: 'Successfully created'});
  } catch (error) {
    res.status(408).send({ message: error });
  }
});

router.delete("/shortUrl/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const deletedUrl = await queryRequests.deleteShortUrl(id)
    if (deletedUrl.deletedCount === 1) {
      res.send({ message: `Successfully deleted from DB` });
    } else {
      res.status(400).send({ message: `Couldn't delete from DB` });
    }
  } catch (error) {
    res.status(408).send({ message: CONSTANTS.SERVER_ERROR_DB_CONNECTION });
  }
});

module.exports = router;