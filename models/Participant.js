const { model, Schema } = require('mongoose');

const participantSchema = new Schema({
    status: String,
    sequence: [Number],
    controlGroup: Number
});


module.exports = model('Participant', participantSchema);
