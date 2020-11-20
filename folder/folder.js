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
        var link=window.open();
        link.location="http://www.profibus.co.kr/data/Pid.pdf";
     

    }
    else if(goto=='shell'){
        var link=window.open();
        link.location="https://jhnyang.tistory.com/57";
    }
    else if(goto=='scheduler'){
        var link=window.open();
        link.location="https://k39335.tistory.com/32";
    }
}
function PostItContent(title){
        alert("내용을 클릭했습니다.");
}
function PostItFile(){
    alert("저장된 파일로 접근합니다.");
}
function plusTodo(){
    alert("할 일을 추가합니다");
}
function btnHome(){
    location.replace("../mainframe.html");
}
function logout(){
    location.replace("../login/login.html")
}