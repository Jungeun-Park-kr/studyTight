var userlist = new Array(); //사용자들을 담을 배열
var activeUser = new Object(); //로그인 중인 사용자를 담을 객체

//사용자1 박정은
userlist.push({
    userId: 'je991025@gmail.com',
    password: 'angelje',
    name: '박정은',
    userImage: '/media/profile.png',
    course: [], //과목 정보 저장할 곳
    guestbook: { //방명록 정보 저장할 곳
        friendslist: [],
        profile: {},
        commentlist: [],
    },
    d_day: [], //디데이 정보 저장할 곳
    folder: []
});


//사용자2 최시언
userlist.push({
        userId: 'noino0819@naver.com',
        password: 'asdfasdf',
        name: '최시언',
        userImage: '/media/profile2.png',
        course: [],
        guestbook: { //방명록 정보 저장할 곳
            friendslist: [],
            profile: {},
            commentlist: [],
        },
        d_day: []
    })
    //사용자3 김삿갓
userlist.push({
        userId: 'kimsatgat@naver.com',
        password: 'kimkimsatgatsatgat',
        name: '김삿갓',
        userImage: '/media/profile3.png',
        course: [],
        guestbook: { //방명록 정보 저장할 곳
            friendslist: [],
            profile: {},
            commentlist: [],
        },
        d_day: []
    })
    //사용자 4 양지영 (친구 추가할 사람)
userlist.push({
        userId: 'sidjyoung@naver.com',
        password: 'sheepjiyoung',
        name: '양지영',
        userImage: '/media/profile1.png',
        course: [],
        guestbook: { //방명록 정보 저장할 곳
            friendslist: [],
            profile: {},
            commentlist: [],
        },
        d_day: []
    })
    //사용자 5 - 추가할 사용자 정보(데모영상)
    //김준면 추가시에 사용
userlist.push({
    userId: 'suho@gmail.com',
    password: 'junm0522',
    name: '김준면',
    userImage: '/media/user.png',
    course: [], //과목 정보 저장할 곳
    guestbook: { //방명록 정보 저장할 곳
        friendslist: [],
        profile: {},
        commentlist: [],
    },
    d_day: [], //디데이 정보 저장할 곳
    folder: []
});
//김준면 사용자, 방명록 데이터(데모영상) (초기 이름 제외 모두 비공개)
userlist[4].guestbook.profile = {
    profilename: userlist[4].name,
    school: "",
    school_secret: true,
    major: "",
    major_secret: true,
    grade: "",
    grade_secret: true,
    age: "",
    age_secret: true,
    gender: true,
    profilesecret: true
};


//추가할 과목(데모영상)
var course_new = {
    title: "SAP",
    professor: "홍지만",
    time: [], //과목 시간 담은 리스트
    type: "online_realtime", //과목 타입(online_realtime,online_video,offline)
    location: "https://zoom.us/j/96212336817" //강의실/강의링크
};
var time_new = {
    day: "mon", //mon, tue, ... 저장
    stime: "16:30", //시작시간
    etime: "19:30" //종료시간
}
course_new.time.push(time_new);
userlist[0].course.push(course_new);

//과목정보 (기존 OS)
// var course1 = {
//     title: "OS(운영체제)",
//     professor: "김철홍",
//     time: [], //과목 시간 담은 리스트
//     type: "online_realtime", //과목 타입(online_realtime,online_video,offline)
//     location: "https://ssu-ac-kr.zoom.us/j/99482576655?pwd=andKL2dvV0lxeHRuYm0xaXlIN1BhZz09" //강의실/강의링크
// };
// var time1 = {
//     day: "thu", //mon, tue, ... 저장
//     stime: "10:30", //시작시간
//     etime: "11:45" //종료시간
// }
// var time4 = {
//     day: "tue", //mon, tue, ... 저장
//     stime: "10:30", //시작시간
//     etime: "11:45" //종료시간
// }
// course1.time.push(time1);
// course1.time.push(time4);
// userlist[0].course.push(course1);

