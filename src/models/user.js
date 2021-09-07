const mongoose = require('mongoose');
const validator = require('validator');

const Team = {
    product: 'product',
    hr: 'hr',
};

const User = mongoose.model('User', {
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    team: {
        type: String,
        enum: Object.values(Team),
        default: Team.product,
        trim: true,
    },
    city: {
        type: Array,
        required: true,
        trim: true,
    },
    host: {
        type: Boolean,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid!');
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain the word password!');
            }
        },
    },
});

module.exports = User;
