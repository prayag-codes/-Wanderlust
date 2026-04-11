const express = require("express");
const router = express.Router();


// Users Routes
//Index Route
router.get("/", (req, res) => {
    res.send("Get all users");
});

//Show Route
router.get("/:id", (req, res) => {
    res.send("Get users user Id");
});

//POST Route
router.post("/", (req, res) => {
    res.send("post for user");
});

//DELETE Route
router.delete("/:id", (req, res) => {
    res.send("Delete a user");
});

module.exports = router;