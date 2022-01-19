const { SchemaError } = require('apollo-server');
const { model, Schema } = require('mongoose');
const newsSchema = require('./News').schema;
const participantSchema = require('./Participant').schema;

const stockSchema = new Schema({
  username: String,
  createdAt: String,
  status: String,
  closingPrice: [Number],
  timeStart: Number,
  timeStamp: [Number],
  news: [newsSchema],
  participantInfo: participantSchema,
  // priceEffect: [Number],
  // newsID: [Number],
  cdecisions: [Number],
  money: [Number],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});


module.exports = model('Stock', stockSchema);
