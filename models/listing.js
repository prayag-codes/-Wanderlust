const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{ 
        type: String,
        required: true,
    },
    description: String,
    // iamge: {
    //     type: String,
    //     default : "https://unsplash.com/photos/aerial-view-of-a-coastal-city-with-mountains-and-ocean-uaHQoE-rUL0",
    //     set: (v) => 
    //         v === " " 
    //     ? "https://unsplash.com/photos/aerial-view-of-a-coastal-city-with-mountains-and-ocean-uaHQoE-rUL0" 
    //     : v,

    // },
    image: {
  url: String,
  filename: String,
},
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

listingSchema.post("findOneAndDelete", async (listing)  => {
    if(listing) {
    await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;