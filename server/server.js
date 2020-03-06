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
let DB_URI = process.env.NODE_ENV == 'production' ? process.env.DB_URI : 'mongodb://localhost/chatr';
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
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
    


*/


