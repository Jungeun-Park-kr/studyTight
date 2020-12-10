//정은 데모영상위한 데이터

//최시언 과목정보
var time5_2 = {
    day: "mon", //mon, tue, ... 저장
    stime: "10:30", //시작시간
    etime: "11:45" //종료시간
}
course4.time.push(time5_2);
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


//얘를 친구추가하면 될거같음(데모영상)
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
    profilesecret: true //공개는 0, 비공개는 1
};
//시간표도 얘껄로 확인해서 비공개인 사람 보여주기