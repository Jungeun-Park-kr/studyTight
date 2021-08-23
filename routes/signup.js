const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Profile = require('../models/profile');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');

const path = require('path'); // 현재 프로젝트의 경로

var promotion; // 프로모션 수신 동의 여부

try {
    fs.readdirSync('uploads');
} catch(error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext= path.extname('/media/user.png');
            cb(null, path.basename(file.originalname, ex) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5*1024*2024}, //업로드 제한
});

router.get('/agree', (req, res) => {
    //res.send('This is signup page');
    res.render(path.join(__dirname, '../views/signup_agree.ejs'));
});

router.post('/agree', isNotLoggedIn, async (req, res, next) => {
    try {
        promotion = req.body.promotion;
        console.log('promotion:'+promotion);
        res.send('success');
    } catch (error) {
        return next(error);
    }
    
});


// GET /signup 라우터 (signup으로 왔을때의 root)
router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../views/signup.ejs'));
});




// POST /signup 라우터 
// 회원가입 form
router.post('/', isNotLoggedIn, async (req, res, next) => {
    const {email, name, password, birth} = req.body;
    
    // console.log('회원가입 버튼 누름');
    // console.log('email:'+email+', name:'+name+', password:'+password, 'promotion:', promotion);
    const emailAry = email.split('@');
    const email_id = emailAry[0];
    try {
        const exUser = await User.findOne( { email: email }); // 이메일 중복 확인
        if (exUser) {
            // console.log('이미 가입된 회원입니다.');
            return res.redirect('/signup?error=exist');
        }
        const exUserId = await User.findOne( {email_id: email_id}); // id 중복 확인
        if (exUserId) {
            // console.log('입력한 이메일의 id부분이 사용 불가합니다.');
            return res.redirect('/signup?error=existid');
        }
        const hash = await bcrypt.hash(password, 12);
        
        //프로필 이미지
        
        const user = await User.create({
            email : email,
            email_id : email_id,
            name : name,
            password: hash,
            birth : birth,
            promotion : promotion,
        });

        const profile = await Profile.create({
            user_id : user._id,
            school : '',
            school_private : false,
            major : '',
            major_private : false,
            grade : 0,
            grade_private : false,
            age_private : false,
            timetable_private : false
        });
        // console.log('추가된 user:'+ user);
        res.send('success');
        // return res.redirect('/login');
    } catch (error) {
        console.log('회원가입 에러');
        console.error(error);
        return next(error);
    }
    
});

module.exports = router;
