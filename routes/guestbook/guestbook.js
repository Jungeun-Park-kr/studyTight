const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const Profile = require('../../models/profile');
const User = require('../../models/user');
const Friend = require('../../models/friend'); //친구관리를 위함.
const { mongo, Mongoose } = require('mongoose');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

//미들웨어

// guestbook

router.get('/', isLoggedIn, async(req, res, next) => {

    try {

        const profile = await Profile.find({ user_id: res.locals.user._id }).populate('profiles')
        const friend = await Friend.find({ user_id: res.locals.user._id }).populate('friends')
            // .select('major')
            //첫번째 . 까진 id똑같은걸로 찾는거
        res.render('../views/guestbook/guestbook_myroom.ejs', {
            profile: profile[0],
            friend: friend
        });


    } catch (err) {
        console.error('/views/timetable/guestbook_myroom.ejs 에서 에러');
        console.error(err);
        next(err);
    }
});

router.get('/searchemail', isLoggedIn, async(req, res, next) => {

    try {
        const { searchemail } = req.body;
        const profile = await Profile.find({ user_id: res.locals.user._id }).populate('profiles')
        const friend = await Friend.find({ user_id: res.locals.user._id }).populate('friends')
            // .select('major')
            //첫번째 . 까진 id똑같은걸로 찾는거
        res.render('../views/guestbook/guestbook_myroom.ejs', {
            profile: profile[0],
            friend: friend
        });

    } catch (err) {
        console.error('/views/timetable/guestbook_myroom.ejs 에서 에러');
        console.error(err);
        next(err);
    }
});



router.post('/editprofile', isLoggedIn, async(req, res, next) => {
    const { school, school_private, major, major_private, grade, grade_private, age, gender } = req.body;

    try {
        // mongoDB에 프로파일 추가
        const profile = await Profile.create({
            user_id: req.user._id,
            school: school,
            school_private: school_private,
            major: major,
            major_private: major_private,
            grade: grade,
            grade_private: grade_private,
            age: age,

        });


        // res.send({
        //     user_id: req.user._id, //박정은의 오브젝트 아이디.
        //     school: profile.school,
        //     school_private: profile.school_private,
        //     major: profile.major,
        //     major_private: profile.major_private,
        //     grade: profile.grade,
        //     grade_private: profile.grade_private,
        //     age: profile.age_private,
        // });

    } catch (err) {
        console.log('guestbookedit error');
        next(err);
    }

});

router.patch('/editprofile', isLoggedIn, async(req, res, next) => { //update할 데이터의 구분자: id

    try {
        const user = await User.findOne({ _id: res.locals.user._id });
        const { name, school, school_private, major, major_private, grade, grade_private, age, gender } = req.body;
        console.info(user);
        const users = await User.updateOne({ //해당하는 값을 필터링함
            _id: name
        }, {
            $set: { //해당하는 값을 바꿈
                //
            }
        });


    } catch (err) {
        next(err);
    }
});

router.get('/:id', isLoggedIn, async(req, res, next) => {

    const id_obj = req.params.id; //내가 보내준 ID
    try {
        //일단 유저정보를 받아와서 페이지 먼저 띄우기.
        const user = await User.findOne({ email_id: id_obj });
        const profile = await Profile.findOne({ user_id: user._id });
        res.render('../views/guestbook/guestbook_friendroom.ejs', {
            friend_id: id_obj,
            profile: profile
        });
    } catch (err) {
        next(err);
    }
});

router.get('/:id/timetable', isLoggedIn, async(req, res, next) => {
    
});


module.exports = router;

//모듈로서 내보내줘야된다.