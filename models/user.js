const mongoose = require('mongoose');
const path = require('path'); // 현재 프로젝트의 경로

const {Schema} = mongoose;
// const { Types: {ObjectId}} = Schema;
const userSchema = new Schema( {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name :{ type: String, required: true },
    profile_image : { type: String,
        default: '/public/media/user.png'
    },
    email_auth : {type: Boolean, 
        required:true,
        default : false
    },
    auth_number : {
        type: String,
        default: ''
    }
    // provider: { //로그인 로컬로
    //     type: String,
    //     default: 'local',
    // },
    // isAdmin: { type: Boolean, default: false }
});


module.exports = mongoose.model('User', userSchema);