const { model, Schema } = require('mongoose');

const stockSchema = new Schema({
  username: String,
  createdAt: String,
  closingPrice: [Number],
  prediction: [Number],
  decisions: [Number],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Stock', stockSchema);