// //수정할 과목정보 (데모영상용)
course1 = {
    title: "OS",
    professor: "홍지만",
    time: [], //과목 시간 담은 리스트
    type: "offline", //과목 타입(online_realtime,online_video,offline)
    location: "정보관 302호" //강의실/강의링크
};
time1 = {
    day: "mon", //mon, tue, ... 저장
    stime: "09:00", //시작시간
    etime: "10:15" //종료시간
}
course1.time.push(time1);
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
    day: "tue", //mon, tue, ... 저장
    stime: "13:30", //시작시간
    etime: "14:45" //종료시간
}
course3.time.push(time3);
userlist[0].course.push(course3);

var course3 = {
    title: "철학으로만나는기독교",
    professor: "성신형",
    time: [], //과목 시간 담은 리스트
    type: "offline", //과목 타입(online_realtime,online_video,offline)
    location: "미래관302" //강의실/강의링크
};
var time3 = {
    day: "wed", //mon, tue, ... 저장
    stime: "13:30", //시작시간
    etime: "14:45" //종료시간
}
course3.time.push(time3);
userlist[0].course.push(course3);


//김삿갓 과목
var course_ksg = {
    title: "경제발전론",
    professor: "김지석",
    time: [], //과목 시간 담은 리스트
    type: "online_realtime", //과목 타입(online_realtime,online_video,offline)
    location: "http://myclass.cua.ac.kr" //강의실/강의링크
};
var time_ksg1 = {
    day: "mon", //mon, tue, ... 저장
    stime: "10:30", //시작시간
    etime: "12:00" //종료시간
}
var time_ksg2 = {
    day: "wed", //mon, tue, ... 저장
    stime: "9:00", //시작시간
    etime: "10:30" //종료시간
}
course_ksg.time.push(time_ksg1);
course_ksg.time.push(time_ksg2);
userlist[2].course.push(course_ksg);

var course_ksg2 = {
    title: "거시경제학",
    professor: "이영화",
    time: [], //과목 시간 담은 리스트
    type: "online_video", //과목 타입(online_realtime,online_video,offline)
    location: "http://myclass.cua.ac.kr" //강의실/강의링크
};
var time_ksg3 = {
    day: "mon", //mon, tue, ... 저장
    stime: "13:30", //시작시간
    etime: "14:00" //종료시간
}
var time_ksg4 = {
    day: "wed", //mon, tue, ... 저장
    stime: "13:30", //시작시간
    etime: "15:00" //종료시간
}
course_ksg2.time.push(time_ksg3);
course_ksg2.time.push(time_ksg4);
userlist[2].course.push(course_ksg2);
var course_ksg3 = {
    title: "공공경제학",
    professor: "최주리",
    time: [], //과목 시간 담은 리스트
    type: "online_video", //과목 타입(online_realtime,online_video,offline)
    location: "http://myclass.cua.ac.kr" //강의실/강의링크
};
var time_ksg5 = {
    day: "tue", //mon, tue, ... 저장
    stime: "13:30", //시작시간
    etime: "14:00" //종료시간
}
var time_ksg6 = {
    day: "thu", //mon, tue, ... 저장
    stime: "13:30", //시작시간
    etime: "15:00" //종료시간
}
course_ksg3.time.push(time_ksg5);
course_ksg3.time.push(time_ksg6);
userlist[2].course.push(course_ksg3);
var course_ksg4 = {
    title: "근대경제사",
    professor: "박제명",
    time: [], //과목 시간 담은 리스트
    type: "online_video", //과목 타입(online_realtime,online_video,offline)
    location: "http://myclass.cua.ac.kr" //강의실/강의링크
};
var time_ksg7 = {
    day: "tue", //mon, tue, ... 저장
    stime: "15:00", //시작시간
    etime: "16:30" //종료시간
}
var time_ksg8 = {
    day: "thu", //mon, tue, ... 저장
    stime: "15:00", //시작시간
    etime: "16:30" //종료시간
}
course_ksg4.time.push(time_ksg7);
course_ksg4.time.push(time_ksg8);
userlist[2].course.push(course_ksg4);
var course_ksg5 = {
    title: "국제물류론",
    professor: "천정수",
    time: [], //과목 시간 담은 리스트
    type: "online_realtime", //과목 타입(online_realtime,online_video,offline)
    location: "http://myclass.cua.ac.kr" //강의실/강의링크
};
var time_ksg9 = {
    day: "tue", //mon, tue, ... 저장
    stime: "16:30", //시작시간
    etime: "18:00" //종료시간
}
var time_ksg10 = {
    day: "thu", //mon, tue, ... 저장
    stime: "16:30", //시작시간
    etime: "18:00" //종료시간
}
course_ksg5.time.push(time_ksg9);
course_ksg5.time.push(time_ksg10);
userlist[2].course.push(course_ksg5);

