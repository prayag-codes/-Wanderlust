const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isloggedIn } = require("../middleware.js");



// Post Route
router.post("/",isloggedIn,validateReview, wrapAsync( async (req,res) => {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
if (!listing) {
    throw new ExpressError(404, "Listing not found");
}
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await listing.save();
    await newReview.save();
     req.flash("success", "Successfully added the review!");
    return res.redirect(`/listings/${listing._id}`);   

}));

// Delete Review Route

router.delete("/:id/reviewID", wrapAsync (async (req,res) => {
    let {id, reviewID} = req.params;
    await Listing.findByIdAndUpdate(id, {pull : {reviews : reviewID}});
    await Review.findByIdAndDelete(reviewID);
    req.flash("success", "Successfully deleted the review!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;