//============================
//======== VARIABLES =========
//============================
    // Dependencies
    //==========
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
require('dotenv').config();

    // How to connect to the database either
    // via heroku or locally
    //===========================
const MONGODB_URI = process.env.MONGODB_URI;

    //Use Public Directory
    //===============
app.use(express.static("public"));

    //Port Set Variable
    //============
const PORT = process.env.PORT;

    //Database connection
    //==============
const db = mongoose.connection;

    //Connect MongoDB
    //==============
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//==============================
//======= ERROR LOGGER =========
//==============================

    // Database Connection Error/Success
    // Define callback functions for various events
    //=================================

db.on('error', (err) => console.log(err.message + ' is mongoDB NOT running?'));
db.on('connected', () => console.log('mongoDB is connected'));
db.on('disconnected', () => console.log('mongoDB is  DISconnected'));

//==============================
//========= LISTENER ============
//==============================

app.listen(PORT, () => {
    console.log('Server listening on port |', PORT);
    })

//==============================
//======= MIDDLEWARE ===========
//==============================

    // Body parser middleware: it creates req.body
    //================================
app.use(express.urlencoded({ extended: true }));

    //Create router dependency...
    //MUST STAY AT THE
    //END OF MIDDLEWARE
    //=====================
const inventoryController = require('./controllers/inventoryList.js');
app.use(inventoryController);