const express = require("express");
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router = express.Router();
const Todo=require('../models/todo_list');
const Course = require('../models/course');
const Dday=require('../models/d_day');

const fs=require('fs');


// router.post(){ //d_day 작성할 때

// }
// router.patch(){ //d_day 수정할 때

// }
// router.delete(){ //d_day 삭제할 때

// }


router.post('/',isLoggedIn, async(req, res) => {
    console.log('post 요청옴', req.body);
    const {date, content, today} = req.body;

    try {
        // mongoDB에 과목 추가
        const dday = await Dday.create({
            user_id : req.user._id,
            dday_content : content,
            final_date : date,
            start_date : today
        });

        res.send('success');

    } catch(err) {
        return (err);
    }
    
});

module.exports = router;