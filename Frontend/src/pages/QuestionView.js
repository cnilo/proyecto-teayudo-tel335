import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Button } from '@windmill/react-ui';
import { getUserIdFromLocalStorage } from './localStorageUtils.js';

function QuestionView(props) {
  const [questionText, setQuestionText] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/questions/${props.match.params.id}`);
        const questionData = response.data;
        setQuestionText(questionData.questionText);
        setAnswers(questionData.answers);
      } catch (error) {
        console.error('Error al obtener la pregunta:', error);
      }
    };
    fetchQuestionData();
  }, [props.match.params.id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = getUserIdFromLocalStorage(); // Implementa esta función para obtener el userId del localStorage
      console.log('userId:', userId);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/questions/${props.match.params.id}/answers`,
        {
          text: answerText,
          userId, // Incluir el userId en el cuerpo de la solicitud
        }
      );
      console.log('Respuesta enviada:', response.data);
  
      // Actualizar las respuestas mostradas
      setAnswers([...answers, response.data]);
  
      // Reiniciar el estado del formulario
      setAnswerText('');
      setShowForm(false);
    } catch (error) {
      console.error('Error al enviar la respuesta:', error);
    }
  };
  

  return (
    <div>
      <h1 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200 mb-1">Pregunta</h1>
      <Card>
        <CardBody>
          <p className="mb-1 font-semibold text-gray-600 dark:text-gray-300"></p>
          <p className="text-gray-600 dark:text-gray-400">{questionText}</p>
        </CardBody>
      </Card>

      <Card className="mt-4">
        <CardBody>
          <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">Respuestas:</p>
          {answers.map((answer, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-400">
              {answer.text}
            </p>
          ))}
        </CardBody>
      </Card>

      <div className="mt-4">
        {!showForm ? (
          <Button onClick={() => setShowForm(true)}>Responder</Button>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <textarea
              className="w-full h-24 p-2 border rounded-md"
              placeholder="Ingrese su respuesta"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              required
            ></textarea>
            <div className="flex justify-end mt-2">
              <Button type="submit" className="mr-2">
                Enviar respuesta
              </Button>
              <Button type="button" layout="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default QuestionView;
