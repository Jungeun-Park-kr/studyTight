
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');
const router = express.Router();

const path = require('path'); // 현재 프로젝트의 경로


// GET /auth 라우터 (auth 왔을때의 root)
router.get('/login', (req, res) => {
    res.render(path.join(__dirname, '../views/login.ejs'));
})



// POST /auth/login 라우터 
router.post('/login', isNotLoggedIn,(req, res, next) => {
     // user : 인증 성공 시 유저 정보
     // info : 인증 오류에 대한 메시지
     // 인증 성공시 req.login으로 세션에 유저 정보 저장
    passport.authenticate('local', (authError, user, info) => {
        if (authError) { // 인증과정 중 에러
            console.log('routes/auth/login 인증과정 중 에러')
            console.error(authError);
            return next(authError);
        }
        if (!user) { // user:인증 성공 시 유저 정보
            console.log('routes/auth/login  사용자 인증 실패');
            return res.redirect(`/loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.log('routes/auth/login , 로그인 에러 ');
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    }) (req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, net) 붙임
});

router.get('/logout', isLoggedIn, (req, res) => {
    console.log('로그아웃 버튼');
    req.logout();
    req.session.destroy();
    res.redirect('/');
})


module.exports = router;
