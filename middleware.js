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