var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var NewsSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        content: String,
        author: String,
        archiveDate: Date
    },
    {
        timestamps: true,
        strict: true
    });
NewsSchema.plugin(mongoosePaginate);

var newsModel = mongoose.model('New', NewsSchema);

exports.findById = function (id) {
    return newsModel.findById(id)
}

exports.findMany = function (query) {
    return newsModel.paginate(query)
}

exports.createOne = function (body) {
    var model = new newsModel(body);
    return model.save();
}

exports.updateOne = function (id, body) {
    return newsModel.updateOne({ _id: id }, body)
}

exports.deleteById = function (id) {
    return newsModel.deleteOne({ _id: id })
}