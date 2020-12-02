function showTimetableAddPopup() {
    var popupWidth = 650;
    var popupHeight = 800;
    var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
    var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
    var url = "timetable_add.html";
    var name = "timetable add popup"
    var option = "width ="+popupWidth+", height ="+popupHeight+", left"+popupX+", top="+popupY+", scrollbars = yes, location = no";
    window.open(url, name, option);
}

function getCourses(course) { //파라미터:courselist
    var tbody = document.getElementById('course_table_body'); //table body 가져오기
    for(var i=0; i<course.length; i++) { //과목 개수만큼 반복하기
        var nrow = tbody.insertRow(-1); //제일 하단에 추가
        var ncell1 = nrow.insertCell(0); //과목명 셀
        var ncell2 = nrow.insertCell(1); //시간 셀 (요일 시작시간-끝시간)
        var ncell3 = nrow.insertCell(2); //강의 방식 셀 (온라인실시간/온라인동영상/오프라인-강의실명)
        var ncell4 = nrow.insertCell(3); //교수명 셀
        var ncell5 = nrow.insertCell(4); //수정버튼
        var ncell6 = nrow.insertCell(5); //삭제버튼

        ncell1.innerHTML = course[i].title; 
        var timetext="";
        //console.log(timetext);
        for (var j=0; j<course[i].time.length; j++) { //과목 시간 리스트
            var text = courseDay(course[i].time[j].day) +' '+ course[i].time[j].stime +'-'+ course[i].time[j].etime;
            timetext = timetext + text + '\n';
        }
        console.log(timetext);
        ncell2.innerHTML = timetext;
        ncell3.innerHTML = courseType(course[i].type, course[i].location);
        ncell4.innerHTML = course[i].professor;
        ncell5.innerHTML = '<input type="button" class="btn_modify_course"/>';
        ncell6.innerHTML = '<input type="button" class="btn_delete_course"/>';
    }
}

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

function courseType(type, location) { //과목 타입(online_realtime,online_video,offline)
    switch (type) {
        case 'online_realtime':
            return '온라인 실시간';
        case 'online_video':
            return '온라인 동영상';
        case 'offline': //오프라인이면 강의실을 리턴
            return location;
    }
}


function modifyCourse(obj) { 
    //과목 수정 버튼 누를 경우 해당 과목의 정보 수정
    
}

function deleteCourse(title) { //해당 과목이름을 가진 과목을 DB에서 삭제하기
    var username = localStorage.getItem('username'); //현재 로그인된 사용자 이름 가져오기
    activeUser = getActiveUser(username);  //사용자 이름으로 activeUser의 정보 가져와서 프로필 상태로 띄워줌
    var courselist = activeUser.course;
    for (var i=0; i<courselist.length; i++) {
        if (courselist[i].title === title) { //해당 데이터 삭제
            console.log('찾음! 삭제할 과목:'+courselist[i].title);
            courselist.splice(i, 1);
        }
    }
    console.log('--잘 삭제되었나 확인--')
    for (var i=0; i<courselist.length; i++) {
        console.log(courselist[i].title);
    }
}

