const mongoose = require('mongoose');
const path = require('path'); // 현재 프로젝트의 경로

const {Schema} = mongoose;
const { Types: {ObjectId}} = Schema;
const userSchema = new Schema( {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name :{ type: String, required: true },
    birth : {type: String, required: true},
    profile_image : { type: String,
        default: '/public/media/user.png'
    },
    // courses : [{ type : ObjectId}], // 필요없음 (courses에서 ref한 후에 데이터 가져올때 populate 해주기 때문)
    
    promotion : { type : Boolean }
    // provider: { //로그인 로컬로
    //     type: String,
    //     default: 'local',
    // },
    // isAdmin: { type: Boolean, default: false }
});


module.exports = mongoose.model('User', userSchema);