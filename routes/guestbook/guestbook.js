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
            // timetable_private: timetable_private,
            birth_private: req.body.birth_private
        });



    } catch (err) {
        console.error('/views/timetable/guestbook_myroom.ejs 에서 에러');
        console.error(err);
        next(err);
    }
});

router.post('/', isLoggedIn, async(req, res, next) => {
    var content = req.body.todo_content;


    try {
        //몽고db에 저장
        const todo = await Todo.create({
            user_id: req.user._id,
            todo_content: content,
            register_date: getCurrentDate(),
            todo_finished: false
        });

        res.send({
            _id: todo._id,
            user_id: req.user._id,
            todo_content: todo.todo_content,
            todo_finished: todo.todo_finished
        });
        // res.render('../views/mainframe.ejs',
        //     { title : 'study Tight', todolist:todo, timetable:timetable, folder: folder}
        // );

    } catch (err) {
        next(err);
    }
});

module.exports = router;

//모듈로서 내보내줘야된다.