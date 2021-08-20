const mongoose = require('mongoose'); //model의 구성요소에서 필요한것
const { Schema } = mongoose;

const friend_schema = new Schema({
    user_id: { // 과목 주인의 _id (이메일 아님, 몽고DB 자체 _id)
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Friend_ID: { type: String },
    Friend_Name: { type: String },
    received: { type: Boolean },
    send: { type: Boolean },
    friend_link: { type: String },
    friend_group: { type: String },

});

module.exports = mongoose.model('Friend', friend_schema);