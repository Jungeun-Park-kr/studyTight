const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path'); // 현재 프로젝트의 경로
const PORT = process.env.PORT||3000;
const passport = require('passport');


dotenv.config();
// const pageRouter = require('./routes/page'); // 라우터
const connect = require('./models'); // mongoDB를 위한 index.js, 스키마 정의
const passportConfig = require('./passport');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 3000); // app.set('port', 포트) : 서버가 실행될 포트
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs'); // 뷰엔진 세팅

// router
const indexRouter = require('./routes'); // routes/index (기본 디폴트 라우터)
const userRouter = require('./routes/user'); // user 라우터
const authRouter = require('./routes/auth'); // 로그인 정보 라우터 (로그인 처리, 회원가입 처리, 로그아웃 처리)
const signupRouter = require('./routes/signup'); // 회원가입 라우터
const loginRouter = require('./routes/login'); // 로그인 라우터



connect(); // mongoDB connection start
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));
app.use(express.static('public'));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.use(passport.initialize());
app.use(passport.session());


// mongoDB Connect information (테스트용)
// const uri = process.env.ATLAS_URI;
// const connect = mongoose.connect(uri, {
//     dbName: 'studyTight',
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// });
// const connection = mongoose.connection;
// connection.once("open", () => {
//     console.log("MongoDB database connection success");
// });




// use routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

// 상단에 없는 라우터 요청시 에러 처리
app.use((req, res, next) => {
    res.status(404).send('Not Found (없는 라우터 요청)');
})

app.listen(app.get('port'), () => { // app.listen('포트', 콜백) : 몇 번 포트에서 서버를 실행할지 지정
    console.log(app.get('port'), '번 포트에서 대기 중');
});
