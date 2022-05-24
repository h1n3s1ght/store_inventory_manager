//========================
//======== Variables =========
//========================

//Dependencies
//==========
const mongoose = require('mongoose');

//Schema(s)
//==========
const inventorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    img: {type: String, required: false},
    qty: {type: Number, required: false},
    desc: {type: String, required: false},
});

//Usable Const in server.js
//==================
const Inventory = mongoose.model('Inventory', inventorySchema);

//What to Export from this file
//=====================
module.exports = Inventory;