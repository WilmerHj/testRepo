const express = require("express");
const router = express.Router();
const File = require("../../File");
const {v4} = require("uuid") ;

// Item Model
// const Item = require("../../models/Item");

const f = new File("db.json");
// console.log(f.read().items);


// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
    // console.log(f.read())
    res.send(f.read().items);
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post("/", (req, res) => {
    console.log("POST");
    const newItem = {
        id:v4(),
        bbd:Date.parse(req.body.date) || Date.now(),
        name: req.body.name
    };
    
    f.add('items', newItem);
});

// @route   DELETE api/items:id
// @desc    Delete An Item
// @access  Public
router.delete("/", (req, res) => {
    console.log("DELETE");
    f.remove('items', req.body.id);
});


router.get("/barCodes/", (req, res) => {
    res.send(f.read().Barcodes);
});

router.post("/BarCodes/", (req, res) => {
    console.log(req.body);
    req.body.ean && f.add('Barcodes', req.body);
});



module.exports = router;