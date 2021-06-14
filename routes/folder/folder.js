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
        const folder = await Folder.find({user_id:res.locals.user._id});
        //const folder_title=await Folder.find({_id:req.params.id}).populate('folder_title');
        const postIt=await PostIt.find({folder_name:folder_title}).populate('postIt');
        const todolist = await Todo.find({user_id: req.user._id}).populate('user_id');
        res.render('../views/folder/folder.ejs', {
            folder_title: folder_title,
            //folder : folder,
            postIt: postIt,
            todolist: todolist

        });
    }
    catch(err){
        next(err);
    }
});
router.post('/add',isLoggedIn, async(req,res,next) => {
    var postItList=new Array();
    
    const folder_name=req.body.folder_name;
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
        postItList.push(postIt.postIt_name);

        //폴더에 정보 추가하기

        await Folder.updateOne({user_id:res.locals.user._id, folder_name:req.body.folder_name},{
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

router.get('/add', isLoggedIn, async(req, res) => {
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
})
module.exports=router;