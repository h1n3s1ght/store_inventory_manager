//============================
//======== VARIABLES =========
//============================
    // Dependencies
    //==========
const express = require('express');
const shoppingRouter = express.Router();
const Shopping = require('../models/shopping.js');
const shoppingSeed = require('../models/shoppingSeed.js');

//=============================
//========= ROUTES ============
//=============================

        //========================
        //===== Index / GET ==========
        //========================
        //Get data from Seed
        //==============
shoppingRouter.get('/shopping/seed', (req, res) => {
    Shopping.deleteMany({}, (error, allShopping) => {});
    Shopping.create(shoppingSeed, (error, data) => {
        res.redirect('/shopping')
    })
})

        //Get data from Database(s)
        //==================
        
        //Shopping
        //=======
shoppingRouter.get('/shopping', (req, res) => {
    Shopping.find({}, (error, allShopping) => {
        res.render('shoppingCart.ejs', {shopping: allShopping});
        res.send('working');
        // res.render('shoppingCart.ejs', {shopping: allShopping})
    })
});

        //========================
        //===== New / GET ==========
        //========================
shoppingRouter.get('/shopping/new', (req, res) => {
    // res.send('working');
        // res.render('shoppingCart.ejs');
        console.log(req.body);
    });

        //=========================
        //===== Destroy / DELETE ======
        //=========================
shoppingRouter.delete('/shopping/:id', (req, res) => {
        //Select the item by id and remove only one item
    Shopping.findByIdAndDelete(req.params.id, (err, data) => {
         //Redirect back to home page after delete completes
    res.redirect('/shopping');
    });
});

        //========================
        //===== Update / PUT ========
        //========================
shoppingRouter.put('/shopping/:id', (req, res) => {
Shopping.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
}, (error, updatedShopping) => {
    res.redirect(`http://localhost:3000/shopping/${req.params.id}`);
})
});

        //========================
        //===== Create / POST =======
        //========================
shoppingRouter.post('/shopping', (req,res)=> {
   Shopping.create(req.body, (error, createdShopping)=> {
        res.redirect('/shopping');
    });
    console.log(req.body);
});

        //========================
        //===== Edit / GET===========
        //========================
shoppingRouter.get('/shopping/:id/edit', (req, res) => {
   Shopping.findById(req.params.id, (err, foundShopping) => {
          res.render('edit.ejs', {shopping: foundShopping,});
    });
});

        //========================
        //===== Show / GET ==========
        //========================
shoppingRouter.get('/shopping/:id', (req,res)=>{
    Shopping.findById(req.params.id, (err, foundShopping) =>{
        // res.render('shoppingCart.ejs', {
        //    shopping: foundShopping,
        // });
    });
});

        //Export inventoryRouter variable through 
        //export method in module
        //===========================
module.exports = shoppingRouter;