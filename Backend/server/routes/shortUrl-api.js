const express = require("express");
const shortid = require("shortid");
const ShortUrl = require("../model/shortUrlSchema");
const shortUrlUtil = require("../utilities/shortUrl-util");

const router = express.Router();

router.get("/shortUrls", function (req, res) {
  try {
    ShortUrl.find({})
    .then(function (shortUrls) {
      res.send(shortUrls);
    })
    .catch(function () {
      res.status(500).send({ message: "Internal Server Error" });
    });
  } catch (error) {
    res.status(408).send({ message: "Failed to connect to DB" });
  }
});

router.get("/:id", function (req, res) {
  const id = req.params.id;
  try {
    ShortUrl.findOne({urlId : id})
      .then(function (shortUrl) {
        res.redirect(shortUrl.originalUrl);
      })
      .catch(function () {
        res.status(400).send({ message: `Couldn't find collation with id: ${id} `});
      });
  } catch (error) {
    res.status(408).send({ message: "Failed to connect to DB" });
  }
});

router.post("/shortUrl", async function (req, res) {
  const shortUrlData = req.body;

  const isValidUrl = await shortUrlUtil.validateUrl(shortUrlData.originalUrl)

  if(!isValidUrl){
    res.status(400).send({ message: `Failed to generate` });
    return
  }

  const urlId = shortid.generate();
  let shortUrlSchema = await shortUrlUtil.getShortUrlSchema(shortUrlData , urlId);

  try {
    shortUrlSchema
      .save().then(() => {
        res.status(201).send({ message: `Successfully generated` });
      })
      .catch(() => {
        res.status(400).send({ message: `Failed to generate` });
      });
  } catch (error) {
    res.status(408).send({ message: "Failed to connect to DB" });
  }
});

router.delete("/shortUrl/:id", function (req, res) {
  const id = req.params.id;
  try {
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
  } catch (error) {
    res.status(408).send({ message: "Failed to connect to DB" });
  }
});

module.exports = router;