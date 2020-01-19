require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();
const mongoose = require('mongoose');

// Parse data
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(express.json({ extended: true, limit: "50kb" }));

// start using the session
app.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET_KEY, // Put whatever here
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        // secure: true,
        // httpOnly: true,
        maxAge: 7200000, // 2 hour
        // domain: 'https://www.domain.com',
    }
}));

// ############### Connect to the DB ###############
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => { console.log('DB is running...') });
db.on('error', (err) => { console.log('DB_ERROR: ', err) })

// ######################### All the awsome code #############################

// ********* Bring the routes ********
const userAuth = require('./routes/auth/UserAuth');

app.use(userAuth);



// ############################# TASKS #############################

// --> log user in with google and facebook, by set a session


// ############## Start the server ###############
const port = process.env.PORT || '9000';
app.listen(port, () => {
    console.log(`chat-randomly server started ! ${port}`);
});