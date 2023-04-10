const ShortUrl = require("../model/shortUrlSchema");
const CONSTANTS = require('../config.js')

async function validateUrl(newUrl) {
  let givenURL ;
  try {
      givenURL = new URL (newUrl);
  } catch (error) {
     return false; 
  }
  return true;
}

const getShortUrlSchema = async function (shortUrlData , urlId) {

  let domainUrl = new URL (shortUrlData.originalUrl);

  const shortUrlSchema = new ShortUrl({
    originalUrl : shortUrlData.originalUrl,
    shortUrl : `${CONSTANTS.SHORT_URL_BASE}/${urlId}`,
    urlId : urlId,
    domainImg: `${CONSTANTS.DOMAIN_LOGO_API_URL}/${domainUrl.hostname}/${CONSTANTS.DOMAIN_LOGO_API_SIZE}`,
    qrCode : `${CONSTANTS.QR_CODE_URL}/${domainUrl}`
  });

  return shortUrlSchema;
};

module.exports = { getShortUrlSchema , validateUrl };