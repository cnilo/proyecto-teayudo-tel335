const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: false,
    },
    pregunta: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        default: 0
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;