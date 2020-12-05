// const stroageInput=document.querySelector(); //stroage에 넣을 것 class이름을 넣으면 된다
// const text=document.querySelector();
// const button=document.querySelector('.btnplusTodo'); //해당 button의 class 넣음

// stroageInput/addEventListener('input',letter => {text.textContent=letter.target.value;})

// const saveToLocalStorage=()=>{localStorage.setItem('todolist',text.textContent)}

// button.addEventListener('click',saveToLocalStorage); //button클릭하면 local로 저장하기
// const storedInput=localStorage.getItem('todolist'); //local에 저장한 것 불러오기
function plusTodo(){
        var new_label=document.createElement('label');
        var wrap=document.getElementById('todaylist')
        var new_text=window.prompt("오늘의 할일을 입력하세요","");
        var new_checkbox=document.createElement('input');
        var new_p=document.createElement('label');

        new_p.innerHTML=new_text;


        new_checkbox.setAttribute('type','checkbox');
        new_checkbox.setAttribute('id','new_checkbox');


        new_label.appendChild(new_checkbox);
        new_label.appendChild(new_p);

        wrap.appendChild(new_label);  
        
        new_label.className="new_todo"
                //완성 ㅎㅎ
}
function starClicked(order){
        //document.getElementById("star").src="/media/full_star.png";
        var star=document.getElementsByClassName('star');

        star[order].src="media/full_star.png"
       // if(star[order].mark=='true'){
                //별을 통해서 감싼 div를 찾고 그것의 순서를 바꿔야 함..
                //근데 어떻게 하는지 모름
      //  }
        //이거를 star된 걸 1로 설정해서 값에 넣어서 순서대로 보이게 해야하는데 어떻게 해야 할 지 모름
        //일단 empty_star되는 것도 코드를 짰는데 왜인지 안돼서 일단 없앰.
}
function newFolder(){
       var new_name=prompt("폴더 이름을 입력하세요","");
         var new_div=document.createElement('div');

        var origin_div=document.getElementById('wrap_folder');
        //append로 안함
        var before_div=document.getElementById('folder_1');

        //별 넣기
        new_star=document.createElement('img');
        new_star.setAttribute('id','new_star');
        new_star.src="media/empty_star.png"
        new_star.style.float="left";
        new_star.style.margin="5px";
        new_star.style.width="25px";
        new_star.style.height="auto";
        new_star.style.dispaly="inline";
        new_star.setAttribute('onclick',"newClicked();")

        var new_p=document.createElement('p');
        new_p.innerHTML=new_name;

        new_div.setAttribute('class','new_div');
        new_div.append(new_star);
        new_div.append(new_p);

        origin_div.insertBefore(new_div,before_div);

        return new_star;

}
function newClicked(){
        var star=document.getElementById('new_star');
        star.src="media/full_star.png"
}

function getRealtimeCourse(course) {
        var type, tmptime, day, st, sh, sm, et, eh, em;
        var date = new Date();
        // var curday = 1; //테스트용 시간 (웹프로그래밍기초및실습 나오면 정상)
        // var curhour = 12;
        // var curmin = 46; 
        var curday = date.getDay(); 
        var curhour = date.getHours();
        var curmin = date.getMinutes();
        console.log ('현재 요일:'+curday +' 시간:'+curhour+'분:'+curmin);
        var cur = (curhour*3600)+(curmin*60); //현재시간 초단위로 변환
        console.log(cur);
        for(var i=0; i<course.time.length; i++) {
                tmptime = course.time[i];
                day = dayStrToNum(tmptime.day); //요일을 번호로 바꿔서 저장
                st = tmptime.stime.split(':'); //시,분으로 나누기
                sh = Number(st[0]); //시작 시
                sm = Number(st[1]); //시작 분
                console.log('종료시간'+tmptime.etime);
                et = tmptime.etime.split(':');
                eh = Number(et[0]); //종료 시
                em = Number(et[1]); //종료 분
                if (day == curday) { //요일 비교
                        var starttime = (sh*3600)+(sm*60); //시작시간 초단위로 변환
                        var endtime = (eh*3600)+(em*60);
                        //var classtime = endtime-starttime; //수업 시간 계산
                        console.log(course);
                        var gap = starttime - cur; //수업 시작까지 남은시간 계산
                        console.log('gap'+gap);
                        if (gap >=0 && gap <= 1800) { //30분 이내에 수업이 있는 경우
                                type = getCourseType(course.type, course.location);
                                return (tmptime.stime+' '+course.title+' '+type); //시작시간 과목이름 과목종류 리턴
                        }
                        else if (starttime <= cur && cur <= endtime) { //수업이 종료될 때 까지 계쏙 띄워두기
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
