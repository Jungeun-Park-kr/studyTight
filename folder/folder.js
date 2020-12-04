//각 홈페이지를 만들어야 하나?
// https://stackoverrun.com/ko/q/3898207 과목명 불러올 때 참고하기
function newPostIt(){
    //파일, 내용 , 링크 저장하는 팝업창
    var popupWidth = 400;
    var popupHeight = 300;
    var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
    var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
    var url = "pluspostit.html"; 
    var name = "plus postIt"
    var option = "width ="+popupWidth+", height ="+popupHeight+", left="+popupX+", top="+popupY+", scrollbars = yes, location = no";
    window.open(url, name, option);
}
function PostItLink(goto){
    if(goto=='pid'){
        // var link=window.open();
        // link.location="http://www.profibus.co.kr/data/Pid.pdf";
     

    }
    else if(goto=='shell'){
        // var link=window.open();
        // link.location="https://jhnyang.tistory.com/57";
    }
    else if(goto=='scheduler'){
        // var link=window.open();
        // link.location="https://k39335.tistory.com/32";
    }
}
function PostItContent(title){
    var popupWidth = 400;
    var popupHeight = 300;
    var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
    var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
    //var url = "pluspostit.html"; 
    //var name = "plus postIt"
    var option = "width ="+popupWidth+", height ="+popupHeight+", left="+popupX+", top="+popupY+", scrollbars = yes, location = no";
    window.open(url, name, option);
}
function PostItFile(){
    alert("저장된 파일로 접근합니다.");
}
function plusTodo(){
    var new_label=document.createElement('label');
    var wrap=document.getElementById('Todolist')
    var new_text=window.prompt("할 일 목록을 채우세요","");
    var new_checkbox=document.createElement('input');
    var new_p=document.createElement('label');

    new_p.innerHTML=new_text;


    new_checkbox.setAttribute('type','checkbox');
    new_checkbox.setAttribute('id','new_checkbox');


    new_label.appendChild(new_checkbox);
    new_label.appendChild(new_p);

    wrap.appendChild(new_label);  
    
    new_label.className="new_folder_todo"
            //완성 ㅎㅎ
}
function btnHome(){
    location.replace("../mainframe.html");
}
function logout(){
    location.replace("../login/login.html")
}
function onEditClicked(order){
    var edit_btn=document.getElementsByClassName("editFolder");
    //img 객체들이 있음 0부터 5까지
    
    var edit_content=prompt("바꿀 포스트잇 이름을 입력하세요","");

    var edit_div=document.getElementById('postIt_1');
    edit_div.innerHTML=edit_content;
    //아직 css부분은 안건들임

}
function ononDeleteClicked(order){

}