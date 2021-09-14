const express = require('express');
const Couch = require('../models/couch');
const router = new express.Router();

router.post('/couches', async (req, res) => {
    const couch = new Couch(req.body);

    try {
        await couch.save();
        res.status(201).send(couch);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/couches/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);

    try {
        const couch = await Couch.findById(_id);
        updates.forEach((update) => (couch[update] = req.body[update]));

        if (!couch) {
            return res.status(404).send();
        }
        res.send(couch);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/couches/:id', async (req, res) => {
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

router.delete('/couches/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const couch = await Couch.findByIdAndDelete(_id);
        if (!couch) {
            return res.status(404).send();
        }

        res.send(couch);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/couches', async (req, res) => {
    try {
        const couches = await Couch.find({});
        res.send(couches);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
