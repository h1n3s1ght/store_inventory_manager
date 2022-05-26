//============================
//======== VARIABLES =========
//============================
    // Dependencies
    //==========
const express = require('express');
const inventoryRouter = express.Router();
const Inventory = require('../models/inventory.js');
const inventoryStart = require('../models/inventoryStart.js');

//=============================
//========= ROUTES ============
//=============================

        //========================
        //===== Index / GET ==========
        //========================
        
        //Get data from Seed
        //==============
inventoryRouter.get('/inventory/seed', (req, res) => {
    Inventory.deleteMany({}, (error, allInventory) => {});
    Inventory.create(inventoryStart, (error, data) => {
        res.redirect('/inventory');
    })
})

        //Get data from Database(s)
        //==================

        //Inventory
        //=======
inventoryRouter.get('/inventory', (req,res) => {
   Inventory.find({}, (error, allInventory) => {
    res.render('index.ejs',{inventory: allInventory,});
});
});

        //========================
        //===== New / GET ==========
        //========================
inventoryRouter.get('/inventory/new', (req, res) => {
        res.render('new.ejs');
        console.log(req.body);
    });

        //=========================
        //===== Destroy / DELETE ======
        //=========================
inventoryRouter.delete('/inventory/:id', (req, res) => {
        //Select the item by id and remove only one item
    Inventory.findByIdAndDelete(req.params.id, (err, data) => {
         //Redirect back to home page after delete completes
    res.redirect('/inventory');
    });
});

        //========================
        //===== Update / PUT ========
        //========================
inventoryRouter.put('/inventory/:id', (req, res) => {
Inventory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
}, (error, updatedInventory) => {
    res.redirect(`http://localhost:3000/inventory/${req.params.id}`);
})
});

        //========================
        //===== Create / POST =======
        //========================
inventoryRouter.post('/inventory', (req,res)=> {
    Inventory.create(req.body, (error, createdInventory)=> {
        res.redirect('/inventory');
    });
    console.log(req.body);
});

        //========================
        //===== Edit / GET===========
        //========================
inventoryRouter.get('/inventory/:id/edit', (req, res) => {
    Inventory.findById(req.params.id, (err, foundInventory) => {
          res.render('edit.ejs', {inventory: foundInventory,});
    });
});

        //========================
        //===== Show / GET ==========
        //========================
inventoryRouter.get('/inventory/:id', (req,res)=>{
    Inventory.findById(req.params.id, (err, foundInventory) =>{
        res.render('show.ejs', {
            inventory: foundInventory,
        });
    });
});

        //Export inventoryRouter variable through 
        //export method in module
        //===========================
module.exports = inventoryRouter;