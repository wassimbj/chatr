let port = process.env.NODE_ENV == 'production' ? process.env.REDIS_PORT : 6379;
let host = process.env.NODE_ENV == 'production' ? process.env.REDIS_HOST : '127.0.0.1';
let password = process.env.NODE_ENV == 'production' ? process.env.REDIS_PASSWORD : '';

const redisClient = require('redis').createClient(port, host, { auth_pass: password });

module.exports = redisClient