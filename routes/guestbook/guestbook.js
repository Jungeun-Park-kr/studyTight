const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const Profile = require('../../models/profile');
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
            // .select('major')
            //첫번째 . 까진 id똑같은걸로 찾는거
        res.render('../views/guestbook/guestbook_myroom.ejs', {
            profile: profile[0]
        });

        console.log(profile[0]);


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

        //console.log(profile);

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

    const user = await User.fine({ user_id: res.locals.user._id }).populate('user_id');

    try {
        const user = await User.updateOne({
            name: name
        }, {
            $set: {
                //
            }
        });


    } catch (err) {
        next(err);
    }
});

module.exports = router;

//모듈로서 내보내줘야된다.