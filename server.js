require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('./config/session');
const cors = require('cors');

const server = require('http').Server(app);
const io = require('socket.io')(server);
const socketSess = require('socket.io-express-session');


// Parse data
app.use(express.urlencoded({ extended: true, limit: "200kb" }));
app.use(express.json({ extended: true, limit: "200kb" }));

app.use(cors({ credentials: true, origin: true }));

// start using the session
app.use(session);

// use the socket session
io.use(socketSess(session))

// ############### Connect to the DB ###############
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => { console.log('DB is running...') });
db.on('error', (err) => { console.log('DB_ERROR: ', err) })

// ######################### All the awsome code #############################


// ********* Bring the routes ********
const userAuth = require('./routes/auth/UserAuth');

app.use(userAuth);

app.get('/', (req, res) => {
    return res.json(req.session);
});


io.on('connection', (socket) => {
    // console.log('Socket: ', socket.handshake.session)
});


// ############## Start the server ###############
const port = process.env.PORT || '8000';
server.listen(port, () => {
    console.log(`chat-randomly server started ! ${port}`);
});


/* ############################# TASKS #############################
    --> Send messages between two users with socket
    1) First of all users choose who want to chat with, (display available users in the home-page)
    2) when user click the user that he wants to chat with, he is gonna be redirected to (/messages/[CHATTING_WITH_USERID+HIS_ID])
      2/a) [CHATTING_WITH_USERID+HIS_ID] <- this is gonna be the room for both of the users
      2/b) When use send a message we will check if this room is already there, else create it (store in the DB)
      2/c) (Rooms model: {name, user1, user2})
    3) suppose user knows whats the room name, he try to access it, we will prevent him by getting the room name and see if the user id that is trying to access is the same as the user1 or user2
    
*/