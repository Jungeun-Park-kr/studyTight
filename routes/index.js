const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const Todo = require('../models/todo_list');
const Course = require('../models/course');
const Folder = require('../models/folder');
const PostIt=require('../models/postit');
const Dday = require('../models/d_day');
const Profile = require('../models/profile');
const Friends = require('../models/friend');
const logger = require('../logger');
// const Email = require('../models/searchemail');

var objectId = require('mongodb').ObjectID;
//Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
//이 에러 때문에 일단 추가함. 

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

//console.log(getCurrentDate().year, getCurrentDate().month, getCurrentDate().day);
// 메인
router.get('/', isLoggedIn, async(req, res) => { // app.get('주소', 라우터) : GET 요청이 올때 할 동작
    try {
        const folder = await Folder.find({ user_id: res.locals.user._id }).populate('user_id').sort({ 'createdAt': -1 }).sort({'folder_fixed': -1});
        const timetable = await Course.find({ user_id: res.locals.user._id }).populate('user_id').populate('schedules').sort({ 'createdAt': -1 });
        // todo_finished가 true인 것 중에서 오늘 날짜와 register_date를 비교해서 다르다면  삭제하고 삭제 된 todolist를 rendering하기
        //const todolist = await Todo.find({user_id: req.user._id}).populate('user_id');
        //console.info(todolist);
        //삭제 성공!
        await Todo.deleteMany({ user_id: res.locals.user._id, todo_finished: true, register_date: { $ne: getCurrentDate() } })

        const todo = await Todo.updateMany({
            user_id: req.user._id, //필터링 하는 것

        }, {
            $set: {
                register_date: getCurrentDate()
            }
        });

        const todolist = await Todo.find({user_id: req.user._id}).populate('user_id');
        const todo_checked= await Todo.find({user_id: req.user._id}).populate('user_id').find({"todo_finished":true});
        // 디데이 날짜지난 것 삭제
        console.log('getToday()'+getToday());
        //const result = await Dday.find({ user_id: res.locals.user._id, final_date: { $lt: getToday()} }); // 테스트용
        //console.log(result);
        await Dday.deleteMany({ user_id: res.locals.user._id, final_date: { $lt: getToday()} });
        //$gt, $gte, $lt, $lte
        const dDay = await Dday.find({ user_id: res.locals.user._id }).sort({ 'final_date': 1 });

    
        //남은 애들은 register_date를 하나 추가하기
        res.render('../views/mainframe.ejs', {
            title: 'StudyTight 메인화면',
            todolist: todolist,
            todo_checked: todo_checked,
            timetable: timetable,
            folder: folder,
            d_day: dDay,
        });
    } catch (err) {
        //console.error('routes/index.js 에서 에러');
        logger.error('routes/index.js 에서 에러');
        logger.error(err);

    }
});

router.get('/todo', isLoggedIn, async(req, res) => { // app.get('주소', 라우터) : GET 요청이 올때 할 동작
    try {
        const todolist = await Todo.find({ user_id: req.user._id }).populate('user_id');
        const timetable = await Course.find({ user_id: res.locals.user._id }).populate('user_id').populate('schedules').sort({ 'createdAt': -1 });
        const folder = await Folder.find({ user_id: res.locals.user._id }).populate('user_id');
        //console.info(todolist);
        // res.send('Hello, Express'); // 테스트용

        res.render('../views/mainframe.ejs', {
            title: 'StudyTight 메인화면',
            todolist: todolist,
            timetable: timetable,
            folder: folder,
            d_day: dDay,
        });
        //res.send(todolist);
    } catch (err) {
        logger.error('routes/index.js todo get에서 에러');
        logger.error(err);
        next(err);
    }
});

router.post('/folder_add', isLoggedIn, async(req, res, next) => {
    var folder_name = req.body.folder_name;
    var folder_color = req.body.folder_color;
    var folder_img=req.body.folder_img;
    const todolist = await Todo.find({ user_id: req.user._id }).populate('user_id');
    const timetable = await Course.find({ user_id: res.locals.user._id }).populate('user_id').populate('schedules').sort({ 'createdAt': -1 });
    const dDay = await Dday.find({ user_id: res.locals.user._id }).sort({ 'final_date': 1 });
    //console.log(JSON.stringify(content)); //추가된 todo값

    try {
        //몽고db에 저장
        const folder = await Folder.create({
            user_id: req.user._id,
            folder_name: folder_name,
            folder_color: folder_color,
            folder_img: folder_img,
            folder_fixed: false
        });

        // res.render('../views/mainframe.ejs',
        //     { title : 'study Tight', todolist:todolist, timetable:timetable, folder:folder}
        // );

        res.send({folder_id:folder._id});

    } catch (err) {
        logger.error('routes/index.js 폴더 추가 과정에서 에러');
        next(err);
    }
});
router.get('/folder_add', isLoggedIn, async(req, res, next) => {
    try {
        const todolist = await Todo.find({ user_id: req.user._id }).populate('user_id');
        const timetable = await Course.find({ user_id: res.locals.user._id }).populate('user_id').populate('schedules').sort({ 'createdAt': -1 });
        const folder = await Folder.find({ user_id: res.locals.user._id }).populate('user_id');
        const dDay = await Dday.find({ user_id: res.locals.user._id }).sort({ 'final_date': 1 });
        const folder_id=req.query.folder_id;
        console.log("get에서 받은 "+folder_id);
        res.send(folder_id);

        res.render('../views/mainframe.ejs', {
            title: 'StudyTight 메인화면',
            todolist: todolist,
            timetable: timetable,
            folder: folder,
            d_day: dDay,
        });
        //res.send(todolist);
    } catch (err) {
        logger.error('routes/index.js 폴더 추가  get과정에서 에러');
        logger.error(err);
        next(err);
    }
});
router.post('/todo', isLoggedIn, async(req, res, next) => {
    var content = req.body.todo_content;
    console.log('투두 추가'+content);
    //console.log(JSON.stringify(content)); //추가된 todo값

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
        logger.error('routes/index.js 오늘 할 일 추가 과정에서 에러');
        next(err);
    }
});

