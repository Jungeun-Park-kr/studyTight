function selectdate(){
    var day=prompt("끝낼 날을 입력하세요","YYYY-MM-DD");

    var today=new Date();
    var futureDate=new Date(day);

    var gap=futureDate.getTime()-today.getTime();
    gap=Math.floor(gap/(1000*60*60*24))+1;

    var dday=document.getElementById("d-date");
    dday.setAttribute('value',"D-"+gap)

    return gap
}

function selectContent(){
        content=prompt("D-day 내용을 입력하세요","ex)웹 공부하기");
        dContent=document.getElementById("d-content")
        dContent.setAttribute('value',content)
    return content
    }      
function storeDday(){
//    var Dday=document.getElementById('.d-date');
//    var Dcontent = document.getElementById('.d-content');

//    var day=Dday.getAttribute(value);
//    var content=Dcontent.getAttribute(value);

    localStorage.setItem('d-date',selectdate());
    localStorage.setItem('d-content',selectContent());

    //저장완료. 근데 등록버튼을 먼저 눌러야 실행된다.

    return plusDday(localStorage.getItem('d-date'),localStorage.getItem('d-content'));

}
function plusDday(new_date, new_content){
    
}

function modifyDday(dday){

}
function deleteDday(){
    var eventTarget=document.getElementsByClassName('btn_delete_d-day');

   // for(var i=0; i < eventTarget.length; i++){
    //    var d=eventTarget[i];
        var parent=document.getElementById('table_body');
        parent.removeChild(eventTarget.parentElement.parentElement);
        // i++;
        //다 똑같은 d를 가질까.. 흠.. 삭제는 골라서는 안되고 전체가 삭제된다.
       // }
}
