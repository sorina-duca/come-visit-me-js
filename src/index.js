const express = require('express');
require('./db/odm');
const User = require('./models/user');
const Couch = require('./models/couch');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(() => {
            res.send(user);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

app.post('/couches', (req, res) => {
    const couch = new Couch(req.body);
    couch
        .save()
        .then(() => {
            res.status(201).send(couch);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id)
        .then((user) => {
            if (!user) {
                return res.status(404).send();
            }

            res.send(user);
        })
        .catch((e) => res.status(500).send(e));
});

app.get('/couches/:id', (req, res) => {
    const _id = req.params.id;

    Couch.findById(_id)
        .then((couch) => {
            if (!couch) {
                return res.status(404).send();
            }

            res.send(couch);
        })
        .catch((e) => res.status(500).send(e));
});

app.get('/couches', (req, res) => {
    Couch.find({})
        .then((couches) => {
            res.send(couches);
        })
        .catch((e) => res.status(500).send(e));
});

new Couch({
    name: 'A',
    city: 'b',
})
    .save()
    .then(() => console.log('suc'))
    .catch((e) => console.log(e));
