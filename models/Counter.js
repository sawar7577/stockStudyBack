const { model, Schema } = require('mongoose');

const counterSchema = new Schema({
    sequenceName: String,
    sequenceValue: Number
});


module.exports = model('Counter', counterSchema);
