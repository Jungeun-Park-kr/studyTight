const express = require('express');
const { isLoggedIn, isNotLoggedIn} = require('../middlewares');
const Folder = require('../../models/folder');
const PostIt = require('../../models/postit');
const Todo=require('../../models/todo_list');
const router = express.Router();
const url=require('url');
const { urlencoded } = require('body-parser');
//const path=require('path');

//const ObjectId=require('mongodb').ObjectID; 
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
router.use((req, res, next) => {
    res.locals.user=req.user;
    next();
})

router.get('/:id', isLoggedIn, async( req, res, next) => {
        const id_obj=req.params.id;
    try{
        const folder_title = await Folder.find({user_id:res.locals.user._id, _id:id_obj}).select('folder_name');
        const folder=await Folder.find({user_id:res.locals.user._id, _id:id_obj});
        const postIt=await PostIt.find({folder_id:id_obj});
        
        const todolist = await Todo.find({user_id: req.user._id}).populate('user_id');
        res.render('../views/folder/folder.ejs', {
            folder_title: folder_title[0],
            folder:folder,
            folder_id:id_obj,
            //folder : folder,
            //postIt: postIt,
            postIt: postIt,
            todolist: todolist

        });
    }
    catch(err){
        next(err);
    }
});
router.post('/:id/add',isLoggedIn, async(req,res,next) => {
    var postItList=new Array();
    
    const folder_id=req.body.folder_id;
    const postIt_name=req.body.postIt_name;
    const postIt_content=req.body.postIt_content;
    const postIt_type=req.body.postIt_type;
    const postIt_star=req.body.postIt_star;
    const postIt_color=req.body.postIt_color;

    try{ 
        const postIt=await PostIt.create({
            postIt_name:postIt_name,
            postIt_type:postIt_type,
            postIt_content:postIt_content,
            postIt_star:postIt_star,
            postIt_color:postIt_color,
            folder_id:folder_id

        }); //포스트잇 만들기
        postItList.push(postIt._id);

        //폴더에 정보 추가하기
        //console.log("folder내에 배열에 접근 전");
        await Folder.updateOne({user_id:res.locals.user._id, _id:folder_id},{
            $push:{
                postIt:postItList
            }
        });

        //console.log("folder내에 배열에 접근 완료");

        res.send({
            new_post_id:postIt._id,
            postIt_color:postIt.postIt_color,
            postIt_star:postIt.postIt_star,
            postIt_name:postIt.postIt_name,
            postIt_content:postIt.postIt_content,
            postIt_type:postIt.postIt_type});

    }catch(err){
        next(err);
    }
});
router.post('/:id/todo',isLoggedIn, async(req,res,next) => {
    var content=req.body.todo_content;
   // const timetable = await Course.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});
    //const folder = await Folder.find({user_id:res.locals.user._id}).populate('user_id');
    
    //console.log(JSON.stringify(content)); //추가된 todo값
    
    try{
    //몽고db에 저장
    const todo=await Todo.create({
        user_id:req.user._id,
        todo_content: content,
        register_date:getCurrentDate(),
        todo_finished:false
    });

    res.send({
        _id:todo._id,
        user_id: req.user._id,
        todo_content: todo.todo_content,
        todo_finished: todo.todo_finished
    });
    // res.render('../views/mainframe.ejs',
    //     { title : 'study Tight', todolist:todo, timetable:timetable, folder: folder}
    // );

}catch(err){
    next(err);
}
});

router.patch('/:id',isLoggedIn, async(req,res,next) => { //update할 데이터의 구분자: id
    //const timetable = await Course.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});
    //const folder = await Folder.find({user_id:res.locals.user._id}).populate('user_id');
    //const dDay = await Dday.find({user_id: res.locals.user._id}).sort({'final_date':1});
    const id_obj=req.params.id;
    const folder_title = await Folder.find({user_id:res.locals.user._id, _id:id_obj}).select('folder_name');
    const folder=await Folder.find({user_id:res.locals.user._id, _id:id_obj});

    
    const postIt=await PostIt.find({folder_id:id_obj});
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
    res.render('../views/folder/folder.ejs',
        { title : 'study Tight', folder_title:folder_title[0], todolist:todo, folder:folder}
    );
    //res.redirect('/');

    }catch(err){
        next(err);
    } });

//postIt star바꾸기
router.patch('/:id/star',isLoggedIn, async(req,res,next) => { //update할 데이터의 구분자: id
    const id_obj=req.params.id;
    const id_post=req.body.postIt_id;
    const folder_title = await Folder.find({user_id:res.locals.user._id, _id:id_obj}).select('folder_name');
    
    const todo = await Todo.find({user_id: req.user._id}).populate('user_id');
        
        try{
        const postIt=await PostIt.updateOne({
            //user_id:req.user._id, //필터링 하는 것
            
            _id:req.body.postIt_id

        },{
            $set:{
                postIt_star:req.body.postIt_star
            }
        });
        //console.log(req.body.todo_content+"의 값: "+req.body.todo_finished); //undefined: undefined라고 뜬다..
        //console.log("try문이 끝나고 업데이트 되었을 것!"+req.body.postIt_id+", "+req.body.postIt_star);
        res.render('../views/folder/folder.ejs',
            { title : 'study Tight', postIt:postIt, folder_title:folder_title[0], todolist:todo, folder_id:id_obj}
        );
        //res.redirect('/');
    
        }catch(err){
            next(err);
        } });

router.delete('/:id',isLoggedIn, async(req,res,next) => { //할 일 목록에서 삭제 버튼을 누른 경우

   // const timetable = await Course.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});
    const folder = await Folder.find({user_id:res.locals.user._id}).populate('user_id');
    //const dDay = await Dday.find({user_id: res.locals.user._id}).sort({'final_date':1});
    try {
        const delete_todoContent = req.body.todo_content;
        await Todo.deleteOne({user_id: res.locals.user._id, todo_content:delete_todoContent});
        //console.log('삭제된 것의 id는'+ delete_todoId);
        const todo = await Todo.find({user_id: req.user._id}).populate('user_id');
        //console.log('남은 것은 이제 '+todo.todo_content);
        res.render('../views/folder/folder.ejs',
        { title : 'study Tight', todolist:todo, folder: folder});
    }catch(err){
        next(err);
    }
});

//폴더 추가
router.get('/:id/add', isLoggedIn, async(req, res) => {
    try{    
        const _url=req.url;
        // const title=_url.split('=');
        // const t_length=title.length;
        // const folder_title=title[t_length-1];
        //console.log(_url);
        //const folder = await Folder.find({user_id:res.locals.user._id}).find({folder_name:_folder});  
        //const postIt= await PostIt.find({user_id:res.locals.user._id},{folder_name:_folder}).populate('folder');
        const folder = await Folder.find({user_id:res.locals.user._id});
        const postIt=await PostIt.find({folder_name:title}).populate('postIts');
        const todolist = await Todo.find({user_id: req.user._id}).populate('user_id');
        res.render('../views/folder/folder.ejs', {
            folder_title: _url,
            //folder : folder,
            postIt: postIt,
            todolist: todolist

        });
    }catch(err){
        console.log('routes/folder.js에서 에러');
        console.error(err);
        next(err);
    }
});

function getCurrentDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    
    return new Date(Date.UTC(year,month, today));
}

module.exports=router;