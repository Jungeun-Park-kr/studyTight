const express = require('express');
const { isLoggedIn, isNotLoggedIn} = require('../middlewares');
const Course = require('../../models/course');
const CourseSchedule = require('../../models/course_schedule');
const WeeklyList = require('../../models/weekly_list');
const { mongo, Mongoose } = require('mongoose');
const logger = require('../../logger');
const router = express.Router();

var timeList = new Array();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


function courseDay(day) {
    switch(day) {
        case '1':
            return "월요일";
        case '2':
            return "화요일";
        case '3':
            return "수요일";
        case '4':
            return "목요일";
        case '5':
            return "금요일";
        case '6':
            return "토요일";
    }
}

function courseDayShort(day) {
    switch(day) {
        case '1':
            return "(월) ";
        case '2':
            return "(화) ";
        case '3':
            return "(수) ";
        case '4':
            return "(목) ";
        case '5':
            return "(금) ";
        case '6':
            return "(토) ";
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

function getCurrentDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

function getCurrentDateWithoutTime(){
    var date = new Date();
    // var year = date.getFullYear();
    // var month = date.getMonth();
    // var today = date.getDate();
    var year = 20201;
    var month = 9;
    var today = 19;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}


router.get('/main', isLoggedIn, async (req, res, next) => {
    try {
        const timetable = await Course.find( {user_id: res.locals.user._id}).populate('schedules').sort({'createdAt':1});

        // 1. 오늘 날짜 체크
        var today = getCurrentDateWithoutTime();
        logger.info('오늘의 요일:'+today.getDay()+", 오늘:"+today);

        const weeklyList = await WeeklyList.find({user_id : res.locals.user._id});
        for (var i=0; i<weeklyList.length; i++) {
            // 2. 월요일 12시 지난경우 + 아직 갱신 안한 경우
            if ((weeklyList[i].date < today) && today.getDay() > 0) { // day:0(일요일), day:1(월요일)
                if (weeklyList[i].finished) { // 2-1. finished가 true 인 경우 
                    if(weeklyList[i].week_ago == 0) { // 2-1-1. week_ago가 0인 경우 : false로 바꾸면 됨~
                        await WeeklyList.updateOne({
                            user_id : res.locals.user._id,
                            _id : weeklyList[i]._id,
                        }, {
                            $set : {
                                date : today, // 날짜 새로운 주차로 변경
                                finished : false,
                                week_ago : 0, // week_ago 다시 초기화
                            }
                        });
                    } else { // 2-1-2. week_ago가 1 이상인 경우 : 지난 것은 삭제하기
                        await WeeklyList.deleteOne({ user_id : res.locals.user._id, _id : weeklyList[i]._id });
                    }
                } else { // 2-2. finished가 false 인 경우
                    await WeeklyList.updateOne({ // 2-2-1. 기존 할일 week_ago 증가
                        user_id : res.locals.user._id, _id : weeklyList[i]._id,
                    }, {
                        $set : {
                            date : today, // 날짜 새로운 주차로 변경
                            finished : false,
                            week_ago : weeklyList[i].week_ago+1,
                            content : weeklyList[i].content,
                        }
                    });
                    await WeeklyList.create({ // 2-2-2. 동일한 이름의 새로운 할일 추가
                        user_id : req.user._id,
                        content : weeklyList[i].content,
                        day : weeklyList[i].day, // 강의 요일
                        date : today,
                        finished : false,
                        week_ago : 0,
                    });
                }
            }
        }
        const weeklyList2 = await WeeklyList.find({user_id : res.locals.user._id}).sort({'week_ago':-1,'day':1});
        timeList=[]; // 초기화 시켜주기
        res.render( '../views/timetable/timetable_main.ejs', {
            title: '내 시간표',
            user : res.locals.user,
            timetable : timetable,
            weeklyList : weeklyList2
        });
        
    }
    catch (err) {
        logger.error('/views/timetable/timetable.js 에서 에러');
        logger.error(err);
        next(err);
    }
});

router.patch('/main/weekly', isLoggedIn, async(req, res, next) => { 
    try {
        const weeklyList = await WeeklyList.updateOne({
            user_id : res.locals.user._id,
            _id : req.body.objectID,
        }, {
            $set : {
                finished : req.body.finished
            }
        });
        res.send("Success");
    }
    catch (e) {
        logger.error('/views/timetable/timetable.js 에서 위클리 투두 체크이벤트에서 에러');
        logger.error(err);
    }
});

router.delete('/main/weekly:id', isLoggedIn, async (req, res, next) => {
    try {
        logger.info ('넘어온 삭제할 위클리 id:'+req.params.id);
        const deleteId = req.params.id;

        const target = await WeeklyList.findOne({user_id: res.locals.user._id, _id:deleteId});
        logger.info('삭제할 위클리:'+target);


        // const target = await WeeklyList.findOne({user_id: res.locals.user._id, _id:deleteId});
        await WeeklyList.deleteOne({user_id: res.locals.user._id, _id:deleteId}); // 삭제하기
        return res.send('delete_succeeded');
    }
    catch (err) {
        logger.error('/views/timetable/timetable.js 에서 위클리 삭제 중 에러 발생');
        logger.error(err);
    }
});


router.post('/main/weekly', isLoggedIn, async (req, res, next) => {
    try {
        const content = req.body.content;
        // mongoDB에 과목 진도 (위클리 TODO) 추가
        const weekly = await WeeklyList.create({
            user_id : req.user._id,
            content : content,
            finished : false,
            date : getCurrentDateWithoutTime(),
        });

        res.send(weekly);
    } catch(err) {
        logger.error(err);
    }
});


router.get('/edit', isLoggedIn, async (req, res, next) => {

    try {
        const timetable = await Course.find({user_id: res.locals.user._id}).populate('schedules').sort({'createdAt':1});
        timeList=[]; // 초기화 시켜주기
        res.render('../views/timetable/timetable_edit.ejs', {
            title: '시간표 관리',
            user : res.locals.user,
            timetable : timetable
        });
    }
    catch (err) {
        logger.error('/views/timetable/timetable.js 에서 에러');
        logger.error(err);

        next(err);
    }
});



router.post('/course/time/add', isLoggedIn, async (req, res, next) => {
    const { type, day, stime, etime, classroom, target } = req.body;
    try {
        var time = {
            type : type,
            day : day, //mon, tue, ... 저장 -> 1, 2, 3 ... 저장
            stime : stime, //시작시간
            etime : etime, //종료시간
            classroom : classroom, // 링크or강의실
            target : target // 삭제할 애의 num
        }
        // 시간 중복 확인 in DB
        const checkCourse = await Course.find({user_id: res.locals.user._id}).populate('schedules');
        if (checkCourse != null) {
            for (var i = 0; i < checkCourse.length; i++) {
                var course = checkCourse[i];
                for (var j=0; j<course.schedules.length; j++) {
                    var schedule = course.schedules[j];
                    if ((schedule.day === day) && (stime <= schedule.start_time && schedule.start_time <= etime)) {
                        return res.send( {message : '/course/time/add?error=exist', course : course.course_name });
                    }
                    
                }
            }
        }
        // 시간 중복 확인 in timeList
        if (timeList.length > 0) {
            for(var i = 0; i < timeList.length; i++) {
                if ((timeList[i].day === day) && (stime <= timeList[i].stime && timeList[i].stime <= etime)) {
                    return res.send( {message : '/course/time/add?error=exist', course : 'this' });
                }
            }
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
        logger.error(err);
        return (err);
    }
});


router.delete('/course/time/delete', isLoggedIn, async (req, res) => {
    var targetNum = req.body.target;
    try {
        const index = timeList.findIndex(function(item) {
            return item.target === targetNum
        });
        
        timeList.splice(index, 1); // index번째의 시간 1개 삭제
        var data = {
            index : targetNum
        }
        res.send(data); //삭제될 태그들의 id 리턴
        
    } catch(err) {
        logger.error(err);
        return (err);
    }
});



router.post('/course/add', isLoggedIn, async (req, res, next) => {
    const {name, professor} = req.body;

    try {
        //timeList (과목 스케줄) 정렬
        timeList.sort(function (a,b) { // 시작 시간순 정렬
            return parseFloat(a.stime) - parseFloat(b.stime);
        });
        timeList.sort(function (a,b) { // 요일순 정렬
            return parseFloat(a.day) - parseFloat(b.day);
        });


        // mongoDB에 과목 시간 추가
        var courseIdList = new Array();
        for (var i=0; i < timeList.length; i++) {
            var courseSchedule = await CourseSchedule.create({
                day : timeList[i].day,
                start_time : timeList[i].stime,
                end_time : timeList[i].etime,
                course_type : timeList[i].type,
                classroom : timeList[i].classroom
            });
            courseIdList.push(courseSchedule._id); // course_id 넣기 (과목 1개의 mongodb id값)

            // mongoDB에 과목 진도 (위클리 TODO) 추가
            const weekly = await WeeklyList.create({
                user_id : req.user._id,
                content : courseDayShort(timeList[i].day)+name,
                day : timeList[i].day, // 강의 요일
                date : getCurrentDateWithoutTime(),
                finished : false,
                week_ago : 0,
            });
        };

        // mongoDB에 과목 추가
        const course = await Course.create({ 
            user_id : req.user._id, // 해당 과목의 사용자 obj_id (email 아님! mongodb id값임!)
            course_name : name,
            professor_name : professor,
            schedules : courseIdList, // 과목 시간 리스트
            createdAt : getCurrentDate(), // 과목 추가 날짜
        });
        
        

        // user한테도 courses 칼럼에 과목 넣어주기 (이건 불러올때 populate 하면됨)
        res.send( {
            _id : course._id,
            user_id : req.user._id, // 해당 과목의 사용자 obj_id (email 아님! mongodb id값임!)
            course_name : name,
            professor_name : professor,
            schedules : timeList, // 과목 시간 리스트
            createdAt : getCurrentDate(), // 과목 추가 날짜
        }); // 추가한 과목 정보 리턴
        timeList = []; // 저장 완료 후 배열 초기화

    } catch (err) {
        logger.error(err);
        next(err);
    }
});

router.delete('/course/delete:id', isLoggedIn, async (req, res, next) => {
    try {
        const deleteId = req.params.id;
        const target = await Course.findOne({user_id: res.locals.user._id, _id:deleteId}).populate('schedules');
        //logger.info('삭제할 과목:'+target);
        for (var i=0; i<target.schedules.length; i++) { // 과목 시간 먼저 삭제
            await CourseSchedule.deleteOne({_id:target.schedules[i]._id});
            //logger.info('삭제한 시간:'+target.schedules[i].classroom);
        }
        await Course.deleteOne({user_id: res.locals.user._id, _id:deleteId}); // 과목 삭제
        return res.send('delete_succeeded'); //삭제한 과목 리턴
    }
    catch (err) {
        logger.error(err);
        next(err);
    }
});

router.put('/course/modify', isLoggedIn, async (req, res, next) => {
    try {
        const {name, professor, id} = req.body;
        
        var courseIdList = new Array();
        for (var i=0; i < timeList.length; i++) {
            var courseSchedule = await CourseSchedule.create({
                day : timeList[i].day,
                start_time : timeList[i].stime,
                end_time : timeList[i].etime,
                course_type : timeList[i].type,
                classroom : timeList[i].classroom
            });
            courseIdList.push(courseSchedule._id); // course_id 넣기 (과목 1개의 mongodb id값)
        }

        // mongoDB에 과목 수정
        await Course.updateOne({ user_id: res.locals.user._id, _id: id }, { 
            user_id : req.user._id, // 해당 과목의 사용자 obj_id (email 아님! mongodb id값임!)
            course_name : name,
            professor_name : professor,
            schedules : courseIdList, // 과목 시간 리스트
            createdAt : getCurrentDate(), // 과목 수정 날짜
        });
        timeList = []; // 저장 완료 후 배열 초기화
        res.send('success');
        
    } catch (err) {
        logger.error(err);
        next(err);
    }
});

module.exports = router;