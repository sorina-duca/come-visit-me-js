require('../src/db/odm');
const Couch = require('../src/models/couch');

Couch.findByIdAndDelete('61375d2d8e9d46b9e9f77bdd')
    .then((couch) => {
        console.log(couch);
        return Couch.countDocuments({ name: 'A' });
    })
    .then((result) => {
        console.log(result);
    })
    .catch((e) => {
        console.log(e);
    });
