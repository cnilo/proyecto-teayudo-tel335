const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tipo: {
        type: Number, // 0: Paciente, 1: Especialista, 2: Administrador o Soporte
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;