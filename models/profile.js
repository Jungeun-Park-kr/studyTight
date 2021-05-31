const mongoose=require('mongoose'); //model의 구성요소에서 필요한것
const {Schema} = mongoose;

const profile_schema=new Schema({
    user_id : { // 과목 주인의 _id (이메일 아님, 몽고DB 자체 _id)
        type : Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }, 
    school:{type:String, required:true},
    school_private:{type:Boolean, required:true},
    major:{type:String, required:true},
    major_private:{type:Boolean, required:true},
    grade:{type:Number, required:true},
    grade_private:{type:Boolean, required:true},
    birth_private:{type:Boolean, required:true}

});

module.exports = mongoose.model('Profile',profile_schema); 