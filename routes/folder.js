const express = require('express');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const Folder = require('../models/folder');
const PostIt = require('../models/postit');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user=req.user;
    next();
})

router.get('/', isLoggedIn, async( req, res, next) => {
    try{
        const folder = await Folder.find({user_id:res.locals.user._id});  
        const postIt= await PostIt.find({user_id:res.locals.user._id}).populate('postIts');
        const todolist = await Todo.find({user_id: req.user._id}).populate('user_id');
        res.render('../views/folder/folder.ejs', {
            title: '폴더 내부!',
            
            folder : folder,
            postIt: postIt,
            todolist: todolist

        });
    }
    catch(err){
        next(err);
    }
})

module.exports=router;