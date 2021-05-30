
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path'); // 현재 프로젝트의 경로
var appDir = path.dirname(require.main.filename);
const Auth = require('../models/auth');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');
const router = express.Router();




// GET /auth 라우터 (auth 왔을때의 root)
router.get('/login', (req, res) => {
    res.render(path.join(__dirname, '../views/login.ejs'));
})

// 비밀번호 찾기 라우터
router.get('/findpw', isNotLoggedIn, async(req, res, next) => {
    try {
        res.render('../views/find_pw.ejs', {success:null});
    } catch(err) {
        return res.status(403).send('Error');
    }
});

// // 비밀번호 찾기 이메일 전송 성공 라우터
// router.get('/findpw/success', isNotLoggedIn, async(req, res, next) => {
//     try {
//         res.render('../views/find_pw_success.ejs');
//     } catch(err) {
//         return res.status(403).send('Error');
//     }
// });

// 이메일 찾기 라우터
// 비밀번호 찾기 라우터
router.get('/findemail', isNotLoggedIn, async(req, res, next) => {
    try {
        res.render('../views/find_email.ejs');
    } catch(err) {
        return res.status(403).send('Error');
    }
});


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


router.post('/findpw', isNotLoggedIn, async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne( { email: email }); // 1. 유저가 존재하면 유저 정보를 가져옴
        if (user) { // 2. 유저가 있다면?
            console.log('가입된 회원');
            const token = crypto.randomBytes(20).toString('hex'); // 3. token 생성(인증코드)
            const data = {
            // 4. 인증코드 테이블에 넣을 데이터 정리
                token : token,
                user_id: user._id,
                ttl: 300, // ttl 값 설정 (5분)
            };
            await Auth.create(data); // 5. 인증 코드 테이블에 데이터 입력
            
            let emailTemplete;
            ejs.renderFile(appDir+'/config/findpwemail.ejs', {token : token}, function (err, data) {
                if(err){console.log(err)}
                emailTemplete = data;
            });
            let mailOptions = ({
                from: 'study Tight',
                to: email,
                subject: 'studyTight 비밀번호 초기화 안내',
                html: emailTemplete,
            });
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS,
                },
            });

            transporter.sendMail(mailOptions, function(emailError, info) {
                if (emailError) {
                    console.log(emailError);
                    console.log('메일 보내기 실패 in /email');
                    next(emailError);
                } else {
                    console.log("Finish sending email : " + info.response);
                    transporter.close();
                    res.render('../views/find_pw.ejs', {success:'ok'});
                    // res.redirect('/auth/findpw/success');
                }
            });

            //return res.json(result);
            //res.send(token); 
        } else {
            res.status(403).send('This account does not exist');
        }

    } catch (e) {
      // try에서 result 결과값이 null일때 catch에서 에러로 잡지 않음 이유는?..
        res.send(e);
        // res.status(403).send('This account does not exist');
    }
});


module.exports = router;
