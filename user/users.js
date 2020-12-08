var userlist = new Array(); //사용자들을 담을 배열
var activeUser = new Object(); //로그인 중인 사용자를 담을 객체

userlist.push({
    userId: 'je991025@gmail.com',
    password: 'angelje',
    name: '박정은',
    userImage: '/media/profile.png',
    course: [], //과목 정보 저장할 곳
    guestbook: {  //방명록 정보 저장할 곳
        friendslist : [],
        //프로필 이미지는 user에 바로 있음
        profile : {},
        //방명록 주인도 필요없을듯
    },
    d_day: [], //디데이 정보 저장할 곳
    folder: []
});

//과목정보
var course1 = {
    title: "OS(운영체제)",
    professor: "김철홍",
    time: [], //과목 시간 담은 리스트
    type: "online_realtime", //과목 타입(online_realtime,online_video,offline)
    location: "https://ssu-ac-kr.zoom.us/j/99482576655?pwd=andKL2dvV0lxeHRuYm0xaXlIN1BhZz09" //강의실/강의링크
};
var time1 = {
    day: "thu", //mon, tue, ... 저장
    stime: "10:30", //시작시간
    etime: "11:45" //종료시간
}
var time4 = {
    day: "tue", //mon, tue, ... 저장
    stime: "10:30", //시작시간
    etime: "11:45" //종료시간
}
course1.time.push(time1);
course1.time.push(time4);
userlist[0].course.push(course1);

var course2 = {
    title: "웹프로그래밍기초및실습",
    professor: "최지웅",
    time: [], //과목 시간 담은 리스트
    type: "online_video", //과목 타입(online_realtime,online_video,offline)
    location: "http://myclass.ssu.ac.kr" //강의실/강의링크
};
var time2 = {
    day: "mon", //mon, tue, ... 저장
    stime: "13:00", //시작시간
    etime: "14:45" //종료시간
}
course2.time.push(time2);
userlist[0].course.push(course2);

var course3 = {
    title: "데이터베이스",
    professor: "박동주",
    time: [], //과목 시간 담은 리스트
    type: "online_video", //과목 타입(online_realtime,online_video,offline)
    location: "http://myclass.ssu.ac.kr" //강의실/강의링크
};
var time3 = {
    day: "wed", //mon, tue, ... 저장
    stime: "13:30", //시작시간
    etime: "14:45" //종료시간
}
course3.time.push(time3);
userlist[0].course.push(course3);
//activeUser = userlist[0]; //test사용자를 로그인 시켜둠

//console.log('현재 사용자 : '+activeUser.name);
//localStorage.setItem('activeUser', activeUser);
localStorage.setItem('userlist', userlist);



userlist.push({
    userId: 'noino08189@naver.com',
    password: 'asdfasdf',
    name: '최시언',
    userImage: '/media/user.png',
    course: [],
    guestbook: {},
    d_day: []
})
var course4 = {
    title: "운영체제",
    professor: "홍지만",
    time: [], //과목 시간 담은 리스트
    type: "online_realtime", //과목 타입(online_realtime,online_video,offline)
    location: "https://ssu-ac-kr.zoom.us/j/99482576655?pwd=andKL2dvV0lxeHRuYm0xaXlIN1BhZz09" //강의실/강의링크
};
var time5 = {
    day: "thu", //mon, tue, ... 저장
    stime: "10:30", //시작시간
    etime: "11:45" //종료시간
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
    for (var i = 0; i < userlist.length; i++) {
        if (userlist[i].name == username) {
            activeUser = userlist[i];
            return activeUser;
        }
    }
}



//d-day
var d_day1 = {
    day: "1",
    content: "정보보안 퀴즈"
};
var d_day2 = {
    day: "3",
    content: "모바일네트워크 퀴즈"
};
var d_day3 = {
    day: "5",
    content: "DB 과제2"
};
var d_day4 = {
    day: "6",
    content: "기독교 중간"
};
var d_day5 = {
    day: "7",
    content: "TOPCIT 시험"
};
var d_day6 = {
    day: "8",
    content: "무슨무슨 시험"
}
userlist[0].d_day.push(d_day1);
userlist[0].d_day.push(d_day2);
userlist[0].d_day.push(d_day3);
userlist[0].d_day.push(d_day4);
userlist[0].d_day.push(d_day5); //d-day 정보를 넣음
userlist[0].d_day.push(d_day6);

