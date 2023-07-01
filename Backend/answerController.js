const { ObjectId } = require('mongodb');

const answerController = {
    createAnswer: async (req, res) => {
      try {
        const questionId = req.params.id;
        const { text } = req.body;
  
        // Crea una nueva respuesta
        const newAnswer = {
          text,
        };
  
        // Actualiza la pregunta en la base de datos para agregar la nueva respuesta
        const updatedQuestion = await db.collection('questions').updateOne(
          { _id: ObjectId(questionId) },
          { $push: { answers: newAnswer } }
        );
  
        res.status(201).json(newAnswer);
      } catch (error) {
        console.error('Error al crear la respuesta:', error);
        res.status(500).json({ error: 'Error al crear la respuesta' });
      }
    },
  };
  
  module.exports = answerController;
  