router.patch('/', isLoggedIn, async(req, res, next) => { //update할 데이터의 구분자: id
    // const timetable = await Course.find({ user_id: res.locals.user._id }).populate('user_id').populate('schedules').sort({ 'createdAt': -1 });
    // const folder = await Folder.find({ user_id: res.locals.user._id }).populate('user_id');
    // const dDay = await Dday.find({ user_id: res.locals.user._id }).sort({ 'final_date': 1 });

    try {
        const todo = await Todo.updateOne({
            user_id: req.user._id, //필터링 하는 것
            _id: req.body.todo_id //내용에 따라서도 달라야하니까
        }, {
            $set: {
                todo_finished: req.body.todo_finished
            }
        });
        //console.log(req.body.todo_content+"의 값: "+req.body.todo_finished); //undefined: undefined라고 뜬다..
        //console.log(todo_finished);
        //res.render('../views/mainframe.ejs', { title: 'study Tight', todolist: todo, timetable: timetable, folder: folder, d_day: dDay });
        //res.redirect('/');
        res.send("오늘 할 일 체크 완료");

    } catch (err) {
        logger.error('routes/index.js 오늘 할 일 체크 과정에서 에러');
        next(err);
    }
});
router.patch('/todo_revise', isLoggedIn, async(req,res,next) => {
    try{
        const todo=await Todo.updateOne({
            user_id:req.user._id,
            _id:req.body.todo_id
        },{
            $set: {
                todo_content: req.body.todo_content
            }
        });
        res.send("오늘 할 일 수정 완료");

    }catch(err){
        logger.error('routes/index.js 오늘 할 일 내용 수정 과정에서 에러');
        next(err); 
    }
});
router.patch('/folder_revise', isLoggedIn, async(req, res, next) => { //update할 데이터의 구분자: id
    // const timetable = await Course.find({ user_id: res.locals.user._id }).populate('user_id').populate('schedules').sort({ 'createdAt': -1 });
    // const folder = await Folder.find({ user_id: res.locals.user._id }).populate('user_id');
    // const dDay = await Dday.find({ user_id: res.locals.user._id }).sort({ 'final_date': 1 });
    // const todo=await Todo.find()
    try {
        const folder = await Folder.updateOne({
            user_id: req.user._id, //필터링 하는 것
            _id:req.body.folder_id,

        }, {
            $set: {
                folder_name:req.body.revise_folder_name,
                folder_color:req.body.revise_folder_color,
                folder_img:req.body.revise_folder_img
            }
        });
        //console.log(req.body.todo_content+"의 값: "+req.body.todo_finished); //undefined: undefined라고 뜬다..
        //console.log(todo_finished);
        //res.render('../views/mainframe.ejs', { title: 'study Tight', todolist: todo, timetable: timetable, folder: folder, d_day: dDay });
        //res.redirect('/');
        res.send(folder);

    } catch (err) {
        logger.error('routes/index.js 폴더 수정 과정에서 에러');
        next(err);
    }
});
router.patch('/folder_fixed', isLoggedIn, async(req, res, next) => { //update할 데이터의 구분자: id

    try {
        const folder = await Folder.updateOne({
            user_id: req.user._id, //필터링 하는 것
            _id:req.body.folder_id,

        }, {
            $set: {
                folder_fixed:req.body.folder_fixed
            }
        });

        res.send(folder);

    } catch (err) {
        logger.error('routes/index.js 폴더 체크 과정에서 에러');
        next(err);
    }
});
router.delete('/', isLoggedIn, async(req, res, next) => { //할 일 목록에서 삭제 버튼을 누른 경우

    // const timetable = await Course.find({ user_id: res.locals.user._id }).populate('user_id').populate('schedules').sort({ 'createdAt': -1 });
    // const folder = await Folder.find({ user_id: res.locals.user._id }).populate('user_id');
    // const dDay = await Dday.find({ user_id: res.locals.user._id }).sort({ 'final_date': 1 });
    try {
        const delete_todoId = req.body.todo_id;
        await Todo.deleteOne({ user_id: res.locals.user._id, _id: delete_todoId });
        //console.log('삭제된 것의 id는'+ delete_todoId);
        const todo = await Todo.find({ user_id: req.user._id }).populate('user_id');
        //console.log('남은 것은 이제 '+todo.todo_content);
        //res.render('../views/mainframe.ejs', { title: 'study Tight', todolist: todo, timetable: timetable, folder: folder, d_day: dDay, });
        res.send("할 일 목록 삭제 성공");
    } catch (err) {
        logger.error('routes/index.js 오늘 할 일 삭제 과정에서 에러');
        next(err);
    }
});
router.delete('/day', isLoggedIn, async(req, res, next) => { //할 일 목록에서 삭제 버튼을 누른 경우

    //const timetable = await Course.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});
    //const folder = await Folder.find({user_id:res.locals.user._id}).populate('user_id');
    //const dDay = await Dday.find({user_id: res.locals.user._id}).sort({'final_date':1});
    try {
        const delete_day = req.body.dday_content;
        await Dday.deleteOne({ user_id: res.locals.user._id, dday_content: delete_day });

        const dDay = await Todo.find({ user_id: req.user._id }).sort({ 'final_date': 1 });
        //console.log('남은 것은 이제 '+todo.todo_content);
        //res.render('../views/mainframe.ejs',
        //{ title : 'study Tight', todolist:todo, timetable:timetable, folder: folder, d_day : dDay,});
        res.send('디데이 삭제 성공!')
    } catch (err) {
        logger.error('routes/index.js 디데이 삭제 과정에서 에러');
        next(err);
    }
});
router.delete('/folder', isLoggedIn, async(req, res, next) => {
    //폴더를 삭제할 경우
    try {

        await PostIt.deleteMany({folder_id:req.body.folder_id});
        await Folder.deleteOne({ user_id: res.locals.user._id, _id: req.body.folder_id });
        //console.log(req.body.folder_id);

       // const folder = await Folder.find({ user_id: res.locals.user._id });

        res.send('폴더 삭제 성공!')
    } catch (err) {
        logger.error('routes/index.js 폴더 삭제 과정에서 에러');
        next(err);
    }
});
router.get('/', isNotLoggedIn, (req, res) => {
    try {
        // res.send('Hello, Express'); // 테스트용
        res.render('../views/login.ejs', {
            title: 'StudyTight 메인화면',
        });
    } catch (err) {
        logger.error('routes/index.js 에서 에러');
        logger.error(err);
        next(err);
    }
})

