var doc = document;

// window.onload = function(){
//     var type = 1;
//     var text = doc.getElementById("shortcuts_title"); //바로가기 텍스트
//     var link = doc.getElementById("shortcuts_link"); //바로가기 링크 텍스트
//     $("#now").text(new Date()); //현재 시간 가져오기
//     //시간표에서 데이터 가져와 실시간 강의 있는지 확인
//     //in here
//     // type 저장
//     //
//     doc.getElementById("shortcuts_title").innerHTML="현재 시간표에 등록된 일정이 없습니다";

//     switch (type) {
//         case 1: //온라인 강의인 경우
//         link.style.color="mediumblue";
//         link.style.textDecoration="underline";
//         $("#shortcuts_title").attr("href", "#"); //href로 속성 변경
//         onclick="location.href='#'";
//         $('.shortcuts_title').text('현재 시간표에 등록된 일정이 없습니다');
//         break;

//         case 2: //오프라인 강의인 경우
//         link.style.color="#999";
//         link.style.textDecoration="none";
//         $('.shortcuts_title').text('10:30 OS(라) 오프라인 수업');
//         break;

//         case 3:  //실시간 강의 없는 경우
//         default : //none과 동일
//         link.style.color="#999";
//         link.style.textDecoration="none"
//         $('.shortcuts_title').text('현재 시간표에 등록된 일정이 없습니다');
//         break;
//     }
    
// }