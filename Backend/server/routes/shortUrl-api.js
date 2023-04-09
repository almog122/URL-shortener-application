const express = require("express");
const ShortUrl = require("../model/shortUrlSchema");
const shortUrlUtil = require("../utilities/shortUrl-util");

const router = express.Router();

router.get("/shortUrls", function (req, res) {
  ShortUrl.find({})
    .then(function (shortUrls) {
      res.send(shortUrls);
    })
    .catch(function () {
      res.status(500).send({ message: "Internal Server Error" });
    });
});

router.post("/shortUrl", function (req, res) {
  let shortUrlData = req.body;
  let shortUrlSchema = shortUrlUtil.getShortUrlSchema(shortUrlData);

  shortUrlSchema
    .save()
    .then(() => {
      res.status(201).send({ message: `Successful transaction` });
    })
    .catch(() => {
      res.status(400).send({ message: `Failed transaction` });
    });
});

router.delete("/shortUrl/:id", function (req, res) {
  let id = req.params.id;

  Transaction.deleteOne({ _id: id })
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
});

module.exports = router;