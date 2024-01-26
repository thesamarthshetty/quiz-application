const express = require('express');
const quiz = require('./routes/quiz')
const mongoConnect = require('./db/connect')
const app = express();

app.use(express.json());

require('dotenv').config()

app.use('/api/v1/quiz', quiz);

const startApp = async () => {

    try{
        await mongoConnect.connectToDatabase(process.env.MONGO_URL)
        app.listen(8000, console.log('Server is up and running'));
    }catch(err){
        console.log('err--------->',err)
    }

} 
startApp()