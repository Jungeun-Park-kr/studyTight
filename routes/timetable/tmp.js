
function showCourse(title, timelist) {
    //입력받은 정보로 시간표 출력하기
    var tdid, st, et, sh, sm, eh, em;
    var color, tmpvar;
    color = getColor();
    for(var i=0; i<timelist.length; i++) {
        tmptime = timelist[i];
        //요일 및 색깔지정
        //color = getColor(tmptime.day);
        //시작시간
        st = tmptime.start_time.split(':');
        sh = parseInt(st[0]); //시는 바로 입력
        sm = getMinuteId(parseInt(st[1]));
        //종료시간
        et = tmptime.end_time.split(':');
        eh = parseInt(et[0]);
        em = getMinuteId(parseInt(et[1]));
        //시작시간 id만들기 및 속성적용
        tdid = tmptime.day+sh+'.'+sm;
        //console.log(title+tdid);
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
            //console.log(tmptime.day);
            tdid = tmptime.day+sh+'.'+sm;
            //console.log(title+tdid);
            tmpvar = document.getElementById(tdid);
            if(sm==4) { //border 없애기
                tmpvar.style.borderStyle="";
            }
            tmpvar.style.backgroundColor = color;
        }
    }
}
function getColor() {
    // var color = '#'+Math.round(Math.random()*0xffffff).toString(16);
    // return color;
    var rand = Math.random();
    rand = Math.floor(rand*19);
    switch(rand) {
        case 0:
            return "lightpink";
        case 1:
            return"lightsalmon";
        case 2:
            return "lightsteelblue";
        case 3:
            return "lightyellow";
        case 4:
            return "mediumaquamarine";
        case 5:
            return "lightgray";
        case 6:
            return "thistle";
        case 7:
            return "paleturquoise";
        case 8:
            return "yellowgreen";
        case 9:
            return "peachpuff";
        case 10:
            return "wheat";
        case 11:
            return "palegreen";
        case 12:
            return "moccasin";
        case 13:
            return "mistyrose";
        case 14:
            return "oldlace";
        case 15:
            return "palegoldenrod";
        case 16:
            return "palegreen";
        case 17:
            return "paleturquoise";
        case 18:
            return "palevioletred";
    }
}
function getDayColor(day) {
    switch(day) {
        case 'mon':
            return "lightpink";
        case 'tue':
            return"lightsalmon";
        case 'wed':
            return "lightsteelblue";
        case 'thu':
            return "lightyellow";
        case 'fri':
            return "lightseagreen";
        default :
        return "lightgray";
    }
}

function getMinuteId(min) { //분은 케이스 나누기
    switch (min) { 
        case 0:
            return 1;
        case 15:
            return 2;
        case 30:
            return 3;
        case 45:
            return 4;
        default :
            return 1;
    }
}