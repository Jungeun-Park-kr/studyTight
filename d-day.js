function selectdate(){
    // 캘린더를 가져와서 그에 대한 남은 날짜를 계산해서 return해야 함
    // 그냥 이걸 inputtext로 해서 YYYY-MM-DD 이렇게 해서 남은 날을 계산하는 게 나을 수도?
    //var countDownDate = new Date("May 9, 2017 06:00:00").getTime(); //1초마다 갱신되도록 함수 생성,실행 
    //var x = setInterval(function() { // 오늘 날짜 등록 
    // var now = new Date().getTime(); // 종료일자에서 현재일자를 뺀 시간 
    // var distance = countDownDate - now; // 각 변수에 일, 시, 분, 초를 등록 
    // var d = Math.floor(distance / (1000 * 60 * 60 * 24)); 
    // var h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
    // var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); 
    // var s = Math.floor((distance % (1000 * 60)) / 1000); //id가 d-day인 HTML코드에 내용 삽입 
    // document.getElementById("d-day").innerHTML = "디데이까지 " + d +"일 " + h + "시간 " + m + "분 " + s + "초 남았습니다."; 
    alert("날짜를 골르세요.");
}
function storeDday(day,content){
    //해당 디데이와 내용을 저장함...
    alert("D-day를 저장하였습니다.");
}
function modifyDday(dday){
    //해당 디데이를 수정해야 함
    alert("D-day를 수정하였습니다");
}
function deleteDday(dday){
    //해당 디데이를 없애기 이거는 그냥 invisible하게 만들어서
    //안보이게 만들면 될 듯
    alert("D-day를 삭제하였습니다");
}