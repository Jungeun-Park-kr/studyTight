const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const User = require('../models/user');
var appDir = path.dirname(require.main.filename);
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const google = require('googleapis');
const OAuth2 = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';


router.post('/', isNotLoggedIn, async(req, res, next) => {
    const email = req.body.email;
    console.log(req.body);
    console.log('넘어온 이메일:'+req.body.email); 
    

    // 이미 가입된 이메일인지 확인
    try {
        const exUser = await User.findOne( { email: email }); // 이메일 중복 확인
        if (exUser) {
            console.log('이미 가입된 이메일입니다.');
            return res.send('email_error=exist');
            // return res.status(403).send('error 설명 메시지');
            //next(error);
        }
        const emailAry = email.split('@');
        const email_id = emailAry[0];
        const exUserId = await User.findOne( {email_id: email_id}); // id 중복 확인
        if (exUserId) {
            console.log('입력한 이메일의 id부분이 사용 불가합니다.');
            return res.send('email_error=existid');
            //next(error);
        }
        console.log('asdf-1');
        let authNum = Math.random().toString().substr(2,6);
        let emailTemplete;
        console.log('asdf0');

        ejs.renderFile(appDir+'/email/authemail.ejs', {authCode : authNum}, function (err, data) {
            if(err){console.log(err)}
            emailTemplete = data;
        });
        console.log('asdf0 render');

        
        console.log('asdf1');
        
        let mailOptions = ({
            from: 'study Tight <studytight0922@gmail.com>',
            to: email,
            subject: '회원가입을 위한 인증번호를 입력해주세요.',
            html: emailTemplete,
        });

        console.log('asdf2');
        // const oauth2Client = new OAuth2(
        //     process.env.GOOGLE_API_CLIENT_ID,
        //     process.env.GOOGLE_API_CLIENT_SECRET,
        //     OAUTH_PLAYGROUND
        // );
        // console.info(oauth2Client);
        // oauth2Client.setCredentials({
        //     refresh_toekn : process.env.REFRESH_TOKEN,
        // });
        // const accessToken = oauth2Client.getAccessToken();
        // console.log('accesstoken:'+accessToken);
        
        let transporter = nodemailer.createTransport({
            // service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                type : 'OAuth2',
                user: process.env.NODEMAILER_USER,
                //pass: process.env.NODEMAILER_PASS,
                clientId: process.env.GOOGLE_API_CLIENT_ID,
                clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
                refreshToken:process.env.REFRESH_TOKEN,
                accessToken : process.env.ACCESS_TOKEN,
                // accessToken:accessToken,
            },
        });

        transporter.sendMail(mailOptions, function(emailError, info) {
            if (emailError) {
                console.log(emailError);
                console.log('메일 보내기 실패 in /email');
                return(emailError);
            } else {
                console.log("Finish sending email : " + info.response);
                res.send(authNum); // 인증번호
                // res.redirect( path.join(__dirname, '/signup'));
                transporter.close();
            }
        });
    } catch(error) {
        return res.status(403).send('This account does not exist');
        // return res.status(403).send('error 설명 메시지');
    }
});



module.exports=router;