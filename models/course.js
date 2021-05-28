const mongoose = require('mongoose');
const path = require('path'); // 현재 프로젝트의 경로

const {Schema} = mongoose;
const { Types: {ObjectId}} = Schema;


const courseSchema = new Schema( {
    user_id : { // 과목 주인의 _id (이메일 아님, 몽고DB 자체 _id)
        type : ObjectId,
        required:true,
        ref: 'User'
    }, 
    course_name: { type: String, required: true },
    professor_name: { type: String, required: true },
    schedules: [ // 과목 시간 리스트
        {   type : ObjectId,
            // type: Schema.Types.ObjectId, // 위와 동일
            ref: 'Course_Schedule'
        }],
    createdAt : {
        type : Date,
        defult: getCurrentDate(),
    }
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


module.exports = mongoose.model('Course', courseSchema);