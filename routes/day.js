const express=require('express');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router=express.Router();
const Todo=require('../models/todo_list');
const Course = require('../models/course');
const Day=require('../models/d_day');

const fs=require('fs');

// router.post(){ //d_day 작성할 때

// }
// router.patch(){ //d_day 수정할 때

// }
// router.delete(){ //d_day 삭제할 때

// }