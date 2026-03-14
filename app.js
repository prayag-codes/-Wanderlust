const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("Connect to DB");
 })
 .catch((err) => {
    console.log(err);
 });

async function main() {
    await mongoose.connect(MONGO_URL);
}


app.get("/" , (req,res) => {
    res.send("Hello World 14 March");
});

app.listen(8080, () => {
    console.log("Sever is listening to port 8080");
});