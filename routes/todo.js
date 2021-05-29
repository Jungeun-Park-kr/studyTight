const express=require('express');
// const {Mongoose}=require('mongoose');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router=express.Router();
const Todo=require('../models/todo_list');
const Course = require('../models/course');
const fs=require('fs');

router.post('/',isLoggedIn, async(req,res,next) => {
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

    //로그인 된 유저 : console.log('로그인:'+req.user.email);
    // console.log(todo.length);
    res.render('../views/mainframe.ejs',
        { title : 'study Tight', todolist:todo, timetable:timetable }
    );
    
    //res.send(todo);
}catch(err){
    next(err);
}
});

router.post('/todo',isLoggedIn, async(req,res,next) => {
    var content=req.body.todo_content;
    //console.log(JSON.stringify(content));
    const timetable = await Course.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});

    try{
    //몽고db에 저장
    const todo=await Todo.create({
        user_id:req.user._id,
        todo_content: content,
        register_date:getCurrentDate(),
        todo_finished:false
    });

    //로그인 된 유저 : console.log('로그인:'+req.user.email);
    // console.log(todo.length);
    res.render('../views/mainframe.ejs',
        { title : 'study Tight', todolist:todo, timetable:timetable}
    );
    
    // res.send(todo);
}catch(err){
    next(err);
}
});

router.patch('/:id',isLoggedIn, async(req,res,next) => {
    try{
    const todo=await Todo.updateOne({
        user_id:req.params.user._id, //필터링 하는 것
        todo_content:req.body.todo_content //내용에 따라서도 달라야하니까
    },{
        $set:{
            todo_finished:true
        }
    });

    res.render('../views/mainframe.ejs',
        { title : 'study Tight', todolist:todo, timetable:timetable}
    );
    //res.redirect('/');

    }catch(err){
        next(arr);
    } });
    // try{ //이거는 todo_finished값이 바뀌었으니까
    //     if(req.user._id){
    //     //id가 이미 존재해야 하니까
    //     const update_todo=await Todo.

    //     }
    // }catch(err){
    //     next(arr);
    // }

module.exports=router;

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
//data가져오기 - 