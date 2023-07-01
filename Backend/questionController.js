const { ObjectId } = require('mongodb');

const questionController = {
    createQuestion: async (collection, userId, questionData) => {
      // Agregar la información del usuario al documento de la pregunta
      questionData.userId = userId;
  
      // Insertar la pregunta en la colección de preguntas
      await collection.insertOne(questionData);
    },
  
    getAllQuestions: async (collection) => {
      try {
        const questions = await collection.find({}).toArray();
        return questions;
      } catch (error) {
        throw new Error('Error al obtener las preguntas');
      }
    },
    getQuestionById: async (collection, questionId) => {
    try {
      const question = await collection.findOne({ _id: new ObjectId(questionId) });
      if (!question) {
        throw new Error('Pregunta no encontrada');
      }
      return question;
    } catch (error) {
      console.error('Error en la consulta a la base de datos:', error);
      throw new Error('Error al obtener la pregunta');
    }
  },

  addAnswerToQuestion: async (collection, questionId, answerData, userId) => {
    try {
      const updatedQuestion = await collection.updateOne(
        { _id: new ObjectId(questionId) },
        { $push: { answers: { ...answerData, userId } } }
      );
      return updatedQuestion;
    } catch (error) {
      console.error('Error al agregar la respuesta:', error);
      throw new Error('Error al agregar la respuesta');
    }
  },
  
  
    
  
    // Otros métodos del controlador de preguntas...
  };
  
  module.exports = questionController;
  