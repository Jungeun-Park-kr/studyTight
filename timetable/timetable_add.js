// 아래는 OS 화면 기준으로 중앙에 팝업 띄움
// var fullWidth = window.screen.width;
// var fullHeight = window.screen.height;
// function showTimetableAddPopup() {
//     var popupWidth = 600;
//     var popupHeight = 800;
//     var popupX = (fullWidth/2) - (popupWidth/2);
//     var popupY = (fullHeight/2) - (popupHeight/2);

//     var url = "timetable_edit.html";
//     var name = "timetable edit popup"
//     var option = "width ="+popupWidth+", height ="+popupHeight+", left"+popupX+", top="+popupY+", scrollbars = yes, location = no";
//     window.open(url, name, option);
// }
// 아래는 브라우저 창 크기 기준으로 중앙에 팝업 띄움
function showTimetableAddPopup() {
    var popupWidth = 600;
    var popupHeight = 800;
    var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
    var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
    var url = "timetable_edit.html";
    var name = "timetable edit popup"
    var option = "width ="+popupWidth+", height ="+popupHeight+", left"+popupX+", top="+popupY+", scrollbars = yes, location = no";
    window.open(url, name, option);
}