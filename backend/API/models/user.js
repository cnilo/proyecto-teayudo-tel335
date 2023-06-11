
// definimos el formato el cual tomará la sección users en la base de datos a trabajar

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required : true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    }

});

module.exports = mongoose.model('User', userSchema);