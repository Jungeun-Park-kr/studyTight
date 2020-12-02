var doc = document;
var timelist = new Array();
var course_type;
console.log('activeUSer:'+activeUser.name);
// 아래는 OS 화면 기준으로 중앙에 팝업 띄움
var fullWidth = window.screen.width;
var fullHeight = window.screen.height;
function showTimetableAddPopup() {
    var popupWidth = 600;
    var popupHeight = 800;
    var popupX = (fullWidth/2) - (popupWidth/2);
    var popupY = (fullHeight/2) - (popupHeight/2);

    var url = "/timetable/timetable_add.html";
    var name = "timetable edit popup"
    var option = "width ="+popupWidth+", height ="+popupHeight+", left"+popupX+", top="+popupY+", scrollbars = yes, location = no";
    window.open(url, name, option);
}
// 아래는 브라우저 창 크기 기준으로 중앙에 팝업 띄움
// function showTimetableAddPopup() {
//     var popupWidth = 700;
//     var popupHeight = 800;
//     var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
//     var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
//     var url = "/timetable/timetable_add.html";
//     var name = "timetable add popup";
//     var option = "width ="+popupWidth+", height ="+popupHeight+", left"+popupX+", top="+popupY+", scrollbars = yes, location = no";
//     window.open(url, name, option);
// }

function addCourseTime(obj) {    //시간 추가하기 버튼 누를시 데이터에 저장해서 아래 출력해주기
    var parent = obj.parentElement; //버튼 부모 (즉 course_time_form - div)
    var newP = document.createElement("p");
    var sel = document.getElementById("course_day"); //요일 select
    var index = sel.selectedIndex; //선택된 옵션 인덱스 (요일 인덱스)
    var stime = document.getElementById("course_start_time"); //시작시간
    var etime = document.getElementById("course_end_time"); //종료시간
    var time; //시간 정보를 담은 텍스트
    time = sel.options[index].text + ' ' + stime.value + ' ~ ' + etime.value;
    newP.innerHTML = '(클릭시 삭제) ' + time;
    newP.addEventListener("click",
    function() {
        var p = this.parentElement;
        p.removeChild(this);
    });
    parent.appendChild(newP); //시간 정보 추가해주기
    //시간 정보를 담은 데이터를 저장하기
    var time = {
        day : sel.options[index].value, //mon, tue, ... 저장
        stime : stime.value, //시작시간
        etime : etime.value //종료시간
    }
    timelist.push(time); //time 추가
    //데이터확인용
    for (var i=0; i<timelist.length; i++) {
        console.log(timelist[i].day + timelist[i].stime + timelist[i].etime);
    }
}

function addCourse() { //저장하기 버튼
    var ctype = document.getElementsByName("course_type");
    var course_type;
    for (var i=0; i<ctype.length; i++) {
        if (ctype[i].checked == true) {
            course_type = ctype[i].value;
        }
    }
    var course = {
        title : document.getElementById("course_title").value,
        professor : document.getElementById("professor_name").value,
        time : timelist, //과목 시간 담은 리스트
        type : course_type, //과목 타입(online_realtime,online_video,offline)
        location : document.getElementById("course_location").value //강의실/강의링크
    };
    //현재 로그인 된 사용자의 과목 정보에 추가하기
    var username = localStorage.getItem('username'); //현재 로그인된 사용자 이름 가져오기
    activeUser = getActiveUser(username);  //사용자 이름으로 activeUser의 정보 가져와서 프로필 상태로 띄워줌
    activeUser.course.push(course); //현재 로그인 된 사용자의 course list에 추가한 과목 정보 넣기
    //최근에 추가한 항목 log로 확인해보기
    console.log('title:'+activeUser.course[activeUser.course.length-1].title + ', type:'+activeUser.course[activeUser.course.length-1].type);
    // setTimeout(function(){ //테스트용 2초 딜레이
    //     alert('asdf');
    //     window.close(); //창 닫기
    // }, 2000);
    window.close(); //창 닫기
}