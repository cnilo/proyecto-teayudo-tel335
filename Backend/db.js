const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://cristobalnilo:juhzyb-cogxez-hynrA5@apps.qoeyny5.mongodb.net/?retryWrites=true&w=majority"; // Reemplaza con tu URI de MongoDB Atlas

// Función para conectar a la colección de usuarios
async function connectToUsersCollection() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db('TEAyudo');
  const collection = db.collection('Usuarios');
  return collection;
}

// Función para conectar a la colección de preguntas
async function connectToQuestionsCollection() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db('TEAyudo');
  const collection = db.collection('Preguntas');
  return collection;
}

module.exports = {
  connectToUsersCollection,
  connectToQuestionsCollection
};
