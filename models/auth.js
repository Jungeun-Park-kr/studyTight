// 이메일 인증 (비밀번호 찾기)용 콜렉션
const mongoose = require('mongoose');

const {Schema} = mongoose;
const { Types: {ObjectId}} = Schema;
const authSchema = new Schema( {
    token : { type: String, required:true},
    user_id : { // 과목 주인의 _id (이메일 아님, 몽고DB 자체 _id)
        type : ObjectId,
        required:true,
        ref: 'User'
    }, 
    // ttl : {type:Number, required: true}, // token 유효 시간
    createdAt : {type:Date} // 인증 번호 발송 시간
});

module.exports = mongoose.model('Auth', authSchema);