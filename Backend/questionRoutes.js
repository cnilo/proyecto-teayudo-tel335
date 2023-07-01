const express = require('express');
const questionController = require('./questionController');
const { authenticateToken } = require('./authMiddleware');
const { connectToQuestionsCollection } = require('./db');

const router = express.Router();

// Ruta para obtener todas las preguntas
router.get('/', async (req, res) => {
  try {
    const collection = await connectToQuestionsCollection();
    const questions = await questionController.getAllQuestions(collection);
    res.json(questions);
  } catch (error) {
    console.error('Error al obtener preguntas:', error);
    res.status(500).json({ error: 'Error al obtener preguntas' });
  }
});

// Ruta para obtener una pregunta por su ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await connectToQuestionsCollection();
    const question = await questionController.getQuestionById(collection, id);
    if (!question) {
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }
    res.json(question);
  } catch (error) {
    console.error('Error al obtener la pregunta:', error);
    res.status(500).json({ error: 'Error al obtener la pregunta' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { question } = req.body;
    const collection = await connectToQuestionsCollection();
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }
    // Crear la pregunta y agregar la información del usuario
    await questionController.createQuestion(collection, user._id, { question });

    res.status(201).json({ message: 'Pregunta agregada exitosamente' });
  } catch (error) {
    console.error('Error al agregar la pregunta:', error);
    res.status(500).json({ error: 'Error al agregar la pregunta' });
  }
});

router.post('/:id/answers', async (req, res) => {
    try {
      const { id } = req.params;
      const { text, userId } = req.body; // Obtener userId del cuerpo de la solicitud
      const collection = await connectToQuestionsCollection();
      console.log(req.body);
  
      // Utilizar el userId en la función addAnswerToQuestion
      const answerData = {
        text,
        userId,
      };
      await questionController.addAnswerToQuestion(collection, id, answerData);
  
      res.status(201).json({ message: 'Respuesta agregada exitosamente' });
      
    } catch (error) {
      console.error('Error al agregar la respuesta:', error);
      res.status(500).json({ error: 'Error al agregar la respuesta' });
    }
  });
  

  

// Ruta para crear una respuesta en una pregunta específica

module.exports = router;
