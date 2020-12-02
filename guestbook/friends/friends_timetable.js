function showFriendTimetable() {
    //친구의 시간표 정보 공개여부 확인
    var isSecret = false;
    if (isSecret) { //비밀인 경우
        alert('시간표를 비공개한 회원입니다.');
    }
    else {
        location.replace("/guestbook/friends/friends_timetable.html"); //시간표 주소
    }
}

function showFriendCourse(title, timelist) {
    //입력받은 정보로 시간표 출력하기
    var tdid, st, et, sh, sm, eh, em;
    var color, tmpvar;
    for(var i=0; i<timelist.length; i++) {
        tmptime = timelist[i];
        //요일 및 색깔지정
        color = getDayColor(tmptime.day);
        //시작시간
        st = tmptime.stime.split(':');
        sh = st[0]; //시는 바로 입력
        sm = getMinuteId(st[1]);
        //종료시간
        et = tmptime.etime.split(':');
        eh = et[0];
        em = getMinuteId(et[1]);
        //시작시간 id만들기 및 속성적용
        tdid = 'f'+tmptime.day+sh+'.'+sm;
        console.log(tdid);
        tmpvar = document.getElementById(tdid);
        tmpvar.innerHTML=title; //첫줄에는 과목이름
        tmpvar.style.backgroundColor=color;
        
        //시간 더해가면서 id 만들기 및 속성적용
        while(1) {
            sm++;
            if (sm == 5) {
                sh++;
                sm = 1;
            }
            if (sh >= eh) { //종료조건 확인
                if (sm >= em) { 
                    break;
                }
            }
            console.log(tmptime.day);
            tdid = 'f'+tmptime.day+sh+'.'+sm;
            console.log(tdid);
            tmpvar = document.getElementById(tdid);
            if(sm==4) { //border 없애기
                tmpvar.style.borderStyle="";
            }
            tmpvar.style.backgroundColor = color;
        }
    }
}

