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

app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/couches', async (req, res) => {
    const couch = new Couch(req.body);

    try {
        await couch.save();
        res.status(201).send(couch);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/couches/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const couch = await Couch.findById(_id);
        if (!couch) {
            return res.status(404).send();
        }

        res.send(couch);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/couches', async (req, res) => {
    try {
        const couches = await Couch.find({});
        res.send(couches);
    } catch (e) {
        res.status(500).send(e);
    }
});
