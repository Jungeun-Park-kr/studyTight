function selectdate(){
    var day=prompt("끝낼 날을 입력하세요","YYYY-MM-DD");

    var today=new Date();
    var futureDate=new Date(day);

    var gap=futureDate.getTime()-today.getTime();
    gap=Math.floor(gap/(1000*60*60*24))+1;
   
    var dday=document.getElementById("d-date");
    dday.innerHTML="D-"+gap;
    //화면에 나오는 게 안나온다.
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
//디데이 색 관련해서도 함수를 만들어야 할 듯?
//mainframe에 보이는 디데이 관련해서