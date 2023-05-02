const express = require("express");
const User = require("../models/user");

const router = express.Router();

// CREATE
router.post('/user', (req, res) => {
    const user = User(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// GET ALL
router.get('/user', (req, res) => {
    User
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});


module.exports = router;