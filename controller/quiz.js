const quizModel = require('../model/quiz')


const registerUser = async (req, res) => {
    const { body } = req
    const result = await quizModel.register(body)

    result?.status == true ? res.status(200).send({ data: result.data }) : res.status(400).send({ message: result.message })
}

const login = async (req, res) => {
    const { body } = req
    const result = await quizModel.login(body)
    
    result?.status == true ? res.status(200).send({ data: result.data }) : res.status(400).send({ message: result.message })
}

const getQuestions = async (req, res) => {
    const result = await quizModel.getQuestions()
    res.status(200).send({ data: result }) 
}

const submitAnswer = async (req, res) => {
    const { body } = req
    const result = await quizModel.submitAnswer(body)
    
    result?.status == true ? res.status(200).send({ data: result.data }) : res.status(400).send({ message: result.message })
}

const getLeaderShipBoard = async (req, res) => {
    const result = await quizModel.getLeaderShipBoard()
    res.status(200).send({ data: result }) 
}

module.exports = { registerUser, login, getQuestions, submitAnswer, getLeaderShipBoard }
