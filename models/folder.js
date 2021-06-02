const mongoose=require('mongoose');
const {Schema} = mongoose;

const folder_schema=new Schema({
    user_id : { // 과목 주인의 _id (이메일 아님, 몽고DB 자체 _id)
        type : Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },  
    folder_name:{type:String, unique:true, required:true}, //중복된 내용이 들어가지 않도록
    folder_fixed:{type:Boolean, required:true},
    folder_color:{type:String, required:true}
});

module.exports = mongoose.model('Folder',folder_schema);