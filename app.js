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
const logger = require('./logger');
const helmet = require('helmet');
const csp = require('helmet-csp');
const hpp = require('hpp');
const RedisStore = require('connect-redis')(session);
const fs = require('fs');
const HTTPS = require('https');
const HTTP = require('http');
const redis = require("redis");


dotenv.config();
// const pageRouter = require('./routes/page'); // 라우터
const connect = require('./models'); // mongoDB를 위한 index.js, 스키마 정의
const passportConfig = require('./passport');

const app = express();
app.use(express.static('uploads'));
passportConfig();
app.set('port', process.env.PORT || 3000); // app.set('port', 포트) : 서버가 실행될 포트

if (process.env.NODE_ENV === 'production') { // 배포모드로 실행 (> npm start)
    // app.use(morgan('combined'));
    // app.use(helmet());
    // app.use(
    //     csp({
    //         directives: {
    //         defaultSrc: ["'self'"],
    //         styleSrc: ["'self'"],
    //         scriptSrc: ["'self'"],
    //         },
    //     })
    // );
    // app.use(hpp());
} else { // 개발 모드로 실행 (> npm run dev)
    app.use(morgan('dev'));
}

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // 뷰엔진 세팅


app.use(cookieParser(process.env.COOKIE_SECRET));

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    logError: true
});



const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
    store: new RedisStore({ client })
};

if (process.env.NODE_ENV === 'production') {
    sessionOption.proxy = true;
    //sessionOption.cookie.secret=true;
}

app.use(session(sessionOption));

// router
const indexRouter = require('./routes'); // routes/index (기본 디폴트 라우터)
const authRouter = require('./routes/auth'); // 로그인 정보 라우터 (로그인 처리, 회원가입 처리, 로그아웃 처리)
const signupRouter = require('./routes/signup'); // 회원가입 라우터
const emailRouter = require('./routes/email'); // 이메일 인증 라우터
const guestbookRouter = require('./routes/guestbook/guestbook'); //방명록 라우터
const timetableRouter = require('./routes/timetable/timetable'); // 시간표 라우터
const folderRouter = require('./routes/folder/folder');
const { http } = require('./logger');

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

}));

app.use(passport.initialize());
app.use(passport.session());


// use routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/signup', signupRouter);
app.use('/email', emailRouter);
app.use('/timetable', timetableRouter);
app.use('/guestbook', guestbookRouter);
app.use('/folder', folderRouter);
// app.use('/todo',todoRouter);


// 상단에 없는 라우터 요청시 에러 처리
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
});


if (process.env.NODE_ENV === 'production') { // 배포 모드
    const option = { // SSL 인증서
        ca: fs.readFileSync('/etc/letsencrypt/live/www.studytight.site/chain.pem'),
        key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/www.studytight.site/privkey.pem'), 'utf8').toString(),
        cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/www.studytight.site/fullchain.pem'), 'utf8').toString(),
    };
    HTTP.createServer(app).listen(80, () => { // app.listen('포트', 콜백) : 몇 번 포트에서 서버를 실행할지 지정
        console.log('HTTP Server running on port 80');
    });

    HTTPS.createServer(option, app).listen(443, () => {
        console.log('HTTPS Server running on port 443');
    });
} else { // 개발 모드
    app.listen(app.get('port'), () => { // app.listen('포트', 콜백) : 몇 번 포트에서 서버를 실행할지 지정
        console.log(app.get('port'), '번 포트에서 대기 중');
    });
}