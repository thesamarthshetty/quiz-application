const Joi = require('joi')

const regiterSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})

const loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
})

const submitAnswerSchema =  Joi.object().keys({
    submitedAnswers: Joi.array().items(
        Joi.object().keys({
            questionNo: Joi.number().required(),
            answer: Joi.string().required()
        })
    )
})

module.exports = { regiterSchema, loginSchema, submitAnswerSchema }