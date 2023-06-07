const express = require("express");
const Question = require("../models/question");
const User = require("../models/user");

const router = express.Router();

// CREATE
router.post('/question', async (req, res) => {
    const lastQuestion = await Question.find().sort({ id: -1 }).limit(1)[0];
    const lastId = lastQuestion ? lastQuestion.id + 1 : 0;
    const question = Question({
        ...req.body,
        id: lastId + 1
    });
    await question
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET ALL
router.get('/question', async (req, res) => {
    await Question
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET BY ID
router.get('/question/:id', async (req, res) => {
    const { id } = req.params;
    await Question
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET BY USER ID
router.get('/question/user/:id', async (req, res) => {
    const { id } = req.params;
    const userName = await User.findById(id).then((data) => data.nombre);
    const userLastName = await User.findById(id).then((data) => data.apellido);
    await Question
        .find({ nombre: userName, apellido: userLastName })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// DELETE
router.delete('/question/:id', async (req, res) => {
    const { id } = req.params;
    await Question
        .deleteOne({ id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;