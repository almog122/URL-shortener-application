const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortUrlSchema = new Schema({
  originalUrl : { type: String, required: true },
  shortUrl : { type: String, required: true },
  urlId: { type: String, required: true}
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
module.exports = ShortUrl;