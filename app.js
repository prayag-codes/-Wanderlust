const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");


const Listing = require("./models/listing.js");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "public")));

// app.get("/" , (req,res) => {
//     res.send("Hello World 14 March");
// });

//Index Route
app.get("/listings",wrapAsync( async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));

//New Route
app.get("/listings/new" , (req, res) => {
    res.render("listings/new.ejs");
});

//Show Route
// app.get("/listings/:id", async (req, res) => {
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     console.log("Listing =", listing);
//     res.render("listings/show.ejs", { listing });
// });

app.get("/listings/:id", wrapAsync(  async (req, res) => {
    try {
        console.log("SHOW ROUTE HIT");

        let { id } = req.params;
        console.log("ID =", id);

        const listing = await Listing.findById(id);
        console.log("Listing =", listing);

        if (!listing) {
            return res.send("Listing not found");
        }

        res.render("listings/show.ejs", { listing });

    } catch (err) {
        console.log("ERROR =", err);
        res.send(err.message);
    }
}));

// Create Route
app.post("/listings", wrapAsync(async (req, res, next) => {
    if(!req.body.listing) {
        throw new ExpressError(404, "Send valid data for listing");
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");  //  redirect ka  matlab hian ki kaam hone ke baad vapas ye page par return aa jao ✨
}));

//Edit Route
app.get("/listings/:id/edit", wrapAsync(  async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

// Update Route
app.put("/listings/:id", wrapAsync( async (req, res) => {
    if(!req.body.listing) {
        throw new ExpressError(404, "Send valid data for listing");
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});  // yaha 2 parameter pass kiya hain 👉(id, {...req.body.listing})
    res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id", wrapAsync(  async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

// app.get("/testListing", async (req,res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calngaute, Goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("Sample was Saved");
//     res.send("Successful Testing");
// });

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something Went Wrong"} = err;
    res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log("Sever is listening to port 8080");
});