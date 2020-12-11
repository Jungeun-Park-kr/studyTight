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
var toggle=1;
function starClicked(order){
        var username=localStorage.getItem('username');
        activeUser=getActiveUser(username);
        //document.getElementById("star").src="/media/full_star.png";
        var star=document.getElementsByClassName('folder_star');
        if(toggle%2==1){
                star[order].src="media/full_star.png"
                activeUser.folder[order].star="false"
        }
        else{
                star[order].src="media/empty_star.png"
                activeUser.folder[order].star="true"
        }
        toggle++;
        //별 완료 ㅎㅎ
        console.info(activeUser.folder[order])
}
// function newFolder(){
//         var new_name=prompt("폴더 이름을 입력하세요","");
//         var new_div=document.createElement('div');

//         var origin_div=document.getElementById('wrap_folder');
//         //append로 안함
//         var before_div=document.getElementById('folder_1');

//         //별 넣기
//         new_star=document.createElement('img');
//         new_star.setAttribute('id','new_star');
//         new_star.src="media/empty_star.png"
//         new_star.style.float="left";
//         new_star.style.margin="5px";
//         new_star.style.width="25px";
//         new_star.style.height="auto";
//         new_star.style.dispaly="inline";
//         new_star.setAttribute('onclick',"newClicked();")

//         var new_p=document.createElement('p');
//         new_p.innerHTML=new_name;
//         new_p.setAttribute("onclick","toNextPage("+6+")")
//         new_div.setAttribute('class','new_div');
//         new_div.append(new_star);
//         new_div.append(new_p);

//         origin_div.insertBefore(new_div,before_div);


//         //return new_star;

// }
var tog=1;
function newClicked(){
        var star=document.getElementById('new_star');
        if(tog%2==0){
                star.src="media/full_star.png"
        }
        else{
                star.src="media/empty_star.png"
        }
        tog++;
        
}

function getRealtimeCourse(course) {
        var type, tmptime, day, st, sh, sm, et, eh, em;
        var date = new Date();
        //현재 시간
        var curday = date.getDay(); 
        var curhour = date.getHours();
        var curmin = date.getMinutes();
        //온라인 - 테스트용 시간 (웹프로그래밍기초및실습 나오면 정상)
        // var curday = 1; //월요일
        // var curhour = 12; //오후 12시
        // var curmin = 46;  //46분
        //오프라인 - 테스트용 시간2 (철학으로만나는기독교 나오면 됨)
        // var curday = 3; //수요일
        // var curhour = 13; //오후 1시
        // var curmin = 40; //40분
        var cur = (curhour*3600)+(curmin*60); //현재시간 초단위로 변환
        for(var i=0; i<course.time.length; i++) {
                tmptime = course.time[i];
                day = dayStrToNum(tmptime.day); //요일을 번호로 바꿔서 저장
                st = tmptime.stime.split(':'); //시,분으로 나누기
                sh = Number(st[0]); //시작 시
                sm = Number(st[1]); //시작 분
                et = tmptime.etime.split(':');
                eh = Number(et[0]); //종료 시
                em = Number(et[1]); //종료 분
                if (day == curday) { //요일 비교
                        var starttime = (sh*3600)+(sm*60); //시작시간 초단위로 변환
                        var endtime = (eh*3600)+(em*60);
                        var gap = starttime - cur; //수업 시작까지 남은시간 계산
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
function toNextPage(order){
        //console.log('order:'+order+typeof(order));
        var username = localStorage.getItem('username');
        var user = getActiveUser(username);
        //console.info(user.folder);
        var folderlist = user.folder;
        var title = folderlist[order].title;
        localStorage.setItem("folder", title); //현재 사용자가 클릭한 폴더 이름 저장
        var that_p=document.getElementsByClassName("folder_course");
        location.href="/folder/folder.html?index="+order
        
}

function refreshToday() {
        var parent_list=document.getElementById("todaylist");

                        var checkbox_length=document.getElementsByClassName("checkbox1")
                        var label_length=document.getElementsByTagName("label")
                        var p_length=document.getElementsByClassName("p_p")
                        //var today=new Date(); 현재 
                        var futureDate=new Date(20,12,13,12,00,00,00);
                        var today=new Date(20,12,14,12,01,00,00); //조작된 시간

                        var gap=today.getTime()-futureDate.getTime();
                        gap=Math.floor(gap/(1000*60*60*24))+1;

                        console.log(gap)

                        console.log(checkbox_length.length)
                        
                        for(var i=0;i<checkbox_length.length;i++){
                        console.log(checkbox_length[i].checked)
                                if(checkbox_length[i].checked)
                                {parent_list.removeChild(label_length[i]);
                        }}

}