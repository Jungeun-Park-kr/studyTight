function btnHomeInHome() { //홈에서 누른경우 그냥 새로고침 해주면 됨
    location.reload(); //새로고침
}
function btnHome() {
    location.replace("mainframe.html"); //홈 주소 //뒤로가기불가
    //location.href("#"); //뒤로가기 가능
}
function btnContact() {
    location.reload("guestbook/guestbook_myroom.html"); //방명록 주소
}
function btnTimetable() {
    location.replace("timetable/timetable_main.html"); //시간표 주소
}
function btnDday() {
    var popupWidth = 600;
    var popupHeight = 800;
    var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
    var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
    var url = "#"; //d-day 팝업 주소
    var name = "D-day edit popup"
    var option = "width ="+popupWidth+", height ="+popupHeight+", left="+popupX+", top="+popupY+", scrollbars = yes, location = no";
    window.open(url, name, option);
}
function btnplustodo(){
    var newtodo=prompt("오늘 할 일을 입력하세요.");
    // document.write("할 일 추가 내용은 "+newtodo); 추가한 부분을 보이는 것에 대해서 더 생각해야겠음
}
