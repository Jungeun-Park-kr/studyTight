
function showFriendTimetable() { //친구의 시간표 정보 공개여부 확인
    var friend;
    var fname = localStorage.getItem('friendName'); //친구 이름 가져오기
    console.log(fname);
    //var fname = "최시언"; //테스트용 최시언
    if (fname != null) {
        friend = getActiveUser(fname); //친구 정보 가져오기
        console.info(friend);
        //친구의 시간표 공개/비공개 여부 확인
        var isSecret = friend.guestbook.profile.profilesecret;
        if (isSecret) {
             //비공개인 경우 : (시간표 보기 버튼 누르면 친구 방명록 메인(friends_room.html)에서 팝업으로 비공개한 회원입니다 띄우기)
            alert('시간표를 비공개한 회원입니다.');
        }
        else { //공개인 경우
            location.replace("/guestbook/friends/friends_timetable.html"); //시간표 주소
        }
        
    }
}

function showFriendCourse(title, timelist) {
    //입력받은 정보로 시간표 출력하기
    var tdid, st, et, sh, sm, eh, em;
    var color, tmpvar;
    color = getColor();
    for(var i=0; i<timelist.length; i++) {
        tmptime = timelist[i];
        //요일 및 색깔지정
        //color = getDayColor(tmptime.day);
        //시작시간
        st = tmptime.stime.split(':');
        sh = parseInt(st[0]); //시는 바로 입력
        sm = getMinuteId(parseInt(st[1]));
        //종료시간
        et = tmptime.etime.split(':');
        eh = parseInt(et[0]);
        em = getMinuteId(parseInt(et[1]));
        //시작시간 id만들기 및 속성적용
        tdid = 'f'+tmptime.day+sh+'.'+sm;
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
            if (sh > eh) { //종료조건 확인
                //console.log('종료조건1');
                break;
            }
            else if(sh == eh) {
                if (sm >= em) {
                    //console.log('종료조건2');
                    break;
                }
            }
            tdid = 'f'+tmptime.day+sh+'.'+sm;
            tmpvar = document.getElementById(tdid);
            if(sm==4) { //border 없애기
                tmpvar.style.borderStyle="";
            }
            tmpvar.style.backgroundColor = color;
        }
    }
}

