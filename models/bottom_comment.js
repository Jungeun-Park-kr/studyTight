const mongoose = require('mongoose'); //model의 구성요소에서 필요한것
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const bottom_schema = new Schema({
    commented_email: { type: ObjectId, required: true, ref: 'User' },
    commenter_email: { type: ObjectId, required: true, ref: 'User' },
    comment_time: { type: String, required: true },
    comment_secret: { type: Boolean, required: true, default: 'false' },
    comment_parent_id: { type: ObjectId, ref: 'Top_comment' },
    post_id: { type: String, required: true },
    text: { type: String, required: true }

});

module.exports = mongoose.model('bottom_comment', bottom_schema);