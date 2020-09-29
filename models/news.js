var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");
const { parseSort } = require("../utils/utils");

var NewsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    content: String,
    author: String,
    archiveDate: Date,
  },
  {
    timestamps: true,
    strict: true,
  }
);
NewsSchema.plugin(mongoosePaginate);

var newsModel = mongoose.model("New", NewsSchema);

exports.findById = function (id) {
  return newsModel.findById(id);
};

exports.findMany = function (query) {
  let sort = query.sort;
  delete query.sort;
  if (!sort) {
    sort = { createdAt: -1 };
  } else {
    sort = parseSort(sort);
  }
  if (query.archiveDate) {
    query.archiveDate = { $exists: query.archiveDate == "true" };
  }
  return newsModel.paginate(query, { sort: sort });
};

exports.createOne = function (body) {
  var model = new newsModel(body);
  return model.save();
};

exports.updateOne = function (id, body) {
  return newsModel.updateOne({ _id: id }, body);
};

exports.deleteById = function (id) {
  return newsModel.deleteOne({ _id: id });
};
