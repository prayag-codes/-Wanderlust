const express = require("express");
const router = express.Router();


// POST 
//Index  
router.get("/ ", (req, res) => {
    res.send("Get all posts");
});

//Show  
router.get("/:id", (req, res) => {
    res.send("Get posts post Id");
});

//POST  
router.post("/", (req, res) => {
    res.send("post for post");
});

//DELETE  
router.delete("/:id", (req, res) => {
    res.send("Delete a post");
});

module.exports = router;