router.post('/d-day', isLoggedIn, async(req, res, next) => {
    //console.log('post 요청옴 in index', req.body);
    const { date, content, today } = req.body;

    try {
        // mongoDB에 과목 추가
        const dday = await Dday.create({
            user_id: req.user._id,
            dday_content: content,
            final_date: date,
            start_date: today,
        });
        //console.log(dday);
        res.send('success');

    } catch (err) {
        logger.error('routes/index.js d-day 추가 과정에서 에러');
        next(err);
    }

});

function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    month = ("0" + (month + 1)).slice(-2);
    var today = date.getDate();
    today = ("0" + today).slice(-2);
    // 테스트용
    // var year = "2021";
    // var month = "09";
    // var today = "08"

    return year+"-"+month+"-"+today;
}

function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    // var hours = date.getHours();
    // var minutes = date.getMinutes();
    // var seconds = date.getSeconds();
    // var milliseconds = date.getMilliseconds();

    return new Date(Date.UTC(year, month, today));
}

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
        logger.error('routes/index.js patch(editprofile) 과정에서 에러');
        next(err);
    }
});

router.post('/eidtprofile', isLoggedIn, async(req, res, next) => {
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

        res.send({
            _id: course._id,
            user_id: req.user._id, // 해당 과목의 사용자 obj_id (email 아님! mongodb id값임!)
            course_name: name,
            professor_name: professor,
            schedules: timeList, // 과목 시간 리스트
            createdAt: getCurrentDate(), // 과목 추가 날짜
        });

    } catch (err) {
        logger.error('routes/index.js 프로필 생성 과정에서 에러');
        next(err);
    }

});

// router.get('/searchemail', isLoggedIn, async(req, res, next) => {
//     const { school, school_private, major, major_private, grade, grade_private, timetable_private, age, gender } = req.body;

//     try {
//         // mongoDB에 프로파일 추가
//         const profile = await Profile.create({

//             user_id: req.user._id,
//             school: school,
//             school_private: school_private,
//             major: major,
//             major_private: major_private,
//             grade: grade,
//             grade_private: grade_private,
//             age: age,

//         });

//         res.send({
//             _id: course._id,
//             user_id: req.user._id, // 해당 과목의 사용자 obj_id (email 아님! mongodb id값임!)
//             course_name: name,
//             professor_name: professor,
//             schedules: timeList, // 과목 시간 리스트
//             createdAt: getCurrentDate(), // 과목 추가 날짜
//         });

//     } catch (err) {
//         next(err);
//     }

// });

module.exports = router;