var userlist = new Array(); //사용자들을 담을 배열
var activeUser = new Object(); //로그인 중인 사용자를 담을 객체

userlist.push(
    {
        userId : 'je991025@gmail.com',
        password : 'angelje',
        name : '박정은',
        userImage : '/media/profile.png',
        course : [], //과목 정보 저장할 곳
        guestbook : [], //방명록 정보 저장할 곳
        d_day :[] //디데이 정보 저장할 곳

    }
);

//과목정보
var course1 = {
    title : "OS(운영체제)",
    professor : "김철홍",
    time : [], //과목 시간 담은 리스트
    type : "online_realtime", //과목 타입(online_realtime,online_video,offline)
    location : "https://ssu-ac-kr.zoom.us/j/99482576655?pwd=andKL2dvV0lxeHRuYm0xaXlIN1BhZz09" //강의실/강의링크
};
var time1 = {
    day : "thu", //mon, tue, ... 저장
    stime : "10:30", //시작시간
    etime : "11:45" //종료시간
}
var time4 = {
    day : "tue", //mon, tue, ... 저장
    stime : "10:30", //시작시간
    etime : "11:45" //종료시간
}
course1.time.push(time1);
course1.time.push(time4);
userlist[0].course.push(course1);

var course2 = {
    title : "웹프로그래밍기초및실습",
    professor : "최지웅",
    time : [], //과목 시간 담은 리스트
    type : "online_video", //과목 타입(online_realtime,online_video,offline)
    location : "http://myclass.ssu.ac.kr" //강의실/강의링크
};
var time2 = {
    day : "mon", //mon, tue, ... 저장
    stime : "13:00", //시작시간
    etime : "14:45" //종료시간
}
course2.time.push(time2);
userlist[0].course.push(course2);

var course3 = {
    title : "데이터베이스",
    professor : "박동주",
    time : [], //과목 시간 담은 리스트
    type : "online_video", //과목 타입(online_realtime,online_video,offline)
    location : "http://myclass.ssu.ac.kr" //강의실/강의링크
};
var time3 = {
    day : "wed", //mon, tue, ... 저장
    stime : "13:30", //시작시간
    etime : "14:45" //종료시간
}
course3.time.push(time3);
userlist[0].course.push(course3);
//activeUser = userlist[0]; //test사용자를 로그인 시켜둠

//console.log('현재 사용자 : '+activeUser.name);
//localStorage.setItem('activeUser', activeUser);
localStorage.setItem('userlist', userlist);

userlist.push (
    {
        userId : 'noino08189@naver.com',
        password : 'asdfasdf',
        name : '최시언',
        userImage : '/media/user.png',
        course : [],
        guestbook : [],
        d_day : []
    }
)
var course4 = {
    title : "운영체제",
    professor : "홍지만",
    time : [], //과목 시간 담은 리스트
    type : "online_realtime", //과목 타입(online_realtime,online_video,offline)
    location : "https://ssu-ac-kr.zoom.us/j/99482576655?pwd=andKL2dvV0lxeHRuYm0xaXlIN1BhZz09" //강의실/강의링크
};
var time5 = {
    day : "thu", //mon, tue, ... 저장
    stime : "10:30", //시작시간
    etime : "11:45" //종료시간
}
course4.time.push(time5);
userlist[1].course.push(course4);


function createUser(userid, userpw, username) { //userlist에 새로운 사용자 추가
    var user = new Object();
    user.userId = userid;
    user.password = userpw;
    user.name = username;
    userlist.push(user);
    //console.log('새로운사용자'+user.userId+user.name);
    return true;
}




function getActiveUser(username) { //사용자 이름으로 현재 접속중인 사용자 객체 찾아서 리턴
    for (var i=0; i<userlist.length; i++) {
        if (userlist[i].name == username) { 
            activeUser = userlist[i];
            return activeUser;
        }
    }
}

//d-day
var d_day1 = {
    day: 1,
    content: "정보보안 퀴즈"
};
var d_day2 = {
    day: 3,
    content: "모바일네트워크 퀴즈"
};
var d_day3 = {
    day: 5,
    content: "DB 과제2"
};
var d_day4 = {
    day: 9,
    content: "기독교 중간"
};
var d_day5 = {
    day: 15,
    content: "TOPCIT 시험"
};
userlist[0].d_day.push(d_day1);
userlist[0].d_day.push(d_day2);
userlist[0].d_day.push(d_day3);
userlist[0].d_day.push(d_day4);
userlist[0].d_day.push(d_day5); //d-day 정보를 넣음

