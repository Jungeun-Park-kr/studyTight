var userlist = new Array(); //사용자들을 담을 배열
var activeUser = new Object(); //로그인 중인 사용자를 담을 객체
userlist.push(
    {
        userId : 'je991025@gmail.com',
        password : 'angelje',
        name : '박정은',
        course : [] //과목 정보 저장할 곳
    }
);

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
course1.time.push(time1);

var course2 = {
    title : "웹프로그래밍기초및실습",
    professor : "최지웅",
    time : [], //과목 시간 담은 리스트
    type : "online_video", //과목 타입(online_realtime,online_video,offline)
    location : "http://myclass.ssu.ac.kr/" //강의실/강의링크
};
var time2 = {
    day : "mon", //mon, tue, ... 저장
    stime : "13:00", //시작시간
    etime : "14:45" //종료시간
}
course2.time.push(time2);

var course3 = {
    title : "데이터베이스",
    professor : "박동주",
    time : [], //과목 시간 담은 리스트
    type : "online_video", //과목 타입(online_realtime,online_video,offline)
    location : "http://myclass.ssu.ac.kr/" //강의실/강의링크
};
var time3 = {
    day : "wed", //mon, tue, ... 저장
    stime : "13:30", //시작시간
    etime : "14:45" //종료시간
}
course3.time.push(time3);

function createUser(userid, userpw, username) { //userlist에 새로운 사용자 추가
    var user = new Object();
    user.userId = userid;
    user.password = userpw;
    user.name = username;
    userlist.push(user);
    //console.log('새로운사용자'+user.userId+user.name);
    return true;
}

activeUser =    [0]; //test사용자를 로그인 시켜둠
//console.log('현재 사용자 : '+activeUser.name);
