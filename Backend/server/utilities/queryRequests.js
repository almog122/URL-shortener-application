const ShortUrl = require("../model/shortUrlSchema");
const shortUrlUtil = require("./shortUrlUtil");
const shortid = require("shortid");
const CONSTANTS = require("../config.js");

const getShortUrls = function (res) {
  ShortUrl.find({})
    .then(function (shortUrls) {
      res.send(shortUrls);
    })
    .catch(function () {
      res.status(500).send({ message: "Failed to get Urls" });
    });
};

const getShortUrlById = function (res, id) {
  ShortUrl.findOne({ urlId: id })
    .then(function (shortUrl) {
      res.redirect(shortUrl.originalUrl);
    })
    .catch(function () {
      res
        .status(400)
        .send({ message: `Couldn't find collation with id: ${id} ` });
    });
};

const createShortUrl = async function (res, shortUrlData) {
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

  const urlId = shortid.generate();
  let shortUrlSchema = await shortUrlUtil.getShortUrlSchema(shortUrlData, urlId);
  shortUrlSchema.save().then(() => {
      res.status(201).send({ message: `Successfully generated` });
    }).catch(() => {
      res.status(400).send({ message: `Failed to generate` });
    });
};

const deleteShortUrl = function(res , id){
    ShortUrl.deleteOne({ urlId : id })
    .then((deleted) => {
      if (deleted.deletedCount === 1) {
        res.send({ message: `Successfully deleted from DB` });
      } else {
        res.status(400).send({ message: `Couldn't delete from DB` });
      }
    })
    .catch(function (error) {
      res.status(500).send({ message: "Internal Server Error" });
    });
}

module.exports = { getShortUrls, getShortUrlById , createShortUrl , deleteShortUrl };