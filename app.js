const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path'); // 현재 프로젝트의 경로
const PORT = process.env.PORT || 3000;
const passport = require('passport');
const store = require('store');
const logger=require('./logger');
const helmet=require('helmet');
const hpp=require('hpp');
const RedisStore=require('connect-redis')(session);

dotenv.config();
// const pageRouter = require('./routes/page'); // 라우터
const connect = require('./models'); // mongoDB를 위한 index.js, 스키마 정의
const passportConfig = require('./passport');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 3000); // app.set('port', 포트) : 서버가 실행될 포트

if(process.env.NODE_ENV ==='production'){
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
}else{
    app.use(morgan('dev'));
}

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // 뷰엔진 세팅

app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption={
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie: {
        httpOnly:true,
        secure: false
    },
};

if(process.env.NODE_ENV ==='production'){
    sessionOption.proxy=true;
    //sessionOption.cookie.secret=true;
}

app.use(session(sessionOption));

// router
const indexRouter = require('./routes'); // routes/index (기본 디폴트 라우터)
const userRouter = require('./routes/user'); // user 라우터
const authRouter = require('./routes/auth'); // 로그인 정보 라우터 (로그인 처리, 회원가입 처리, 로그아웃 처리)
const signupRouter = require('./routes/signup'); // 회원가입 라우터
const emailRouter = require('./routes/email'); // 이메일 인증 라우터
const guestbookRouter = require('./routes/guestbook/guestbook'); //방명록 라우터
const timetableRouter = require('./routes/timetable/timetable'); // 시간표 라우터
const todoRouter = require('./routes/todo');
const folderRouter = require('./routes/folder/folder');
const DdayRouter = require('./routes/d-day'); // D-day 라우터

connect(); // mongoDB connection start
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));
app.use(express.static('public'));

app.use(session({
    resave: false, //세션 항상 저장 여부
    saveUninitialized: false, //초기화되지 않은채 스토어에 저장되는 세션
    secret: process.env.COOKIE_SECRET, //세션 암호화
    cookie: {
        httpOnly: true,
        secure: false,
    },
    store: new RedisStore({
        host:process.env.REDIS_HOST,
        port:process.env.REDIS_PORT,
        pass:process.env.REDIS_PASSWORD,
        logErrors:true,
    }),
}));

app.use(passport.initialize());
app.use(passport.session());


// use routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/signup', signupRouter);
app.use('/email', emailRouter);
app.use('/timetable', timetableRouter);
app.use('/guestbook', guestbookRouter);
app.use('/folder', folderRouter);
app.use('/d-day', DdayRouter);
// app.use('/todo',todoRouter);


// 상단에 없는 라우터 요청시 에러 처리
app.use((req, res, next) => {
    const err=new Error('Not Found');
    err.status=404;
    logger.info('hello');
    logger.error(err.message);
    //console.info(req);
    //res.status(404).send(req + ' Not Found (없는 라우터 요청)');
    //res.status(404).send( ' Not Found');

})

app.listen(app.get('port'), () => { // app.listen('포트', 콜백) : 몇 번 포트에서 서버를 실행할지 지정
    console.log(app.get('port'), '번 포트에서 대기 중');
});