require('dotenv').config();

const express = require('express');
const app = express();
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

app.use(userAuth);

app.get('/', (req, res) => {
    return res.json(req.session);
});

/* ############################# TASKS #############################
    --> client side authorization
*/


// ############## Start the server ###############
const port = process.env.PORT || '8000';
app.listen(port, () => {
    console.log(`chat-randomly server started ! ${port}`);
});