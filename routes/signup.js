const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');

const path = require('path'); // 현재 프로젝트의 경로

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

// GET /signup 라우터 (signup으로 왔을때의 root)
router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../views/signup.ejs'));
});



// POST /signup 라우터 
// 회원가입 form
router.post('/', isNotLoggedIn, async (req, res, next) => {
    // 이전 동의 화면에서 체크한 프로모션 수신 동의 여부 확인
    const promotion = localStorage.getItem('promotion') == 'true' ? true : false ;
    localStorage.removeItem('promotion');

    const {email, name, password} = req.body;
    
    console.log('회원가입 버튼 누름');
    console.log('email:'+email+', name:'+name+', password:'+password);

    try {
        const exUser = await User.findOne( { email: email }); // 이메일 중복 확인
        if (exUser) {
            console.log('이미 가입된 회원입니다.');
            return res.redirect('/signup?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        
        //프로필 이미지
        
        const user = await User.create({
            email : email,
            name : name,
            password: hash,
            promotion : promotion,
        });
        console.log('추가된 user:'+ user);

        return res.redirect('/login');
    } catch (error) {
        console.log('회원가입 에러');
        console.error(error);
        return next(error);
    }
    
});

module.exports = router;
