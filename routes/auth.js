
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
const Users = require('../models/user');
const router = express.Router();


const Todo=require('../models/todo_list');

const fs=require('fs');

// // GET /auth 라우터 (auth 왔을때의 root) - middlewares.js 에서 로그인 처리해주기 때문에 필요X
// router.get('/login', (req, res) => {
//     res.render('../views/login.ejs', {loginFailed : req.session.loginFailed});
//     console.log('get요청옴');
// })

// POST /auth/login 라우터 
router.post('/login', isNotLoggedIn, (req, res, next) => {
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
            //return res.send(`/loginError=${info.message}`);
            //return res.render('../views/login.ejs', {loginFailed:true});
            req.session.loginFailed = true;
            //return res.render('../views/login.ejs', {loginFailed : req.session.loginFailed});
            return res.redirect('/');
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

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});


router.post('/findpw', isNotLoggedIn, async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await Users.findOne( { email: email }); // 1. 유저가 존재하면 유저 정보를 가져옴
        if (user) { // 2. 유저가 있다면?
            console.log('가입된 회원');
            const token = crypto.randomBytes(20).toString('hex'); // 3. token 생성(인증코드)
            const data = {
            // 4. 인증코드 테이블에 넣을 데이터 정리
                token : token,
                user_id: user._id,
                createdAt : getCurrentDate(),
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

// GET 비밀번호 초기화 페이지
router.get('/resetpw/:id', isNotLoggedIn, async(req, res, next) => {
    try {
        //토큰이 유효할때만 페이지 열어주기
        const token_id = req.params.id
        // 토큰이 최대 5분 유효함
        const auth = await Auth.findOne({ token:token_id, createdAt:{ $gt : new Date(getCurrentDate().getTime()-(1000*60*5)) } }).sort({'createdAt':-1}).populate('user_id'); // ttl 빼기 안됨
        console.log(auth);

        if (auth == null) { //토큰이 없는 경우 (검색 안됨)
            console.log('조건에 만족하는 토큰이 없음 token이 만료됨.')
            return res.status(403).send('Error - 만료된 페이지입니다.');
        }
        else {
            res.render('../views/reset_pw.ejs', {
                token_id : req.params.id
            });
        }
        
    } catch(err) {
        return res.status(403).send('Error');
    }
});

// POST 비밀번호 초기화 하기
router.patch('/resetpw/:id', async(req, res) => {
    try {
        const token_id = req.params.id
        const password = req.body.password;
        const hash = await bcrypt.hash(password, 12);

        // 토큰이 최대 5분 유효함
        const auth = await Auth.findOne({ token:token_id, createdAt:{ $gt : new Date(getCurrentDate().getTime()-(1000*60*5)) } }).sort({'createdAt':-1}).populate('user_id'); // ttl 빼기 안됨
        console.log(auth);

        if (auth == null) { //토큰이 없는 경우 (검색 안됨)
            console.log('조건에 만족하는 토큰이 없음 token이 만료됨.')
            res.send('token?expired');

            // 인증 시간 만료된 쓰레기 토큰들 삭제
            await Auth.deleteMany( { createdAt : { $lt : new Date(getCurrentDate().getTime()-(1000*60*5)) }} );
        } else { // 아직 토큰이 만료되지 않은 경우
            await Users.updateOne({ 
                "_id": auth.user_id._id 
            }, { 
                $set:{ 
                    password : hash
                }
            }, (err, results) => {
                if (err) {
                    console.log('error:'+err);
                    throw err;
                }
                res.send(results);
            });
            //업데이트 확인
            /*console.log('----------------변경후-----------------')
            console.log(userresult);
            const user2 = await Users.findOne( { _id : auth.user_id._id });
            console.log(user2);*/

            // 인증 완료된 토큰은 삭제
            await Auth.deleteOne(auth);

            // 인증 시간 만료된 쓰레기 토큰들도 삭제
            // await Auth.deleteMany( { createdAt : { $lt : new Date(getCurrentDate().getTime()-(1000*60*5)) }} );
            const delres = await Auth.remove( { createdAt : { $lt : new Date(getCurrentDate().getTime()-(1000*60*5)) }} );
            console.log(`${delres.matchedCount} document(s) matched the filter, deleted ${delres.nRemoved} document(s)`);
        }
        
        //입력받은 token 값이 Auth 테이블에 존재하며 아직 유효한지 확인
        // Auth.findOne({ token:req.params.id, createdAt:{ $gt : getCurrentDate()-auth.ttl} }).sort({'createdAt':-1})
        /* Auth.findOne({ token:token_id }).populate('user_id')  //ttl 빼기가 안됨
        .then((Auth) => { // 유저데이터 호출)
            return Users.findOne( { _id : Auth.user_id });
        })
        .then((User) => { // 유저 비밀번호 업데이트 
            const result = Users.updateOne({ _id: User._id }, { $set:{ password : hash } });
            console.log('성공??');
            console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
        })
        .catch((err) => {
            console.error(err);
        }); 
        res.send(userresult); */
        
    } 
    catch(err) {
        return res.status(403).send('Error');
    }
    
});


router.get('/changepw', isLoggedIn, async(req, res, next) => {
    try {
        res.render('../views/change_pw.ejs', {
        });
    } catch(err) {
        return res.status(403).send('Error');
    }
});

router.patch('/changepw', isLoggedIn, async(req, res, next) => {
    try {
        const { cur_password, password }= req.body;
        const hash = await bcrypt.hash(password, 12);

        const result = await bcrypt.compare(cur_password, req.user.password);
        if (result) { // 현재 비밀번호 맞음
            await Users.updateOne({ 
                "_id": req.user._id
            }, { 
                $set:{ 
                    password : hash
                }
            }, (err, results) => {
                if (err) {
                    console.log('error:'+err);
                    throw err;
                }
                res.send(results);
            });
        } else { // 현재 비밀번호 틀림
            return res.send('/changepw?error=notmatch');
        }
        
    } catch(err) {
        return res.status(403).send('Error');
    }
});

function getCurrentDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

module.exports = router;
