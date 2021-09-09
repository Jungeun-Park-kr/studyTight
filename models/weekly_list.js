const mongoose = require('mongoose');

const {Schema} = mongoose;
const { Types: {ObjectId}} = Schema;

const weeklyListSchema=new Schema({
    user_id : { 
        type : ObjectId,
        required:true,
        ref: 'User'
    }, 
    content:{type:String,required:true}, // 내용
    day : {type: String}, // 강의 요일
    date:{type:Date, defult: getCurrentDate()},
    finished:{type:Boolean, required:true, default:false},
});

function getCurrentDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

module.exports = mongoose.model('Weekly_List',weeklyListSchema); 