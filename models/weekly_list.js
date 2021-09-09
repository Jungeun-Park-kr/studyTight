const mongoose = require('mongoose');

const {Schema} = mongoose;
const { Types: {ObjectId}} = Schema;

const weeklyListSchema = new Schema({
    user_id : { 
        type : ObjectId,
        required:true,
        ref: 'User'
    }, 
    content:{type:String, required:true}, // 내용
    day : {type: String}, // 강의 요일
    date:{type:Date, defult: getCurrentDateWithoutTime()}, // 추가된 날짜
    finished:{type:Boolean, required:true, default:false},
    week_ago : {type:Number, default:0}, // 몇주 전 할일인지 기록
});

function getCurrentDateWithoutTime(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}


module.exports = mongoose.model('Weekly_List',weeklyListSchema); 