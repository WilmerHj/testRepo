const express = require("express");
const router = express.Router();
const File = require("../../File");
const {v4} = require("uuid") ;

const users = new File("users.json").read();

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/:user", (req, res) => {
    // console.log(users[req.params.user])
    res.send(users[req.params.user]);
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
// router.post("/", (req, res) => {
//     console.log("POST");
//     const newItem = {
//         id:v4(),
//         bbd:Date.parse(req.body.date) || Date.now(),
//         name: req.body.name
//     };
    
//     f.add('items', newItem);
// });

// // @route   DELETE api/items:id
// // @desc    Delete An Item
// // @access  Public
// router.delete("/", (req, res) => {
//     console.log("DELETE");
//     f.remove('items', req.body.id);
// });

module.exports = router;