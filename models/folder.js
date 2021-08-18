const mongoose = require('mongoose');
const path = require('path'); // 현재 프로젝트의 경로

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const folder_schema = new Schema({
    user_id: { // 과목 주인의 _id (이메일 아님, 몽고DB 자체 _id)
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    folder_name: { type: String, required: true },
    folder_fixed: { type: Boolean, required: true },
    folder_color: { type: String, required: true },
    folder_img: { type: String, required: true },
    postIt: [{ type: ObjectId, ref: 'PostIt' }]
});

module.exports = mongoose.model('Folder', folder_schema);