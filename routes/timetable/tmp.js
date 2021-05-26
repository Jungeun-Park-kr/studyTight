function getCourses(course) { //파라미터:courselist
    var tbody = window.document.getElementById('course_table_body'); //table body 가져오기
    for(var i=0; i<course.length; i++) { //과목 개수만큼 반복하기
        var nrow = tbody.insertRow(-1); //제일 하단에 추가
        var ncell1 = nrow.insertCell(0); //과목명 셀
        var ncell2 = nrow.insertCell(1); //시간 셀 (요일 시작시간-끝시간)
        var ncell3 = nrow.insertCell(2); //강의 방식 셀 (온라인실시간/온라인동영상/오프라인-강의실명)
        var ncell4 = nrow.insertCell(3); //교수명 셀
        var ncell5 = nrow.insertCell(4); //수정버튼
        var ncell6 = nrow.insertCell(5); //삭제버튼

        ncell1.innerHTML = course[i].course_name; 
        var timetext="";
        //console.log(timetext);
        for (var j=0; j<course[i].schedules.length; j++) { //과목 시간 리스트
            var text = courseDay(course[i].schedules[j].day) +' '+ course[i].schedules[j].start_time +'-'+ course[i].schedules[j].end_time;
            timetext = timetext + text + '\n';
        }
        //console.log(timetext);
        ncell2.innerHTML = timetext;
        ncell3.innerHTML = courseType(course[i].course_type, course[i].classroom);
        ncell4.innerHTML = course[i].professor_name;
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
        case 'sat':
            return "토요일";
    }
}

function courseType(type, classroom) { //과목 타입(online_realtime,online_video,offline)
    switch (type) {
        case 'online_realtime':
            return '온라인 실시간';
        case 'online_video':
            return '온라인 동영상';
        case 'offline': //오프라인이면 강의실을 리턴
            return classroom;
    }
}
