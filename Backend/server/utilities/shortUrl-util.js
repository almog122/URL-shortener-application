const ShortUrl = require("../model/shortUrlSchema");
const constants = require('../constants')

function validateUrl(url) {
  var urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
	    '(\\#[-a-z\\d_]*)?$','i');

      return !urlPattern.test(url);
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