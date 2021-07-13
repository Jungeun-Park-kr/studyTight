const express = require('express');
const { isLoggedIn, isNotLoggedIn} = require('../middlewares');
const Folder = require('../../models/folder');
const PostIt = require('../../models/postit');
const Todo=require('../../models/todo_list');
const router = express.Router();
const url=require('url');
const { urlencoded } = require('body-parser');
//const path=require('path');

router.use((req, res, next) => {
    res.locals.user=req.user;
    next();
})

router.get('/:id', isLoggedIn, async( req, res, next) => {
    
    try{
        const _url=req.url;
        //const paramDecoded=decodedURIComponent(_url);
        
        const title=_url.split('/');
        const t_length=title.length;
        const folder_title=title[t_length-1];
        //console.log(_url);
        //const folder = await Folder.find({user_id:res.locals.user._id}).find({folder_name:_folder});  
        //const postIt= await PostIt.find({user_id:res.locals.user._id},{folder_name:_folder}).populate('folder');
        const folder = await Folder.find({user_id:res.locals.user._id, _id:folder_title}).populate('folder_name');
        console.log(folder);
        //const folder_title=await Folder.find({_id:req.params.id}).populate('folder_title');
        //const postIt=await PostIt.find({folder_name:folder_title}).populate('postIt');
        
        //await Todo.deleteMany({user_id:res.locals.user._id, todo_finished:true, register_date:{$ne:getCurrentDate()}})
        //하루가 지나는 것을 어제와 오늘의 날짜가 다르다고 설정함.
        //await Todo.updateMany({user_id:res.locals.user._id, register_date:getCurrentDate()})
        const todolist = await Todo.find({user_id: req.user._id}).populate('user_id');
        res.render('../views/folder/folder.ejs', {
            folder_title: folder,
            //folder : folder,
            //postIt: postIt,
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
            postIt_color:postIt_color

        }); //포스트잇 만들기
        postItList.push(postIt._id);

        //폴더에 정보 추가하기

        await Folder.updateOne({user_id:res.locals.user._id, _id:folder_id},{
            $set:{
                postIt:postItList
            }
        });

        res.send({
            color:postIt.postIt_color,
            star:postIt.postIt_star,
            name:postIt.postIt_name,
            content:postIt.postIt_content,
            type:postIt.postIt_type});
    }catch(err){
        next(err);
    }
});
router.post('/todo',isLoggedIn, async(req,res,next) => {
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
    const folder = await Folder.find({user_id:res.locals.user._id}).populate('user_id');
    //const dDay = await Dday.find({user_id: res.locals.user._id}).sort({'final_date':1});
    
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
        { title : 'study Tight', todolist:todo, folder:folder}
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