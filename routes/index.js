const express = require("express");
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router = express.Router();
const Todo=require('../models/todo_list');
const Course = require('../models/course');
//const Folder=require('../models/folder');

var objectId=require('mongodb').ObjectID; 
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
        //const folder = await Folder.find({user_id:res.user._id}).populate('user_id');
        const timetable = await Course.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});
        // todo_finished가 true인 것 중에서 오늘 날짜와 register_date를 비교해서 다르다면  삭제하고 삭제 된 todolist를 rendering하기
        const todolist = await Todo.find({user_id: req.user._id}).populate('user_id');
        //console.info(todolist);
        // res.send('Hello, Express'); // 테스트용
        res.render('../views/mainframe.ejs', {
            title: 'StudyTight 메인화면',
            todolist : todolist,
            timetable : timetable,
            //folder : folder
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


router.post('/todo',isLoggedIn, async(req,res,next) => {
    var content=req.body.todo_content;
    const timetable = await Course.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});

    //console.log(JSON.stringify(content)); //추가된 todo값
    
    try{
    //몽고db에 저장
    const todo=await Todo.create({
        user_id:req.user._id,
        todo_content: content,
        register_date:getCurrentDate(),
        todo_finished:false
    });

    res.render('../views/mainframe.ejs',
        { title : 'study Tight', todolist:todo, timetable:timetable}
    );

    //로그인 된 유저 : console.log('로그인:'+req.user.email);
    // console.log(todo.length);
    // res.redirect('/')
    
    //res.send(todo);
}catch(err){
    next(err);
}
});

router.patch('/',isLoggedIn, async(req,res,next) => { //update할 데이터의 구분자: id
    const timetable = await Course.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});
    try{
    const todo=await Todo.updateOne({
        user_id:req.user._id, //필터링 하는 것
        todo_content:req.body.todo_content //내용에 따라서도 달라야하니까
    },{
        $set:{
            todo_finished:req.body.todo_finished
        }
    });
    //console.log(req.body.todo_content+"의 값: "+req.body.todo_finished); //undefined: undefined라고 뜬다..
    //console.log(todo_finished);
    res.render('../views/mainframe.ejs',
        { title : 'study Tight', todolist:todo, timetable:timetable}
    );
    //res.redirect('/');

    }catch(err){
        next(err);
    } });

router.delete('/',isLoggedIn, async(req,res,next) => { //할 일 목록에서 삭제 버튼을 누른 경우

    const timetable = await Course.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});
    
    try {
        const delete_todoId = req.body.todo_id;
        await Todo.deleteOne({user_id: res.locals.user._id, _id:delete_todoId});
        //console.log('삭제된 것의 id는'+ delete_todoId);
        const todo = await Todo.find({user_id: req.user._id}).populate('user_id');
        //console.log('남은 것은 이제 '+todo.todo_content);
        res.render('../views/mainframe.ejs',
        { title : 'study Tight', todolist:todo, timetable:timetable});
    }catch(err){
        next(err);
    }
})
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

function getCurrentDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

module.exports = router;