
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');
const router = express.Router();

const path = require('path'); // 현재 프로젝트의 경로



router.get('/agree', (req, res) => {
    //res.send('This is signup page');
    res.render(path.join(__dirname, '../views/signup_agree.ejs'));
});



// // GET /auth/signup 라우터 (signup으로 왔을때의 root)
// router.get('/signup', (req, res) => {
//     res.render(path.join(__dirname, '../views/signup.ejs'));
// });



// POST /auth/signup 라우터 
// 회원가입 form
router.post('/signup', isNotLoggedIn, async (req, res, next) => {
    const {email, name, password} = req.body;
    
     console.log('회원가입 버튼 누름');

    try {
        const exUser = await User.findOne( {where: {email}}); // 이메일 중복 확인
        if (exUser) {
            return res.redirect('/signup?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email : email,
            name : name,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
    // console.log(req.body);
    // User.find({ email:req.body.email })
    //     .exec()
    //     .then(user => {
    //         if (user.length >= 1) {
    //             res.send('<script type="text/javascript">alert("이미 존재하는 이메일입니다."); window.location="/signup"; </script>');
    //         } else {
    //             const user = new User({
    //                 _id: new mongoose.Types.ObjectId(),
    //                 name:req.body.name,
    //                 email: req.body.email,
    //                 password: req.body.password
    //             });
    //             user
    //                 .save()
    //                 .then(result => {
    //                     console.log(result);
    //                     res.redirect("/");
    //                 })
    //                 .catch(err => {
    //                     console.log(err);
    //                 });
    //               }
    //     });
});



// GET /auth/login 라우터 
router.get('/login', isNotLoggedIn,(req, res, next) => {
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
    
    res.render(path.join(__dirname, '../views/login.ejs'));
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
})





module.exports = router;
