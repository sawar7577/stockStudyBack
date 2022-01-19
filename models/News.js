const { model, Schema } = require('mongoose');

const newsSchema = new Schema({
    newsID: Number,
    newsText: String,
    priceEffect: Number
});


module.exports = model('News', newsSchema);
