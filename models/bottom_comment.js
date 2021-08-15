const mongoose = require('mongoose'); //model의 구성요소에서 필요한것
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const bottom_schema = new Schema({
    commented_email: { type: ObjectId, required: true },
    commenter_email: { type: ObjectId, required: true },
    comment_time: { type: String, required: true },
    comment_secret: { type: Boolean, required: true },
    comment_parenet_id: { type: ObjectId, ref: 'Top_comment' },
    post_id: { type: String, required: true },
    text: { type: String, required: true }

});

module.exports = mongoose.model('bottom_comment', bottom_schema);