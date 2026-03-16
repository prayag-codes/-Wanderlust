const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{ 
        type: String,
        required: true,
    },
    description: String,
    iamge: {
        type: String,
        default : "https://unsplash.com/photos/aerial-view-of-a-coastal-city-with-mountains-and-ocean-uaHQoE-rUL0",
        set: (v) => 
            v === " " 
        ? "https://unsplash.com/photos/aerial-view-of-a-coastal-city-with-mountains-and-ocean-uaHQoE-rUL0" 
        : v,

    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;