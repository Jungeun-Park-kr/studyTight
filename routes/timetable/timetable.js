
const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn} = require('../middlewares');
const User = require('../../models/user');
const Timetable = require('../../models/timetable');
const CourseSchedule = require('../../models/course_schedule');
const router = express.Router();

const path = require('path'); // 현재 프로젝트의 경로


var timeList = new Array();
var btnid;


router.get('/main', isLoggedIn, async (req, res, next) => {
    console.log('시간표 메인');
    try {
        res.render(path.join(__dirname, '../../views/timetable/timetable_main.ejs' ), {
            title: '내 시간표',
        });
    }
    catch (err) {
        console.error('/views/timetable/timetable.js 에서 에러');
        console.error(err);
        next(err);
    }
});

router.get('/edit', isLoggedIn, async (req, res, next) => {
    console.log('시간표 관리');
    try {
        res.render(path.join(__dirname, '../../views/timetable/timetable_edit.ejs' ), {
            title: '시간표 관리',
        });
    }
    catch (err) {
        console.error('/views/timetable/timetable.js 에서 에러');
        console.error(err);
        next(err);
    }
});


function courseDay(day) {
    switch(day) {
        case 'mon':
            return "월요일";
        case 'tue':
            return "화요일";
        case 'wed':
            return "수요일";
        case 'thu':
            return "목요일";
        case 'fri':
            return "금요일";
    }
}

function courseType(type) { //과목 타입(online_realtime,online_video,offline)
    switch (type) {
        case 'online_realtime':
            return '온라인 실시간';
        case 'online_video':
            return '온라인 동영상';
        case 'offline': //오프라인이면 강의실을 리턴
            return '오프라인';
    }
}



router.post('/course/time/add', isLoggedIn, async (req, res) => {
    console.log(req.body);
    const { type, day, stime, etime, classroom, btnid, pid } = req.body;
    try {
        var time = {
            type : type,
            day : day, //mon, tue, ... 저장
            stime : stime, //시작시간
            etime : etime, //종료시간
            classroom : classroom, // 링크or강의실
            btnid : btnid, // 삭제버튼의 id
            pid : pid
        }
        timeList.push(time); // 시간 추가

        var returnTime = {
            type : courseType(type),
            day : courseDay(day),
            stime :stime,
            etime:etime,
        }
        res.send(returnTime); // 추가된 시간 출력용으로 전달
    } catch(err) {
        return (err);
    }


});


router.post('/course/time/sub', isLoggedIn, async (req, res) => {
    console.log(req.body);
    
    var targetid = req.body.target;
    try {
        
        console.log('클릭한 애:'+targetid);
        const index = timeList.findIndex(function(item) {
            return item.btnid === targetid
        });
        console.info(timeList[index]);
        var del = {
            btnid : timeList[index].btnid,
            pid : timeList[index].pid
        }

        timeList.splice(index, 1); // index번째의 시간 1개 삭제

        console.info(timeList);

        
        res.send(del); //삭제될 태그들의 id 리턴
        return del;

    } catch(err) {
        return (err);
    }


});

module.exports = router;