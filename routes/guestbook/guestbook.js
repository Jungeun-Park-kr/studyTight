const express = require('express');
const { isLoggedIn, isNotLoggedIn} = require('../middlewares');
const Profile = require('../../models/profile');
const CourseSchedule = require('../../models/course_schedule');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

//미들웨어

// guestbook

router.get('/', isLoggedIn, async (req, res, next) => {

    try {
        
        const profile = await Profile.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});
        
        res.render( '../views/guestbook/guestbook_myroom.ejs', {
            // user : res.locals.user,
            // school: school,
            // school_private: school_privat,
            // major: major,
            // major_private : major_private,
            // grade : grade,
            // grade_private : grade_private,
            // timetable_private : timetable_private,
            // birth_private : birth_private
        });

        

    }
    catch (err) {
        console.error('/views/timetable/guestbook_myroom.ejs 에서 에러');
        console.error(err);
        next(err);
    }
});

module.exports = router;

//모듈로서 내보내줘야된다.