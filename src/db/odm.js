const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/come-visit-js', {
    useNewUrlParser: true,
    autoIndex: true,
    useUnifiedTopology: true,
});

const Team = {
    product: 'product',
    hr: 'hr',
};

const User = mongoose.model('User', {
    name: {
        type: String,
        unique: true,
        required: true,
    },
    team: {
        type: String,
        enum: Object.values(Team),
        default: Team.product,
    },
    city: {
        type: Array,
        required: true,
    },
    host: {
        type: Boolean,
        required: true,
    },
});

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

// new Couch({
//     name: 'My Valencia loft',
//     city: 'Valencia',
//     host: '612ce067b9ea9dcd8d0d4026',
// })
//     .save()
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

new User({
    name: 'Reza',
    team: 'product',
    host: false,
    city: 'Berlin',
})
    .save()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
