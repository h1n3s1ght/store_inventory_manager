//============================
//======== VARIABLES =========
//============================
    // Dependencies
    //==========
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Inventory = require('./models/inventory.js');

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


//=============================
//========= ROUTES ============
//=============================

        //========================
        //===== Index / GET ==========
        //========================
app.get('/inventory', (req,res) => {
   Inventory.find({}, (error, allInventory) => {
    res.render('index.ejs',{inventory: allInventory});
});
});

        //========================
        //===== New / GET ==========
        //========================
app.get('/inventory/new', (req, res) => {
        res.render('new.ejs');
        console.log(req.body);
    });

        //========================
        //===== Show / GET ==========
        //========================
app.get('/inventory/:_id', (req,res)=>{
    Inventory.findById(req.params._id, (err, foundInventory) =>{
        res.render('show.ejs', {
            inventory: foundInventory,
        });
    });
});

        //========================
        //===== Edit / GET===========
        //========================

        //========================
        //===== Create / POST =======
        //========================
app.post('/inventory', (req,res)=> {
    Inventory.create(req.body, (error, createdInventory)=> {
        res.redirect('/inventory');
    });
    console.log(req.body);
});
        //========================
        //===== Update / PUT ========
        //========================

        //=========================
        //===== Destroy / DELETE ======
        //=========================
