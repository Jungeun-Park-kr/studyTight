const express = require('express');
const { isLoggedIn, isNotLoggedIn} = require('../middlewares');
const Course = require('../../models/course');
const Users = require('../../models/user');
const { mongo, Mongoose } = require('mongoose');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


router.get('/:id', isLoggedIn, async (req, res, next) => {
    try {
        //console.log('현재 로그인:'+res.locals.user.email);
        console.log('친구 :' + req.params.id);
        const friend = await Users.findOne({email_id:req.params.id}); // 클릭한 친구
        console.log('-------------친구-----------');
        console.info(friend);
        const timetable = await Course.find({user_id:friend._id}).populate('schedules').sort({'createdAt':1}); // 클릭한 친구의 시간표
        // 클릭한 친구와 내가 친구가 되어있는지 확인 및 시간표 보기 권한 있는지 확인
        // in here

        console.log('---------------------친구 시간표---------------------');
        console.info(timetable);

        res.render( '../views/guestbook/guestbook_timetable.ejs', {
            title: friend.name+'의 시간표',
            user : res.locals.user,
            friend : friend,
            timetable : timetable
        });

    }
    catch (err) {
        console.error('/views/timetable/timetable.js 에서 에러');
        console.error(err);
        next(err);
    }
});

module.exports = router;