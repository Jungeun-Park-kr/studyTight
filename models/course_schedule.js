const mongoose = require('mongoose');
const path = require('path'); // 현재 프로젝트의 경로

const {Schema} = mongoose;
const { Types: { ObjectId }} = Schema;

const courseSchema = new Schema( {
    course_id : { type : ObjectId, ref: 'Course'},
    day : { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    course_type: { type: String, required: true },
    classroom: { type: String, required: true },
});

module.exports = mongoose.model('CourseSchedule', courseSchema);