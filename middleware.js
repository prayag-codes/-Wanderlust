const Listing = require("./models/listing");    
const ExpressError = require("./utils/ExpressError.js")
const { listingSchema, reveiewSchema } = require("./schema.js");

module.exports.isloggedIn =(req, res, next) => {
console.log(req.path, ".." , req.originalUrl);
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;  // This will store the URL the user was trying to access before being redirected to the login page. We can use this information to redirect the user back to that URL after they successfully log in.  
       req.flash("error", "You must be login to create a listing!"); 
       return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl || null;
}
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(! listing.owner.equals(req.user._id)) {
        req.flash("error", "You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError (404, errMsg);
    } else {
        next();
    }
};


module.exports.validateReview = (req, res, next) => {
    let {error} = reveiewSchema.validate(req.body, {convert: true });
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError (404, errMsg);
    } else {
        next();
    }
}