
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');
const router = express.Router();

const path = require('path'); // 현재 프로젝트의 경로


// router.get('/agree', (req, res) => {
//     //res.send('This is signup page');
//     res.render(path.join(__dirname, '../views/signup_agree.ejs'));
// });


// // POST /auth/signup 라우터 
// // 회원가입 form
// router.post('/signup', isNotLoggedIn, async (req, res, next) => {
//     const {email, name, password} = req.body;
    
//     console.log('회원가입 버튼 누름');
//     console.log('email:'+email+', name:'+name+', password:'+password);

//     try {
//         const exUser = await User.findOne( { email: email }); // 이메일 중복 확인
//         if (exUser) {
//             console.log('이미 가입된 회원입니다.');
//             return res.redirect('/signup?error=exist');
//         }
//         const hash = await bcrypt.hash(password, 12);
//         const user = await User.create({
//             email : email,
//             name : name,
//             password: hash,
//         });
//         console.log('추가된 user:'+user);

//         return res.redirect('/login');
//     } catch (error) {
//         console.log('회원가입 에러');
//         console.error(error);
//         return next(error);
//     }
// });



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
