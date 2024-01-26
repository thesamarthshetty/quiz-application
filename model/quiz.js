const bcrypt = require('bcryptjs');
const mongoModel = require('../mongoSchema/schema')
const commonHelper = require('../helper/common')
const redisClient = require('../db/redisConnect')
const { promisify } = require('util');
const jwt = require('jsonwebtoken')
const quizHelper = require('../helper/quiz')

const genSaltAsync = promisify(bcrypt.genSalt);
const hashAsync = promisify(bcrypt.hash);

const register = async (body) => {
    const { password, email } = body
    try {

        const salt = await genSaltAsync(10);
        const hashedPassword = await hashAsync(password, salt);

        body.password = hashedPassword;
        // Uncomment the following line when you want to save the user to MongoDB
        await mongoModel.registerModel.create(body);
        var token = jwt.sign({email}, process.env.JWT_KEY);

        return { status: true, data: { message: "User registered successfully", token } }
    } catch (err) {
        return { status: false, message: err }
    }
}

const login = async (body) => {
    const { email, password } = body

    try {
        const user = await mongoModel.registerModel.findOne({ email: email })

        if (user) {
            const result = bcrypt.compareSync(password, user.password)
            if (result) {
                var token = jwt.sign({ email }, process.env.JWT_KEY);
                return { status: true, data: { message: "User successfully logined", token } }
            }
            else {
                return { status: false, message: "Incorrect password" }
            }
        } else {
            return { status: false, message: "user not found" }
        }
    } catch (err) {
        return { status: false, message: "Something went wrong" }
    }

}

const getQuestions = async () => {
    const question = commonHelper.quizQuestion
    return question

}

const submitAnswer = async (body) => {
    const { submitedAnswers, email } = body
    
    let getScore
    let getAnsFromRedis = await redisClient.client.get('answer')
    if(!getAnsFromRedis){
        const getAnsFromMongoose = await mongoModel.answerModel.findOne({})
        getScore = await quizHelper.checkSubmitedAnswer(getAnsFromMongoose.answers,submitedAnswers)
        redisClient.client.set('answer',JSON.stringify(getAnsFromMongoose.answers))
    } else {
        getScore = await quizHelper.checkSubmitedAnswer(JSON.parse(getAnsFromRedis), submitedAnswers)
    }
    if (!getScore) return { status:false, message:"There is some problem while updating scores." }
    const x = await mongoModel.registerModel.findOneAndUpdate({ email },{quizScore: getScore})
    return { status:true, data: { message: getScore}}
}

const getLeaderShipBoard = async () => {
    const result = await mongoModel.registerModel.find({}, { name: 1, score: '$quizScore', _id: 0 })
   return { status:true, data: { message: result}}
}

module.exports = { register, login, getQuestions, submitAnswer,getLeaderShipBoard }