require('dotenv').config();

const express = require('express');
const app = express();
const {ioServer, io} = require('./app/socket/socket')(app);
const mongoose = require('mongoose');
const session = require('./config/session');
const cors = require('cors');


// Parse data
app.use(express.urlencoded({ extended: true, limit: "200kb" }));
app.use(express.json({ extended: true, limit: "200kb" }));

app.use(cors({ credentials: true, origin: true }));

// start using the session
app.use(session);


// ############### Connect to the DB ###############
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => { console.log('DB is running...') });
db.on('error', (err) => { console.log('DB_ERROR: ', err) })

// ######################### All the awsome code #############################


// ********* Bring the routes ********
const userAuth = require('./routes/auth/UserAuth');
const Home = require('./routes/Home');
const Messages = require('./routes/Messages')(io);

app.use(userAuth);
app.use(Home);
app.use(Messages);



// ############## Start the server ###############
const port = process.env.PORT || '8000';
ioServer.listen(port, () => {
    console.log(`chat-randomly server started ! http://localhost:${port}`);
});


/* ############################# TASKS #############################
    --> Send messages between two users with socket

    1) when user connect, save (user:id socketid) in redis
    
    2) First of all users choose who want to chat with, (display available users in the home-page)

    3) user will be redirected to (/messages/[chat with user id])

    4) user send a message we will join them both into one room wich is (chat_with_userid + auth_userid)

*/


