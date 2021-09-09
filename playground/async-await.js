require('../src/db/odm');
const User = require('../src/models/user');

const setPassword = async (id, password) => {
    const updatedUser = await User.findOneAndUpdate(id, { password });
    const count = await User.countDocuments({ password: null });
    return count;
};

setPassword('612cf11a9b0d9d75a5fb6463', 'strongpassword123')
    .then((count) => {
        console.log(count);
    })
    .catch((e) => {
        console.log(e);
    });
