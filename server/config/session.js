const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./redis');


function init()
{
    return session({
        name: 'sid',
        secret: process.env.SESSION_SECRET_KEY, // Put whatever here
        resave: false,
        saveUninitialized: false,
        store: new RedisStore({ client: redisClient }),
        cookie: {
            // secure: true,
            // httpOnly: true,
            maxAge: 7200000, // 2 hour
            // domain: 'https://www.domain.com',
        }
    })
}

module.exports = init();