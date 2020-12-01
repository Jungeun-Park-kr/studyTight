// const stroageInput=document.querySelector(); //stroage에 넣을 것 class이름을 넣으면 된다
// const text=document.querySelector();
// const button=document.querySelector('.btnplusTodo'); //해당 button의 class 넣음

// stroageInput/addEventListener('input',letter => {text.textContent=letter.target.value;})

// const saveToLocalStorage=()=>{localStorage.setItem('todolist',text.textContent)}

// button.addEventListener('click',saveToLocalStorage); //button클릭하면 local로 저장하기
// const storedInput=localStorage.getItem('todolist'); //local에 저장한 것 불러오기
function plusTodo(){
        var text=window.prompt("오늘의 할일을 입력하세요","ex) 웹 공부하기");
        var wrap=document.getElementById('todaylist');
        if(text!=null){
                var new_checkbox=document.createElement('input');
                new_checkbox.setAttribute('type','checkbox');
                new_checkbox.setAttribute('id','new_checkbox')
                
                var new_p=document.createElement('p');
                new_p.innerHTML=text;
                
                var new_label=document.createElement('label');
                new_label.setAttribute('for','new_checkbox');
                new_label.innerText=new_p;
                wrap.appendChild(new_label);

                // var new_todo=document.createElement("input");
                // new_todo.setAttribute("type","checkbox");
                // new_todo.setAttribute("id","new_todo");
                // new_todo.setAttribute("value",text);
                
                // var new_label=document.createElement('label');
                // new_label.setAttribute('for','new_todo'); //해당 checkbox id
                
                // wrap.appendChild(new_label);
                
                        //일단 안된다 ,,
}
}
function starClicked(){
        document.getElementById("star").src="/media/full_star.png";
//하나만 적용된다 ㄱ-
}
function newFolder(){
        alert("폴더 추가하기 버튼을 눌렀습니다");
}

function getRealtimeCourse(course) {
        var type, tmptime, day, st, sh, sm;
        var date = new Date();
        // var curday = 1; //테스트용 시간 (웹프로그래밍기초및실습 나오면 정상)
        // var curhour = 12;
        // var curmin = 40; 
        var curday = date.getDay(); 
        var curhour = date.getHours();
        var curmin = date.getMinutes();
        console.log ('현재 요일:'+curday +' 시간:'+curhour+'분:'+curmin);
        var cur = (curhour*3600)+(curmin*60); //현재시간 초단위로 변환
        console.log(cur);
        for(var i=0; i<course.time.length; i++) {
                tmptime = course.time[i];
                day = dayStrToNum(tmptime.day); //요일을 번호로 바꿔서 저장
                console.log('day숫자:'+day);
                st = tmptime.stime.split(':');
                sh = Number(st[0]); 
                sm = Number(st[1]);
                console.log('sh,sm'+sh+sm);
                if (day == curday) { //요일 비교
                        console.log('요일동일');
                        var cortime = (sh*3600)+(sm*60); //시작시간 초단위로 변환
                        console.log(course);
                        var gap = cortime - cur; //남은시간 계산
                        console.log('gap'+gap);
                        if (gap >=0 && gap <= 1800) { //30분 이내에 수업이 있는 경우
                                type = getCourseType(course.type, course.location);
                                return (tmptime.stime+' '+course.title+' '+type); //시작시간 과목이름 과목종류 리턴
                        }
                }
        }
        return null;
}

function getCourseType(type, location) { //과목 타입(online_realtime,online_video,offline)
        switch(type) {
                case 'online_realtime':
                        return "온라인 실시간";
                case 'online_video':
                        return "온라인 동영상";
                case 'offline': //오프라인이면 강의실 리턴
                        return location;
        }
}
function dayStrToNum(day) {
        switch(day) {
                case 'mon':
                        return 1;
                case 'tue':
                        return 2;
                case 'wed':
                        return 3;
                case 'thu':
                        return 4;
                case 'fri':
                        return 5;
        }
}
