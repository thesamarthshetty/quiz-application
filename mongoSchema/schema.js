const mongoose = require("mongoose");


const registerSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required']
    },
    password: {
        type: String,
        require: [true, 'password is required']
    },
    quizScore: Number,
}, { timestamps: true })

const registerModel = mongoose.model('users',registerSchema)

const answerSchema = mongoose.Schema({
    answers: {
        type: Array
    }
}, { timestamps: true })

const answerModel = mongoose.model('answer',answerSchema)

module.exports = { registerModel, answerModel }