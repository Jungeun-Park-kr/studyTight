const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);


router.post('/', async(req, res) => {
    console.log('메일 전송 누름 appDir:'+appDir);

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

    let mailOptions = await transporter.sendMail({
        from: `study Tight`,
        to: req.body.email,
        subject: '회원가입을 위한 인증번호를 입력해주세요.',
        html: emailTemplete,
    });


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        console.log("Finish sending email : " + info.response);
        // res.send(authNum); // 인증번호
        transporter.close()
    });
});

module.exports=router;