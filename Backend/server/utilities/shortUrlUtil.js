const ShortUrl = require("../model/shortUrlSchema");
const CONSTANTS = require('../config.js')

const isShortUrlExist = async function(originalUrl){
  let isExist = await ShortUrl.findOne({originalUrl : originalUrl})

  return isExist !== null ? true : false
}

const isValidUrl = async function(originalUrl) {
  let givenURL ;
  try {
      givenURL = new URL (originalUrl);
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

module.exports = { getShortUrlSchema , isValidUrl , isShortUrlExist};