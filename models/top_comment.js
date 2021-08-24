const mongoose = require('mongoose'); //model의 구성요소에서 필요한것
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const top_schema = new Schema({
    commented_email: { type: ObjectId, ref: 'User' },
    commenter_email: { type: ObjectId, ref: 'User' },
    comment_time: { type: String },
    comment_secret: { type: Boolean, default: 'false' },
    comment_count: { type: Number },
    post_id: { type: String },
    text: { type: String, required: true }

});

module.exports = mongoose.model('top_comment', top_schema);