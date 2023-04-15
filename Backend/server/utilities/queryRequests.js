const ShortUrl = require("../model/shortUrlSchema");
const shortUrlUtil = require("./shortUrlUtil");
const shortid = require("shortid");
const CONSTANTS = require("../config.js");

const getShortUrls = async function () {
  const shortUrls = await ShortUrl.find({})
  return shortUrls
};

const getShortUrlById = async function (id) {
  const shortUrl = await ShortUrl.findOne({ urlId: id })
  return shortUrl
};

const createShortUrl = async function (shortUrlData) {
  const urlId = shortid.generate();
  let shortUrlSchema = await shortUrlUtil.getShortUrlSchema(shortUrlData, urlId);
  shortUrlSchema.save()
};

const deleteShortUrl = async function(id){
  const deletedUrl = await ShortUrl.deleteOne({ urlId : id })
  return deletedUrl
}

module.exports = { getShortUrls, getShortUrlById , createShortUrl , deleteShortUrl };