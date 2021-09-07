require('../src/db/odm');
const User = require('../src/models/user');

User.findByIdAndUpdate('612cf11a9b0d9d75a5fb6463', { team: 'privacy' })
    .then((user) => {
        console.log(user);
        return User.countDocuments({ team: 'privacy' });
    })
    .then((result) => {
        console.log(result);
    })
    .catch((e) => {
        console.log(e);
    });

