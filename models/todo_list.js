const mongoose=require('mongoose');
const {Schema} = mongoose;

const todo_schema=new Schema({
    user_id : { // 과목 주인의 _id (이메일 아님, 몽고DB 자체 _id)
        type : Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }, 
    todo_content:{type:String, unique:true, required:true}, //중복된 내용이 들어가지 않도록
    register_date:{type:Date, required:true},
    todo_finished:{type:Boolean, required:true}
});
// console.log(todo_schema.requiredPaths());


module.exports = mongoose.model('Todo_List',todo_schema); //이렇게 해야 따로 안생김!