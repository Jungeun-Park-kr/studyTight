// const mongoose=require('mongoose');
// mongoose.connect('');
// mongoose.connection.on('open',function(){
//     console.log(mongoose.connection.collection);
//     mongoose.connection.db.collectionNames(function(err,names){
//         console.log(names);
//         mongoose.disconnect();
//     });
// }); //mongoose를 사용해 mongodb db에 연결
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const todo_schema=new Schema({
    email:{type:String, unique:true, requried:true},
    todo_content:{type:String, unique:true, required:true}, //중복된 내용이 들어가지 않도록
    register_date:{type:Date, required:true},
    todo_finished:{type:Boolean, required:true}
});
console.log(todo_schema.requiredPaths());
module.exports=moogoose.model('TodoList',todo_schema); 