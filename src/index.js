const express = require('express');
require('./db/odm');
const User = require('./models/user');
const Couch = require('./models/couch');
const userRouter = require('../src/routers/user');
const couchRouter = require('../src/routers/couch');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(couchRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
