const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
});

userSchema.plugin(passportLocalMongoose);   // This will add username and password fields to the user schema and also add some methods to the user model like register, authenticate, serializeUser, deserializeUser etc.

module.exports = mongoose.model("User", userSchema);