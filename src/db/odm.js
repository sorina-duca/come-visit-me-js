const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/come-visit-js', {
    useNewUrlParser: true,
    autoIndex: true,
    useUnifiedTopology: true,
});
