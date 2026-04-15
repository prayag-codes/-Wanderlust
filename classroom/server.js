const express = require("express");
const app = express();
const post = require("./routes/post.js");
const users = require("./routes/user.js");
const session = require("express-session");

app.use(session({secret: "mysupersecretstring" , resave: false, saveUninitialized: true}));

app.get("/reqcounter", (req, res) => {
    
    if(req.session.count) {
        req.session.count++;
    }else {
        req.session.count = 1;
    }

    res.send(`You send a request ${req.session.count} times`);
});


// app.get("/test", (req, res) => {
//     res.send("test Successful!");
// });

// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookies", (req, res) => {
//     res.cookie("made-in", "India", { signed:true});
//     res.send("Sent you some signed cookies!");
// });

// app.get("/verify", (req, res) => {
//     console.log(req.cookies);
//     res.send("Verfied the cookies, check the console!");
// });

// app.get("/getcookies", (req, res) => {
//     res.cookie("Greet", "Hello World");
//     res.send("Sent you some cookies!");
// });


// app.get("/" , (req,res) => {
//     let {name = "anonymous"} =  req.cookies;
//     res.send(`Hello, ${name}! Welcome to our website.`);
// });

// app.use("/users", users);
// app.use("/post", post);




 app.listen(3000, () => {
    console.log("Server is running on port 3000");
 });