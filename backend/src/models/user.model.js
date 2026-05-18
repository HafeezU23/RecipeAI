const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    username: {type: String, required: true, unique: [true, "usename must be unique"]},
    email: {type: String, required: true, unique: [true, "email must be unique"]},
    firebaseUid: {type: String, required: true, unique: true},
    isVerified: {type: Boolean, default: false}
},{timestamps: true})


const userModel = mongoose.model("user", userSchema);
module.exports = userModel