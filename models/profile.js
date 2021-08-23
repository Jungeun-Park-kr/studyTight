const mongoose = require('mongoose'); //model의 구성요소에서 필요한것
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const profile_schema = new Schema({
    user_id: { // 과목 주인의 _id (이메일 아님, 몽고DB 자체 _id)
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    school: { type: String, required: true, default:"initial_data" },
    school_private: { type: Boolean, default : false },
    major: { type: String, required: true, default:"initial_data" },
    major_private: { type: Boolean, default : false },
    grade: { type: Number, required: true, default:0 },
    grade_private: { type: Boolean, default : false },
    age_private: { type: Boolean, default : false },
    timetable_private: { type: Boolean, default : false },
    group: [{ type: String }]

});

module.exports = mongoose.model('Profile', profile_schema);