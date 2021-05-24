const mongoose = require('mongoose');
const path = require('path'); // 현재 프로젝트의 경로

const {Schema} = mongoose;
const { Types: {ObjectId}} = Schema;
const timetableSchema = new Schema( {
    email : { // 작성자
        type : ObjectId,
        required:true,
        ref: 'User'
    }, 
    course_name: { type: String, required: true },
    professor_name: { type: String, required: true },
    schedules: [ // 과목 시간 리스트
        {   type : ObjectId,
            // type: Schema.Types.ObjectId, // 위와 동일
            ref: 'CourseSchedule'
        }]
});


module.exports = mongoose.model('Timetable', timetableSchema);