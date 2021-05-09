const mongoose = require('mongoose');

const {Schema} = mongoose;
// const { Types: {ObjectId}} = Schema;
const userSchema = new Schema( {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name :{ type: String, required: true },
    profile_image : { type: String }
    // isAdmin: { type: Boolean, default: false }
});


module.exports = mongoose.model('User', userSchema);