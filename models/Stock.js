const { model, Schema } = require('mongoose');

const stockSchema = new Schema({
  username: String,
  createdAt: String,
  closingPrice: [Number],
<<<<<<< HEAD
  predictedPrice: [Number],
=======
>>>>>>> 0d981e191552715386a538164330bbe346877203
  prediction: [Number],
  decisions: [Number],
  timeStart: Number,
  timeStamp: [Number],
  cprediction: [Number],
  cdecisions: [Number],
  money: [Number],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Stock', stockSchema);
