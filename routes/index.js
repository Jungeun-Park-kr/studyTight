const express = require("express");
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router = express.Router();

const Todo=require('../models/todo_list');
const Course = require('../models/course');

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


// 메인
router.get('/', isLoggedIn, async(req, res) => { // app.get('주소', 라우터) : GET 요청이 올때 할 동작
    try {
        const todolist = await Todo.find({user_id: req.user._id}).populate('user_id');
        const timetable = await Course.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});
        //console.info(todolist);
        // res.send('Hello, Express'); // 테스트용
        res.render('../views/mainframe.ejs', {
            title: 'StudyTight 메인화면',
            todolist : todolist,
            timetable : timetable
        });
    }
    catch (err) {
        console.error('routes/index.js 에서 에러');
        console.error(err);
        next(err);
    }
});

router.get('/todo', isLoggedIn, async(req, res) => { // app.get('주소', 라우터) : GET 요청이 올때 할 동작
    try {
        const todolist = await Todo.find({user_id: req.user._id}).populate('user_id');
        const timetable = await Course.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});
        //console.info(todolist);
        // res.send('Hello, Express'); // 테스트용
        res.render('../views/mainframe.ejs', {
            title: 'StudyTight 메인화면',
            todolist : todolist,
            timetable : timetable
        });
    }
    catch (err) {
        console.error('routes/index.js 에서 에러');
        console.error(err);
        next(err);
    }
});
router.get('/', isNotLoggedIn, (req, res) => {
    try {
        // res.send('Hello, Express'); // 테스트용
        res.render('../views/login.ejs', {
            title: 'StudyTight 메인화면',
        });
    }
    catch (err) {
        console.error('routes/index.js 에서 에러');
        console.error(err);
        next(err);
    }
})

module.exports = router;