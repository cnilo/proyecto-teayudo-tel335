const express = require("express");
const Answer = require("../models/answer");

const router = express.Router();

// CREATE
router.post('/answer', async (req, res) => {
    const lastAnswer = await Answer.find().sort({ id: -1 }).limit(1)[0];
    const lastId = lastAnswer ? lastAnswer.id + 1 : 0;
    const answer = Answer({
        ...req.body,
        id: lastId + 1
    });
    await answer
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET ALL
router.get('/answer', async (req, res) => {
    await Answer
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET BY ID
router.get('/answer/:id', async (req, res) => {
    const { id } = req.params;
    await Answer
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET BY QUESTION ID
router.get('/answer/question/:id', async (req, res) => {
    const { id } = req.params;
    await Answer
        .find({ questionId: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// DELETE
router.delete('/answer/:id', async (req, res) => {
    const { id } = req.params;
    await Answer
        .deleteOne({ id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;