const express = require("express");
const router = express.Router();
const {
  createContent,
  handleFoundContent,
  fetchAllContent,
} = require("./controllers");
const Content = require("./models");
// will add logic later
router.post("/", createContent);
router.get("/", fetchAllContent);
router.param("_id", async (req, res, next, _id) => {
  try {
    const foundContent = await Content.findById(_id);
    if (!foundContent) {
      const err = new Error("person not found");
      err.status = 400;
      return next(err);
    }
    req.foundContent = foundContent;
    return next();
  } catch (err) {
    return next(err);
  }
});

router.all("/:_id([a-fA-F0-9]{24}$)", handleFoundContent);

module.exports = router;
