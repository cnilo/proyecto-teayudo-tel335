const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const userRoutes = require('./userRoutes');
const questionRoutes = require('./questionRoutes');

const uri = "mongodb+srv://cristobalnilo:juhzyb-cogxez-hynrA5@apps.qoeyny5.mongodb.net/?retryWrites=true&w=majority"; // Reemplaza con tu URI de MongoDB Atlas
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

// ...

async function run() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db('TEAyudo');

    // Configura la colección de usuarios como variable local de la aplicación
    const usersCollection = db.collection('Usuarios');
    app.locals.collection = usersCollection;

    // Configura la colección de preguntas como variable local de la aplicación
    const questionsCollection = db.collection('Preguntas');
    app.locals.questionsCollection = questionsCollection;

    // Usa las rutas de usuarios
    app.use('/api/users', userRoutes);

    // Usa las rutas de preguntas
    app.use('/api/questions', questionRoutes);

    // Ruta para servir las imágenes

    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  } catch (error) {
    console.error('Error al conectar a MongoDB Atlas:', error);
  }
}

run().catch(console.dir);

// ...

