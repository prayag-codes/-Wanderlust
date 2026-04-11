const express = require("express");
const app = express();
const post = require("./routes/post.js");
const users = require("./routes/user.js");

app.get("/" , (req,res) => {
    res.send("Hello, I am a server Route!!");
});

app.use("/users", users);
app.use("/post", post);



 app.listen(3000, () => {
    console.log("Server is running on port 3000");
 });