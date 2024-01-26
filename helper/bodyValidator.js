const Joi = require('joi')
const joiSchema = require('../validation/joi')

const requestValidation = async (req, res, next) => {
    const { body } = req
    const schema = joiSchema.regiterSchema
    const { error, value } = schema.validate(body);
    if (error) res.send({ message: error?.details[0]?.message })

    next()
}

const loginValidation = async (req, res, next) => {
    const { body } = req
    const schema = joiSchema.loginSchema
    const { error, value } = schema.validate(body);
    if (error) res.send({ message: error?.details[0]?.message })

    next()
}

const submitAnswer = async (req, res, next) => {
    const { body } = req
    const schema = joiSchema.submitAnswerSchema
    const { error, value } = schema.validate(body);
    if (error) return res.send({ message: error?.details[0]?.message })

    next()
}

module.exports = { requestValidation, loginValidation, submitAnswer }