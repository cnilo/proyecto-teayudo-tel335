
const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({

    namePacient : {
        type: String,
        required: true,
        unique: true
    },

    question: {
        type: String,
        required: true
    },

    nutriCoach: {
        type:String,
        required: false
    }


});

module.exports = mongoose.model('Question', questionSchema);