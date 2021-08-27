const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const User = require('../models/user');
var appDir = path.dirname(require.main.filename);
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const google = require('googleapis');
const logger = require('../logger');
const OAuth2 = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';


router.post('/', isNotLoggedIn, async(req, res, next) => {
    const email = req.body.email;
    
    // 이미 가입된 이메일인지 확인
    try {
        const exUser = await User.findOne( { email: email }); // 이메일 중복 확인
        if (exUser) {
            logger.info('이미 가입된 이메일입니다.');
            return res.send('email_error=exist');
        }
        const emailAry = email.split('@');
        const email_id = emailAry[0];
        const exUserId = await User.findOne( {email_id: email_id}); // id 중복 확인
        if (exUserId) {
            logger.info('입력한 이메일의 id부분이 사용 불가합니다.');
            return res.send('email_error=existid');
        }

        let authNum = Math.random().toString().substr(2,6);
        let emailTemplete;

        ejs.renderFile(appDir+'/email/authemail.ejs', {authCode : authNum}, function (err, data) {
            if(err){logger.info(err)}
            emailTemplete = data;
        });
        
        let mailOptions = ({
            from: 'study Tight <studytight0922@gmail.com>',
            to: email,
            subject: '회원가입을 위한 인증번호를 입력해주세요.',
            html: emailTemplete,
        });
        
        let transporter = nodemailer.createTransport({
            // service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.NODEMAILER_USER,
                pass : process.env.NODEMAILER_PASS,
            },
        });

        transporter.sendMail(mailOptions, function(emailError, info) {
            if (emailError) {
                logger.info(emailError);
                logger.info('메일 보내기 실패 in /email');
                return(emailError);
            } else {
                logger.info("Finish sending email : " + info.response);
                res.send(authNum); // 인증번호
                transporter.close();
            }
        });
    } catch(error) {
        logger.error(error);
        return res.status(403).send('This account does not exist');
    }
});

module.exports=router;