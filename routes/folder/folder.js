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
        const folder_color=await Folder.find({user_id:res.locals.user._id, _id:id_obj}).select('folder_color');
        //console.log(folder_color);
        try{
        const folder_title = await Folder.find({user_id:res.locals.user._id, _id:id_obj}).select('folder_name');
        const folder=await Folder.find({user_id:res.locals.user._id, _id:id_obj});
        const postIt=await PostIt.find({folder_id:id_obj}).sort({'postIt_star':-1});
        
        const todolist = await Todo.find({user_id: req.user._id}).populate('user_id');
        res.render('../views/folder/folder.ejs', {
            folder_color:folder_color[0],
            folder_title: folder_title[0],
            folder:folder,
            folder_id:id_obj,
            postIt: postIt,
            todolist: todolist

        });
    }
    catch(err){
        console.error('routes/folder/folder.js 에서 에러');
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

        
        await Folder.updateOne({user_id:res.locals.user._id, _id:folder_id},{
            $push:{
                postIt:postItList
            }
        });

        
        res.send(postIt);
            

    }catch(err){
        console.error('routes/folder/folder.js 에서 포스트잇 추가 과정에러');
        next(err);
    }
});
//postIt 내용바꾸기
router.patch('/:id/revise',isLoggedIn, async(req,res,next) => { //update할 데이터의 구분자: id
    const id_obj=req.params.id;
    
        try{
        const postIt=await PostIt.updateOne({
            
            
            _id:req.body.postIt_id

        },{
            $set:{
                postIt_name:req.body.revise_postIt_name,
                postIt_content:req.body.revise_postIt_content,
                postIt_color:req.body.revise_postIt_color
            }
        });
        
        res.send(postIt);
        
    
        }catch(err){
            console.error('routes/folder/folder.js 포스트잇 수정과정에서 에러');
            next(err);
        } });

router.post('/:id/todo',isLoggedIn, async(req,res,next) => {
    var content=req.body.todo_content;

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
    console.error('routes/folder/folder.js 할일목록 추가과정에서 에러');
    next(err);
}
});

router.patch('/:id',isLoggedIn, async(req,res,next) => { //update할 데이터의 구분자: id
    
    // const id_obj=req.params.id;
    // const folder_title = await Folder.find({user_id:res.locals.user._id, _id:id_obj}).select('folder_name');
    // const folder=await Folder.find({user_id:res.locals.user._id, _id:id_obj});

    
    // const postIt=await PostIt.find({folder_id:id_obj});
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
    // res.render('../views/folder/folder.ejs',
    //     { title : 'study Tight', folder_title:folder_title[0], todolist:todo, folder:folder}
    // );
    res.send(todo);
    //res.redirect('/');

    }catch(err){
        next(err);
    } });

//postIt star바꾸기
router.patch('/:id/star',isLoggedIn, async(req,res,next) => { //update할 데이터의 구분자: id
    // const id_obj=req.params.id;
    // const id_post=req.body.postIt_id;
    // const folder_title = await Folder.find({user_id:res.locals.user._id, _id:id_obj}).select('folder_name');
    
    // const todo = await Todo.find({user_id: req.user._id}).populate('user_id');
        
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
        // res.render('../views/folder/folder.ejs',
        //     { title : 'study Tight', postIt:postIt, folder_title:folder_title[0], todolist:todo, folder_id:id_obj}
        // );
        res.send(postIt);
        //res.redirect('/');
    
        }catch(err){
            next(err);
        } });

router.delete('/:id',isLoggedIn, async(req,res,next) => { //할 일 목록에서 삭제 버튼을 누른 경우

   // const timetable = await Course.find({user_id: res.locals.user._id}).populate('user_id').populate('schedules').sort({'createdAt':-1});
    //const folder = await Folder.find({user_id:res.locals.user._id}).populate('user_id');
    //const dDay = await Dday.find({user_id: res.locals.user._id}).sort({'final_date':1});
    try {
        const delete_todoId = req.body.todo_id;
        await Todo.deleteOne({user_id: res.locals.user._id, _id:delete_todoId});
        //console.log('삭제된 것의 id는'+ delete_todoId);
        const todo = await Todo.find({user_id: req.user._id}).populate('user_id');
        //console.log('남은 것은 이제 '+todo.todo_content);
        // res.render('../views/folder/folder.ejs',
        // { title : 'study Tight', todolist:todo, folder: folder});
        res.send(todo);
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
        // res.render('../views/folder/folder.ejs', {
        //     folder_title: _url,
        //     //folder : folder,
        //     postIt: postIt,
        //     todolist: todolist

        // });
        
    }catch(err){
        console.log('routes/folder.js에서 에러');
        console.error(err);
        next(err);
    }
});
router.delete('/:id/post',isLoggedIn, async(req,res,next) => { //할 일 목록에서 삭제 버튼을 누른 경우

    try {
        const delete_post_id=req.body.post_id;
        const folder_id=req.body.folder_id;
        const post_index=req.body.index;
        //console.log(delete_post_id, folder_id, post_index);
    
        const folder= await Folder.updateOne({
            
            _id:folder_id
            },{
                $pull: {
                    postIt: {
                        
                            $in:delete_post_id
                        
                    }
                }
            }
            
            );


        await PostIt.deleteOne({ _id:delete_post_id});
    
        //console.log("삭제완료!");
        
        
    }catch(err){
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