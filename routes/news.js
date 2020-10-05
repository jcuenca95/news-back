var router = require("express").Router();
const {
  validate,
  ValidationError,
  Joi,
  validator,
} = require("express-validation");
var newsModel = require("../models/news");

const newsValidationPost = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().required(),
  }),
};

const newsValidationPut = {
  body: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    content: Joi.string(),
    author: Joi.string(),
    archiveDate: Joi.custom((value) => {
      return !isNaN(Date.parse(value));
    }),
  }),
};

router.get("/", async (req, res, next) => {
  try {
    var result = await newsModel.findMany(req.query);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Not Found" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    var result = await newsModel.findById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Not Found" });
  }
});

router.post(
  "/",
  validate(newsValidationPost, {}, {}),
  async (req, res, next) => {
    try {
      var result = await newsModel.createOne(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "Error Creating" });
    }
  }
);

router.put(
  "/:id",
  validate(newsValidationPut, {}, {}),
  async (req, res, next) => {
    try {
      var result = await newsModel.updateOne(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "Error Updating" });
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  try {
    var result = await newsModel.deleteById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "Error Creating" });
  }
});

module.exports = router;
