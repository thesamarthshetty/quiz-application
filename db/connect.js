const mongoose = require('mongoose')

const connectToDatabase = async (url) => {
    mongoose.connect(url)
}

module.exports = { connectToDatabase} 