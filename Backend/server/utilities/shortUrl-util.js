const ShortUrl = require("../model/shortUrlSchema");
const constants = require('../conifg')

async function validateUrl(newUrl) {
  let givenURL ;
  try {
      givenURL = new URL (newUrl);
  } catch (error) {
     return false; 
  }
  return true;
}

const getShortUrlSchema = function (shortUrlData , urlId) {

  const shortUrlSchema = new ShortUrl({
    originalUrl : shortUrlData.originalUrl,
    shortUrl : `${constants.SHORT_URL_BASE}/${urlId}`,
    urlId : urlId
  });

  return shortUrlSchema;
};

module.exports = { getShortUrlSchema , validateUrl };