var folder1 = {
    title: "OS",
    star: "true",
    postIt: []
}
var folder2 = {
    title: "웹플밍",
    star: "true",
    postIt:[]
}
var folder3 = {
    title: "DB",
    star: "false",
    postIt:[]
}
var folder4 = {
    title: "SAP (ABAP)",
    star: "false",
    postIt:[]
}
var postIt1 = {
    title: "PID란?",
    type: "link"
}
var postIt2 = {
    title: "shell이란?",
    type: "link"
}
folder1.postIt.push(postIt1);
folder1.postIt.push(postIt2);
userlist[0].folder.push(folder1);
userlist[0].folder.push(folder2);
userlist[0].folder.push(folder3);
userlist[0].folder.push(folder4);



//guestbook
// userlist[0].guestbook = {
//     friendslist : [],
//     //프로필 이미지는 user에 바로 있음
//     profile : {},
//     //방명록 주인도 필요없을듯
// }
userlist[0].guestbook.profile = {
    profilename: "박정은",
    school: "숭실대학교",
    major: "컴퓨터학부",
    grade: "3",
    age: "22",
    gender: 2, //여자는 2, 남자는 1
    profilesecret: false //공개는 0, 비공개는 1
}
//친구 목록 리스트 추가
var friendslist1 = { //기본 박정은 방명록
    profileimage: "./media/profile.png",
    profilelist: [],
    commentlist: [],
    guestbookowner: "박정은" //방명록의 주인
}
userlist[0].guestbook.friendslist.push(friendslist1);
var friendslist2 = {
    profileimage: "./media/profile.png",
    profilelist: [],
    commentlist: [],
    guestbookowner: "최시언" //방명록의 주인
}
userlist[0].guestbook.friendslist.push(friendslist2);
var friendslist3 = {
    profileimage: "./media/profile.png",
    profilelist: [],
    commentlist: [],
    guestbookowner: "김삿갓" //방명록의 주인
}
userlist[0].guestbook.friendslist.push(friendslist3);


//userlist[0].guestbook.push(friendslist1); //삽입
//userlist[0].guestbook.push(friendslist2); //삽입
//userlist[0].guestbook.push(friendslist3); //삽입


// var profilelist1 = {
//     profilename: "박정은",
//     school: "숭실대학교",
//     major: "컴퓨터학부",
//     grade: "3",
//     age: "22",
//     gender: 2, //여자는 2, 남자는 1
//     profilesecret: true //공개는 false, 비공개는 true
// }
userlist[1].guestbook.profile = {
    profilename: "최시언",
    school: "숭실대학교",
    major: "컴퓨터학부",
    grade: "3",
    age: "22",
    gender: 2, //여자는 2, 남자는 1
    profilesecret: false //공개는 0, 비공개는 1
};
// var profilelist2 = {
//     profilename: "최시언",
//     school: "숭실대학교",
//     major: "컴퓨터학부",
//     grade: "3",
//     age: "22",
//     gender: 2, //여자는 2, 남자는 1
//     profilesecret: false //공개는 0, 비공개는 1
// }

//userlist[0].guestbook.push(friendslist1); //삽입
//userlist[0].guestbook.push(friendslist2); //삽입

//friendslist1.profilelist.push(profilelist1);
//friendslist2.profilelist.push(profilelist2);





var commentlist1 = {
    Author: "최시언",
    mycommnet: "너 이번 웹프로그래밍 문제 이해했어?",
    commnetsecret: 0 // 공개는 0, 비공개는 1
}

var commentlist2 = {
    Author: "김삿갓",
    mycommnet: "너 시간표 진짜 신기하다.",
    mycommnet1: "잘 보고가!다음에 수업 겹치면 같이 듣자!",
    commnetsecret: 0 // 공개는 0, 비공개는 1
}

var commentlist3 = { //비공개여부 테스트용
    Author: "김삿갓",
    mycommnet: "사실 나도 궁금했어",
    commnetsecret: 1 // 공개는 0, 비공개는 1
}

var commentlist4 = { //비공개여부 테스트용
    Author: "양지영",
    mycommnet: "나도 다녀가!.",
    commnetsecret: 0 // 공개는 0, 비공개는 1
}


friendslist1.commentlist.push(commentlist1);
friendslist1.commentlist.push(commentlist2);
friendslist1.commentlist.push(commentlist3);
friendslist2.commentlist.push(commentlist4);