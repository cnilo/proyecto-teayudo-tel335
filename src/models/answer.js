const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    email_paciente: {
        type: String,
        required: true
    },
    email_profesional: {
        type: String,
        required: true
    },
    respuesta: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
        default: 0
    },
    id_pregunta: {
        type: Number,
        required: true,
    },
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;