course_ksg6 = {
    title: "경제통상통계학",
    professor: "김세훈",
    time: [], //과목 시간 담은 리스트
    type: "online_realtime", //과목 타입(online_realtime,online_video,offline)
    location: "http://myclass.cua.ac.kr" //강의실/강의링크
};
time_ksg11 = {
    day: "thu", //mon, tue, ... 저장
    stime: "9:00", //시작시간
    etime: "12:00" //종료시간
}
course_ksg6.time.push(time_ksg11);
userlist[2].course.push(course_ksg6);



//최시언 과목정보
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
//최시언 과목정보
var time5_2 = {
    day: "mon", //mon, tue, ... 저장
    stime: "10:30", //시작시간
    etime: "11:45" //종료시간
}
course4.time.push(time5_2);
userlist[1].course.push(course4);
course4 = {
    title: "데이터베이스",
    professor: "박동주",
    time: [], //과목 시간 담은 리스트
    type: "online_realtime", //과목 타입(online_realtime,online_video,offline)
    location: "http://myclass.ssu.ac.kr" //강의실/강의링크
};
time5 = {
    day: "tue", //mon, tue, ... 저장
    stime: "13:30", //시작시간
    etime: "15:00" //종료시간
}
course4.time.push(time5);
userlist[1].course.push(course4);
course4 = {
    title: "컴퓨터공학특강2",
    professor: "박성호",
    time: [], //과목 시간 담은 리스트
    type: "online_realtime", //과목 타입(online_realtime,online_video,offline)
    location: "http://myclass.ssu.ac.kr" //강의실/강의링크
};
time5 = {
    day: "wed", //mon, tue, ... 저장
    stime: "12:00", //시작시간
    etime: "13:15" //종료시간
}
course4.time.push(time5);
userlist[1].course.push(course4);
course4 = {
    title: "웹프로그래밍기초및실습",
    professor: "최지웅",
    time: [], //과목 시간 담은 리스트
    type: "online_video", //과목 타입(online_realtime,online_video,offline)
    location: "http://myclass.ssu.ac.kr" //강의실/강의링크
};
time5 = {
    day: "mon", //mon, tue, ... 저장
    stime: "13:00", //시작시간
    etime: "14:45" //종료시간
}
course4.time.push(time5);
userlist[1].course.push(course4);


//양지영 과목정보 
var course_jy = {
    title: "OS(운영체제)",
    professor: "김철홍",
    time: [], //과목 시간 담은 리스트
    type: "online_realtime", //과목 타입(online_realtime,online_video,offline)
    location: "https://ssu-ac-kr.zoom.us/j/99482576655?pwd=andKL2dvV0lxeHRuYm0xaXlIN1BhZz09" //강의실/강의링크
};
var time_jy = {
    day: "thu", //mon, tue, ... 저장
    stime: "10:30", //시작시간
    etime: "11:45" //종료시간
}
var time_jy2 = {
    day: "tue", //mon, tue, ... 저장
    stime: "10:30", //시작시간
    etime: "11:45" //종료시간
}
course_jy.time.push(time_jy);
course_jy.time.push(time_jy2);
userlist[3].course.push(course_jy);

course_jy = {
    title: "웹프로그래밍기초및실습",
    professor: "최지웅",
    time: [], //과목 시간 담은 리스트
    type: "online_video", //과목 타입(online_realtime,online_video,offline)
    location: "http://myclass.ssu.ac.kr" //강의실/강의링크
};
time_jy = {
    day: "mon", //mon, tue, ... 저장
    stime: "13:00", //시작시간
    etime: "14:45" //종료시간
}
course_jy.time.push(time_jy);
userlist[3].course.push(course_jy);


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

function getActiveUserlist(username) { //사용자 이름으로 현재 접속중인 사용자 객체 찾아서 리턴

    return userlist;


}



