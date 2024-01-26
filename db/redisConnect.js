const redis = require('redis');

// Create a Redis client using the createClient method from 'redis'
const client = redis.createClient();

client.on('error', err => console.log('Redis Client Error', err));
client.on('ready', () => console.log('Redis has been connect successfully'))
client.connect();

module.exports = { client }