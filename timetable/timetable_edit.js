function showTimetableAddPopup() {
    var popupWidth = 600;
    var popupHeight = 800;
    var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
    var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
    var url = "timetable_add.html";
    var name = "timetable add popup"
    var option = "width ="+popupWidth+", height ="+popupHeight+", left"+popupX+", top="+popupY+", scrollbars = yes, location = no";
    window.open(url, name, option);
}

function modifyCourse(course) { 
    
}

function deleteCourse(course) {
    var ret = confirm("정말로 삭제하시겠습니까?");
    if (ret) {
        //삭제 수행
    }else { //취소버튼 or 다이얼로그 닫은 경우
        ;
    }
}

function get_courses(value) {
    //파라미터 : td[번호]
    
}