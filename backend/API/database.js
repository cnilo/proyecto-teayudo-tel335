const mongoose = require('mongoose');
require('dotenv').config(); //requerimos para poder generar variables de entorno y lograr mayor seguridad


// conexión a la bbdd
mongoose.connect(process.env.MONGODB_URI).then( () => 
    console.log('Conectado de forma correcta a la base de datos de Atlas Mongo'))
    .catch((error) => console.error(error))

//mongoose.set('strictQuery', false);