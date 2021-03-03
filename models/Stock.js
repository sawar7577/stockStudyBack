const { model, Schema } = require('mongoose');

const stockSchema = new Schema({
  username: String,
  createdAt: String,
  closingPrice: [Number],
  predictedPrice: [Number],
  prediction: [Number],
  decisions: [Number],
  timeStart: Number,
  timeStamp: [Number],
  cprediction: [Number],
  cdecisions: [Number],
  money: [Number],
  prob: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Stock', stockSchema);
