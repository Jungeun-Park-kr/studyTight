function btnHome() {
    location.replace("/mainframe.html"); //홈 주소 //뒤로가기불가
    //location.href("#"); //뒤로가기 가능
    // var fname = localStorage.getItem('friendName');
    // if (fname != null) { //페이지 빠져나가기 전에 방문한 친구 이름 삭제
    //     localStorage.removeItem('friendName'); 
    // }
}

function btnContact() {
    location.replace("/guestbook/guestbook_myroom.html"); //방명록 주소
    // var fname = localStorage.getItem('friendName');
    // if (fname != null) { //페이지 빠져나가기 전에 방문한 친구 이름 삭제
    //     localStorage.removeItem('friendName'); 
    // }
}

function btnTimetable() {
    location.replace("timetable/timetable_main.html"); //시간표 주소
    // var fname = localStorage.getItem('friendName');
    // if (fname != null) { //페이지 빠져나가기 전에 방문한 친구 이름 삭제
    //     localStorage.removeItem('friendName'); 
    // }
}

function btnfriends() {
    location.href="/guestbook/friends/friends_room.html"; //홈 주소 //뒤로가기불가
    //location.href("#"); //뒤로가기 가능
    //localStorage.setItem('friendName', 접속하는 친구 이름); //파라미터로 받아와서 여기서 접속하는 친구이름 등록해주기
}

function btnDday() {
    var popupWidth = 600;
    var popupHeight = 800;
    var popupX = (document.body.offsetWidth / 2) - (popupWidth / 2);
    var popupY = (document.body.offsetHeight / 2) - (popupHeight / 2);
    var url = "d-day.html"; //d-day 팝업 주소
    var name = "D-day edit popup"
    var option = "width =" + popupWidth + ", height =" + popupHeight + ", left=" + popupX + ", top=" + popupY + ", scrollbars = yes, location = no";
    window.open(url, name, option);
}