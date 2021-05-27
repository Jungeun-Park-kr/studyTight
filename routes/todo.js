const express=require('express');
// const {Mongoose}=require('mongoose');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router=express.Router();
const Todo=require('../models/todo_list');
const fs=require('fs');

router.post('/',isLoggedIn, async(req,res,next) => {
    var content=req.body.todo_content;
    // console.log(content);
    
    try{
    //몽고db에 저장
    const todo=await Todo.create({
        user_id:req.user._id,
        todo_content:content,
        register_date:getCurrentDate(),
        todo_finished:false
    });

    //로그인 된 유저 : console.log('로그인:'+req.user.email);

    res.render('../views/mainframe.ejs',
        { title : 'study Tight', todolist:todo}
    );
    //res.send(todo);
}catch(err){
    next(err);
}
});

router.patch('/:id',isLoggedIn, async(req,res,next) => {
    try{
    Todo.updateOne({
        user_id:req.user._id
    },{
        $set:{
            todo_finished:true
        }
    });
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