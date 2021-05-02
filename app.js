const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path'); // 현재 프로젝트의 경로
const PORT = process.env.PORT||3000;

dotenv.config();
// const pageRouter = require('./routes/page'); // 라우터
const connect = require('./schemas'); // mongoDB를 위한 index.js, 스키마 정의


const app = express();
app.set('port', process.env.PORT || 3000); // app.set('port', 포트) : 서버가 실행될 포트
app.set('view engine', 'html'); // 뷰엔진 세팅
connect(); // mongoDB connection start


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));
app.use(express.static("public"));


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



app.get('/', (req, res) => { // app.get('주소', 라우터) : GET 요청이 올때 할 동작
    // res.send('Hello, Express'); // 테스트용
    res.sendFile(path.join(__dirname, '/views/mainframe.html'));
});

app.listen(app.get('port'), () => { // app.listen('포트', 콜백) : 몇 번 포트에서 서버를 실행할지 지정
    console.log(app.get('port'), '번 포트에서 대기 중');
});
