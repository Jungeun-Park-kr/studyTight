const express = require('express');
const path = require('path'); // 현재 프로젝트의 경로

const app = express();
app.use(express.static(__dirname));
app.use(express.static("public"));
app.set('port', process.env.PORT || 3000); // app.set('port', 포트) : 서버가 실행될 포트

app.get('/', (req, res) => { // app.get('주소', 라우터) : GET 요청이 올때 할 동작
    // res.send('Hello, Express'); // 테스트용
    res.sendFile(path.join(__dirname, '/mainframe.html'));
});

app.listen(app.get('port'), () => { // app.listen('포트', 콜백) : 몇 번 포트에서 서버를 실행할지 지정
    console.log(app.get('port'), '번 포트에서 대기 중');
});