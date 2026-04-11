const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");


const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError (404, errMsg);
    } else {
        next();
    }
};

//Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

//New Route
router.get("/new" , (req, res) => {
    res.render("listings/new.ejs");
});

//Show Route
router.get("/:id", async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(req.params.id).populate("reviews");
    console.log("Listing =", listing);
    console.log("Reviews =", listing.reviews);
    res.render("listings/show.ejs", { listing });
});


// Create Route
router.post("/", wrapAsync(async (req, res) => {

    if (!req.body.listing.image) {
        req.body.listing.image = { url: "" };
    }

    let imageUrl = req.body.listing.image?.url;

    if (!imageUrl || imageUrl.trim() === "") {
        imageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
    }

    req.body.listing.image = { url: imageUrl };

    // 👉 अब validation करो
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }

    const newListing = new Listing(req.body.listing);

    await newListing.save();
    res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit",wrapAsync(async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}));

// Update Route
// router.put("/:id",  validateListing,wrapAsync(async (req, res) => {
//     if (!req.body.listing.image) {
//         req.body.listing.image = { url: "" };
//     }
//     let {id} = req.params;
//     await Listing.findByIdAndUpdate(id, {...req.body.listing});  // yaha 2 parameter pass kiya hain 👉(id, {...req.body.listing})
//     res.redirect(`/listings/${id}`);
//     console.log(req.body);
// }));
router.put("/:id", wrapAsync(async (req, res) => {

    if (!req.body.listing.image) {
        req.body.listing.image = { url: "" };
    }

    let { id } = req.params;

    let imageUrl = req.body.listing.image?.url;

    if (!imageUrl || imageUrl.trim() === "") {
        const existingListing = await Listing.findById(id);
        imageUrl = existingListing.image.url;
    }

    req.body.listing.image = { url: imageUrl };

    // 👉 validation AFTER fixing data
    const { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }

    await Listing.findByIdAndUpdate(id, req.body.listing);

    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id",wrapAsync(async(req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));


module.exports = router;