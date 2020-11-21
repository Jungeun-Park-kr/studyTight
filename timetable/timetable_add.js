var doc = document;
// 아래는 OS 화면 기준으로 중앙에 팝업 띄움
// var fullWidth = window.screen.width;
// var fullHeight = window.screen.height;
// function showTimetableAddPopup() {
//     var popupWidth = 600;
//     var popupHeight = 800;
//     var popupX = (fullWidth/2) - (popupWidth/2);
//     var popupY = (fullHeight/2) - (popupHeight/2);

//     var url = "timetable_edit.html";
//     var name = "timetable edit popup"
//     var option = "width ="+popupWidth+", height ="+popupHeight+", left"+popupX+", top="+popupY+", scrollbars = yes, location = no";
//     window.open(url, name, option);
// }
// 아래는 브라우저 창 크기 기준으로 중앙에 팝업 띄움
function showTimetableAddPopup() {
    var popupWidth = 700;
    var popupHeight = 800;
    var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
    var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
    var url = "timetable_add.html";
    var name = "timetable add popup"
    var option = "width ="+popupWidth+", height ="+popupHeight+", left"+popupX+", top="+popupY+", scrollbars = yes, location = no";
    window.open(url, name, option);
}

function addCourse() {
    //시간 추가하기 버튼 누를시 추가생성하기
}

// function RadioCourseType(type) {
//     // 라디오버튼이 온라인실시간, 온라인 동영상 : course_link_form
//     // 라디오버튼이 오프라인 : course_location_form
//     if (type=='online') {
//         doc.getElementsById('course_location_form').style.display="none";
//         doc.getElementsById('course_link_form').style.display="";
//     }
//     else {
//         doc.getElementsById('course_location_form').style.display="";
//         doc.getElementsById('course_link_form').style.display="none";
//     }
//     // var check_cnt = doc.getElementsByName("course_type").length;
//     // var isOnline = true;
//     // for (var i = 0; i < check_cnt; i++) {
//     //     if (doc.getElementsByClassName("course_type")[i].checked == true) { //check된 라디오 버튼
//     //         isOnline = i < 2 ? true : false; //오프라인이면 isOnline = false
//     //     }
//     // }
//     // if (!isOnline) { //오프라인인 경우
//     //     var offline = doc.getElementById("course_location_form");
//     //     offline.style.display = "visible";
//     //     var online = doc.getElementById("course_link_form");
//     //     online.style.display = "none";
//     // }
// }

