module.exports.isloggedIn =(req, res, next) => {
    if(!req.isAuthenticated()) {
       req.flash("error", "You must be login to create a listing!"); 
       return res.redirect("/login");
    }
    next();

}