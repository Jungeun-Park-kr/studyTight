const express = require('express');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const Folder = require('../models/folder');
const PostIt = require('../models/postit');
const Todo=require('../models/todo_list');
const router = express.Router();
const url=require('url');

router.use((req, res, next) => {
    res.locals.user=req.user;
    next();
})

router.get('/', isLoggedIn, async( req, res, next) => {
    try{
        const _url=req.url;
        const title=_url.split('=');
        const t_length=title.length;
        const folder_title=title[t_length-1];
        //console.log(_url);
        //const folder = await Folder.find({user_id:res.locals.user._id}).find({folder_name:_folder});  
        //const postIt= await PostIt.find({user_id:res.locals.user._id},{folder_name:_folder}).populate('folder');
        const folder = await Folder.find({user_id:res.locals.user._id});
        const postIt=await PostIt.find({folder_name:title}).populate('postIts');
        const todolist = await Todo.find({user_id: req.user._id}).populate('user_id');
        res.render('../views/folder/folder.ejs', {
            title: folder_title,
            
            //folder : folder,
            postIt: postIt,
            todolist: todolist

        });
    }
    catch(err){
        next(err);
    }
})

module.exports=router;