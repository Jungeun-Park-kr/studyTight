const express = require("express");
const router = express.Router();

// router.get('/', (req, res) => res.render('index'));
// router.get('/login', (req, res) => res.render("login", {page:"login"}));
// router.get('/signup', (req, res) => res.render("signup", {page:"signup"}));
// router.get('/signup_agree', (req, res) => res.render("signup_agree", {page:"signup_agree"}));

module.exports = router;
const path = require('path'); // 현재 프로젝트의 경로


const User = require('../models/user');
const mongoose = require('mongoose');

// 메인
router.get('/', (req, res) => { // app.get('주소', 라우터) : GET 요청이 올때 할 동작
    // res.send('Hello, Express'); // 테스트용
    res.render(path.join(__dirname, '../views/mainframe.ejs'));
});