//d-day
var d_day1 = {
    day: "2",
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

userlist[0].d_day.push(d_day1);
userlist[0].d_day.push(d_day2);
userlist[0].d_day.push(d_day3);
userlist[0].d_day.push(d_day4);
userlist[0].d_day.push(d_day5);

var d_day6 = {
    day: "8",
    content: "웹플밍 시험"
}; //추가된 데이터
userlist[0].d_day.push(d_day6);

var folder1 = {
    title: "OS",
    star: "true",
    postIt: [],
    todo: []
}
var folder_todo = {
    content: "과제6 제출",
    isfinished: false
}
folder1.todo.push(folder_todo);
folder_todo = {
    content: "기말 시험 공부",
    isfinished: false
}
folder1.todo.push(folder_todo);
var folder2 = {
    title: "웹플밍",
    star: "true",
    postIt: [],
    todo: []
}
var folder3 = {
    title: "DB",
    star: "false",
    postIt: [],
    todo: []
}
var folder3 = {
    title: "정보보안",
    star: "false",
    postIt: [],
    todo: []
}
var folder4 = {
    title: "SAP (ABAP)",
    star: "false",
    postIt: [],
    todo: []
}
var postIt1 = {
    title: "PID란?",
    type: "link",
    url: "https://pkr7098.tistory.com/63"
}
var postIt2 = {
    title: "shell이란?",
    type: "link",
    url: "https://jhnyang.tistory.com/57"
}

var postIt3 = {
    title: "요점정리 1",
    type: "content",
    url: "요점정리 1입니다."
}
folder2.postIt.push(postIt3);


var postIt4 = {
    title: "요점정리노트 1",
    type: "file",
    url: "C:\\Users\\노이노\\Desktop\\CPS.pdf"
}
folder2.postIt.push(postIt4);

var postIt5 = {
    title: "mdn 사이트",
    type: "link",
    url: "https://developer.mozilla.org/ko/"
}
folder2.postIt.push(postIt5);

folder1.postIt.push(postIt1);
folder1.postIt.push(postIt2);
userlist[0].folder.push(folder1);
userlist[0].folder.push(folder2);
userlist[0].folder.push(folder3);
userlist[0].folder.push(folder4);


//추가할 폴더 (데모영상용)
var folder5 = {
        title: "데이터베이스",
        star: "false",
        postIt: [],
        todo: []
    }
    //추가할 할 일 (데모영상용) 
folder_todo = {
    content: "기말 공부",
    isfinished: true
}
folder5.todo.push(folder_todo);
userlist[0].folder.push(folder5);


//guestbook
// userlist[0].guestbook.profile = {
//     profilename: "박정은",
//     school: "숭실대학교",
//     school_secret: false,
//     major: "컴퓨터학부",
//     major_secret: false,
//     grade: "3",
//     grade_secret: true,
//     age: "22",
//     age_secret: true,
//     gender: true,
//     profilesecret: false //공개는 0, 비공개는 1
// }

//아래 있는게 프로필 내용 저장하는것
userlist[0].guestbook.profile = {
    profilename: "박정은",
    school: "숭실대학교",
    school_secret: true,
    major: "컴퓨터학부",
    major_secret: false,
    grade: "3",
    grade_secret: false,
    age: "22",
    age_secret: true,
    gender: true,
    profilesecret: false //공개는 0, 비공개는 1
}

//친구 목록 리스트 추가
var friendslist1 = { //기본 박정은 방명록
    profileimage: "./media/profile2.png",
    guestbookowner: "최시언", //방명록의 주인
    email: "noino0819@naver.com"
}
userlist[0].guestbook.friendslist.push(friendslist1);
var friendslist2 = {
    profileimage: "./media/profile3.png",
    guestbookowner: "김삿갓", //방명록의 주인
    email: "kimsatgat@naver.com"
}
userlist[0].guestbook.friendslist.push(friendslist2);
//친구 추가 (데모영상용)
var friendslist3 = {
    profileimage: "./media/profile1.png",
    guestbookowner: "양지영", //방명록의 주인
    email: "sidjyoung@naver.com"
}
userlist[0].guestbook.friendslist.push(friendslist3);

//(추가된 영상용.)
var friendslist4 = {
    profileimage: "/media/user.png",
    guestbookowner: "김준면", //방명록의 주인
    email: "suho@gmail.com"
}
userlist[0].guestbook.friendslist.push(friendslist4);



userlist[1].guestbook.profile = {
    profilename: "최시언",
    school: "숭실대학교",
    school_secret: false,
    major: "컴퓨터학부",
    major_secret: false,
    grade: "3",
    grade_secret: false,
    age: "22",
    age_secret: true,
    gender: true,
    profilesecret: false //공개는 0, 비공개는 1
};

userlist[2].guestbook.profile = {
    profilename: "김삿갓",
    school: "중앙대학교",
    school_secret: false,
    major: "경제학과",
    major_secret: false,
    grade: "3",
    grade_secret: false,
    age: "20",
    age_secret: true,
    gender: false, //여자는 2, 남자는 1
    profilesecret: true //공개는 0, 비공개는 1
};

//추가할  데이터 (데모영상용)
userlist[3].guestbook.profile = {
    profilename: "양지영",
    school: "숭실대학교",
    school_secret: false,
    major: "컴퓨터학부",
    major_secret: true,
    grade: "3",
    grade_secret: false,
    age: "23",
    age_secret: true,
    gender: true,
    profilesecret: true //공개는 0, 비공개는 1
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
    today: "2020-10-16 12:13:11",
    commnetsecret: 0 // 공개는 0, 비공개는 1
}

var commentlist2 = {
    Author: "김삿갓",
    mycommnet: "너 시간표 진짜 신기하다.",
    mycommnet1: "잘 보고가!다음에 수업 겹치면 같이 듣자!",
    today: "2020-11-26 16:13:12",
    commnetsecret: 0 // 공개는 0, 비공개는 1
}

var commentlist3 = { //비공개여부 테스트용
    Author: "김삿갓",
    mycommnet: "사실 나도 궁금했어",
    today: "2020-11-27 17:13:12",
    commnetsecret: 1 // 공개는 0, 비공개는 1
}

var commentlist4 = { //비공개여부 테스트용
    Author: "양지영",
    mycommnet: "나도 다녀가!",
    today: "2020-11-29 08:13:12",
    commnetsecret: 0 // 공개는 0, 비공개는 1
}

var commentlist5 = { //비공개여부 테스트용
    Author: "양지영",
    mycommnet: "나도 다녀가!!!",
    today: "2020-11-29 08:13:12",
    commnetsecret: 0 // 공개는 0, 비공개는 1
}

var commentlist6 = { //비공개여부 테스트용
    Author: "최시언",
    mycommnet: "나 근데 웹실습도 못했어...",
    today: "2020-11-29 10:13:12",
    commnetsecret: 0 // 공개는 0, 비공개는 1
}

var commentlist7 = { //비공개여부 테스트용
    Author: "최시언",
    mycommnet: "너는 ... 했어....?",
    today: "2020-11-30 08:08:12",
    commnetsecret: 0 // 공개는 0, 비공개는 1
}

var commentlist8 = {
    Author: "최시언",
    mycommnet: "비밀글이지롱!",
    today: "2020-10-16 12:13:11",
    commnetsecret: 1 // 공개는 0, 비공개는 1
}

var commentlist9 = {
    Author: "최시언",
    mycommnet: "이건비밀글이아니지롱!",
    today: "2020-10-16 12:13:13",
    commnetsecret: 0 // 공개는 0, 비공개는 1
}

// 영상 테스트용
// var commentlist10 = { 
//     Author: "박정은",
//     mycommnet: "안녕하세요!",
//     today: "2020-12-11 13:08:12",
//     commnetsecret: 0 // 공개는 0, 비공개는 1
// }

userlist[0].guestbook.commentlist.push(commentlist1); //삽입
userlist[0].guestbook.commentlist.push(commentlist2); //삽입
userlist[0].guestbook.commentlist.push(commentlist3); //삽입
userlist[0].guestbook.commentlist.push(commentlist4); //삽입
userlist[0].guestbook.commentlist.push(commentlist5); //삽입
userlist[0].guestbook.commentlist.push(commentlist6); //삽입
userlist[0].guestbook.commentlist.push(commentlist7); //삽입
// userlist[0].guestbook.commentlist.push(commentlist10); //삽입
userlist[1].guestbook.commentlist.push(commentlist8); //삽입
userlist[1].guestbook.commentlist.push(commentlist9); //삽입