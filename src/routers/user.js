const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/authentication');
const mongoose = require('mongoose');

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password,
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'name',
        'email',
        'password',
        'team',
        'city',
        'host',
    ];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update),
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update' });
    }
    try {
        const user = req.user;
        updates.forEach((update) => (user[update] = req.body[update]));

        await user.save();

        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
