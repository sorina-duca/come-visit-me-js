const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Couch = mongoose.model('Couch', {
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: 'Host',
    },
});

module.exports = Couch;
