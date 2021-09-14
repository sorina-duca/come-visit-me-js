const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Team = {
    product: 'product',
    hr: 'hr',
    privacy: 'privacy',
};

const userSchema = new mongoose.Schema({
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

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isValidPassword = bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Unable to login');
    }

    return user;
};

userSchema.pre('save', async function (next) {
    const user = this;
    console.log('working');
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
