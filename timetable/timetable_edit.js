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
        //console.log(timetext);
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

function showCourseEditPopup(course) {
    var popupWidth = 650;
    var popupHeight = 800;
    var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
    var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
    var url = "timetable_course_edit.html";
    var name = "course edit popup"
    var option = "width ="+popupWidth+", height ="+popupHeight+", left"+popupX+", top="+popupY+", scrollbars = yes, location = no";
    var myWindow = window.open(url, name, option);
    localStorage.setItem('editCourse', course) //수정할 과목 이름 저장
}

function editBtn() {
    console.log('누름')
    var old = localStorage.getItem('editCourse'); //수정할 과목이름 저장
    var title = document.getElementById("course_title").value;
    var professor = document.getElementById("professor_name").value;
    var location = document.getElementById('course_link_url').value;
    var ctype = document.getElementsByName("course_type");
    console.log('누름2')
    if (old == null) //수정할 과목 없으면 저장X
        return ;
        console.log('누름10')
    var course_type;
    for (var i=0; i<ctype.length; i++) {
        if (ctype[i].checked == true) {
            course_type = ctype[i].value;
        }
    }
    console.log('누름3')
    //입력 잘 되었나 확인
    if (!title) {
        alert('과목이름을 입력해주세요');
        document.getElementById("course_title").focus();
        return;
    }
    if (!professor) {
        alert('교수명을 입력해주세요');
        document.getElementById("professor_name").focus();
        return;
    }
    if (timelist.length < 1) {
        alert('+ 버튼을 눌러 강의 시간을 추가해주세요');
        return;
    }
    if (!location) {
        alert('강의링크(강의실)를 입력해주세요');
        document.getElementById("course_link_url").focus();
        return;
    }
    console.log('누름4')
    var course = {
        title : title,
        professor : professor,
        time : timelist, //과목 시간 담은 리스트
        type : course_type, //과목 타입(online_realtime,online_video,offline)
        location : location //강의실/강의링크
    };
    console.log('누름5')
    modifyCourse(course); //변경사항 적용
    setTimeout(function(){ //테스트용 2초 딜레이
        alert('asdf');
        window.close(); //창 닫기
    }, 200000000);
    //opener.parent.location.reload(); //부모창 새로고침
    ///window.close(); //창 닫기
}


function modifyCourse(course) { //해당 과목 정보 변경하기 
    var title = localStorage.getItem('editCourse');
    var username = localStorage.getItem('username'); //현재 로그인된 사용자 이름 가져오기
    activeUser = getActiveUser(username);  //사용자 이름으로 activeUser의 정보 가져와서 프로필 상태로 띄워줌
    var courselist = activeUser.course;
    for (var i=0; i<courselist.length; i++) {
        if (courselist[i].title === title) { //해당 데이터 삭제
            console.log('찾음! 수정할 과목:'+courselist[i].title);
            courselist.splice(i,1,course); //i번째 과목 데이터 하나를 변경사항으로 교체
        }
    }
    localStorage.removeItem('editCourse'); //변경 완료한 것은 삭제
    console.log('--잘 변경되었나 확인--')
    console.info(courselist);
    // for (var i=0; i<courselist.length; i++) {
    //     console.log(courselist[i].title);
    //     console.log(courselist[i].professor);
    // }
}

function deleteCourse(title) { //해당 과목이름을 가진 과목을 DB에서 삭제하기
    var username = localStorage.getItem('username'); //현재 로그인된 사용자 이름 가져오기
    activeUser = getActiveUser(username);  //사용자 이름으로 activeUser의 정보 가져와서 프로필 상태로 띄워줌
    var courselist = activeUser.course;
    for (var i=0; i<courselist.length; i++) {
        if (courselist[i].title === title) { //해당 데이터 삭제
            console.log('찾음! 삭제할 과목:'+courselist[i].title);
            courselist.splice(i, 1); //i번째 인덱스를 하나 삭제
        }
    }
    console.log('--잘 삭제되었나 확인--')
    console.info(courselist);
    // for (var i=0; i<courselist.length; i++) {
    //     console.log(courselist[i].title);
    // }
}

