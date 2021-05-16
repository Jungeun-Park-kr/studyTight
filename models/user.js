const mongoose = require('mongoose');

const {Schema} = mongoose;
// const { Types: {ObjectId}} = Schema;
const userSchema = new Schema( {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name :{ type: String, required: true },
    profile_image : { type: String, default: 'default_img'},
    // provider: { //로그인 로컬로
    //     type: String,
    //     default: 'local',
    // },
    // isAdmin: { type: Boolean, default: false }
});


module.exports = mongoose.model('User', userSchema);