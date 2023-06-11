const express = require('express');
const questionSchema = require('../models/question');
const router = express.Router();


// crear pregunta

router.post('/questions', (req,res) => {
    const question = questionSchema(req.body);
    question
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});


// get all questions


router.get('/questions', (req,res) => {
    questionSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}));
});

module.exports = router;