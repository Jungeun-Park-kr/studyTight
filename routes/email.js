const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const User = require('../models/user');
var appDir = path.dirname(require.main.filename);


router.post('/', async(req, res) => {
    const email = req.body.email;
    console.log(req.body);
    console.log('넘어온 이메일:'+req.body.email); 
    


    // 이미 가입된 이메일인지 확인
    try {
        const exUser = await User.findOne( { email: email }); // 이메일 중복 확인
        if (exUser) {
            console.log('이미 가입된 이메일입니다.');
            res.send('email_error=exist');
        }

        let authNum = Math.random().toString().substr(2,6);
        let emailTemplete;

        ejs.renderFile(appDir+'/config/authemail.ejs', {authCode : authNum}, function (err, data) {
            if(err){console.log(err)}
            emailTemplete = data;
        });

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            // host: 'smtp.gmail.com',
            // port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        let mailOptions = ({
            from: 'study Tight',
            to: email,
            subject: '회원가입을 위한 인증번호를 입력해주세요.',
            html: emailTemplete,
        });


        transporter.sendMail(mailOptions, function(emailError, info) {
            if (emailError) {
                console.log(emailError);
            }
            console.log("Finish sending email : " + info.response);
            res.send(authNum); // 인증번호
            // res.redirect( path.join(__dirname, '/signup'));
            transporter.close();
            
            
        });

        return authNum;

    } catch(error) {
        return res(error);
    }
});

module.exports=router;



////////////////


// ejs.renderFile(appDir+'/config/authemail.ejs', {authCode : authNum}, function (err, data) {
//     if(err){console.log(err)}
//     emailTemplete = data;
// });

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: true, // true for 587, false for other ports
//     auth: {
//         user: process.env.NODEMAILER_USER,
//         pass: process.env.NODEMAILER_PASS,
//     },
// });    let emailTemplete;
// ejs.renderFile(appDir+'/config/authemail.ejs', {authCode : authNum}, function (err, data) {
//     if(err){console.log(err)}
//     emailTemplete = data;
// });

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: true, // true for 587, false for other ports
//     auth: {
//         user: process.env.NODEMAILER_USER,
//         pass: process.env.NODEMAILER_PASS,
//     },
// });    let emailTemplete;
// ejs.renderFile(appDir+'/config/authemail.ejs', {authCode : authNum}, function (err, data) {
//     if(err){console.log(err)}
//     emailTemplete = data;
// });

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: true, // true for 587, false for other ports
//     auth: {
//         user: process.env.NODEMAILER_USER,
//         pass: process.env.NODEMAILER_PASS,
//     },
// });    let emailTemplete;
// ejs.renderFile(appDir+'/config/authemail.ejs', {authCode : authNum}, function (err, data) {
//     if(err){console.log(err)}
//     emailTemplete = data;
// });

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: true, // true for 587, false for other ports
//     auth: {
//         user: process.env.NODEMAILER_USER,
//         pass: process.env.NODEMAILER_PASS,
//     },
// });