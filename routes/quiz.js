const express = require('express');
const quizController = require('../controller/quiz');
const bodyValidation = require('../helper/bodyValidator')
const routers = express.Router()
const jwtExtractor = require('../lib/jwtExtractor')

routers.post('/register', bodyValidation.requestValidation, quizController.registerUser)
routers.post('/login', bodyValidation.loginValidation, quizController.login)
routers.get('/getQuestions',jwtExtractor ,quizController.getQuestions)
routers.post('/submitAnswer', bodyValidation.submitAnswer, jwtExtractor, quizController.submitAnswer)
routers.get('/leaderBoard',jwtExtractor ,quizController.getLeaderShipBoard)


module.exports = routers