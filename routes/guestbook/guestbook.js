const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const Profile = require('../../models/profile');
const CourseSchedule = require('../../models/course_schedule');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

//미들웨어

// guestbook

router.get('/', isLoggedIn, async(req, res, next) => {

    try {

        const profile = await Profile.find({ user_id: res.locals.user._id }).populate('user_id').populate('schedules').sort({ 'createdAt': -1 });

        res.render('../views/guestbook/guestbook_myroom.ejs', {
            school: req.body.school,
            school_private: req.body.school_privat,
            major: req.body.major,
            major_private: req.body.major_private,
            grade: req.body.grade,
            grade_private: req.body.grade_private,
            age_private: req.body.birth_private
        });



    } catch (err) {
        console.error('/views/timetable/guestbook_myroom.ejs 에서 에러');
        console.error(err);
        next(err);
    }
});


router.post('/editprofile', isLoggedIn, async(req, res, next) => {
    const { school, school_private, major, major_private, grade, grade_private, timetable_private, age, gender } = req.body;

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

        console.log({
            user_id: req.user._id,
            school: school,
            school_private: school_private,
            major: major,
            major_private: major_private,
            grade: grade,
            grade_private: grade_private,
            age: age,
        });

        res.send({
            user_id: req.user._id, //박정은의 오브젝트 아이디.
            school: profile.school,
            school_private: profile.school_private,
            major: profile.major,
            major_private: profile.major_private,
            grade: profile.grade,
            grade_private: profile.grade_private,
            age: profile.age_private,
        });

    } catch (err) {
        console.log('에러난듯');
        next(err);
    }

});

module.exports = router;

module.exports = router;

//모듈로서 내보내줘야된다.