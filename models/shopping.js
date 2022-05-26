//========================
//======== Variables =========
//========================

//Dependencies
//==========
const mongoose = require('mongoose');

//Schema(s)
//==========
const shoppingSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    img: {type: String, required: false},
    qty: {type: Number, required: false},
    desc: {type: String, required: false},
})

//Usable Const in server.js
//==================
const Shopping = mongoose.model('Shopping', shoppingSchema);

//What to Export from this file
//=====================
module.exports = Shopping;