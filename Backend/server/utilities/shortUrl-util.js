const ShortUrl = require("../model/shortUrlSchema");

const getShortUrlSchema = function (shortUrl) {

  const shortUrlSchema = new ShortUrl({
    originalUrl : shortUrl.originalUrl,
    shortUrl : shortUrl.shortUrl,
  });

  return shortUrlSchema;
};

module.exports = { getShortUrlSchema };