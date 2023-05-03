const express = require("express");
const User = require("../models/user");

const router = express.Router();

// CREATE
router.post('/user', (req, res) => {
    const user = User(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET ALL
router.get('/user', (req, res) => {
    User
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET BY ID
router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    User
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// UPDATE
router.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, password, tipo } = req.body;
    User
        .updateOne({ _id: id }, { $set: { nombre, apellido, email, password, tipo } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// DELETE
router.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    User
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;