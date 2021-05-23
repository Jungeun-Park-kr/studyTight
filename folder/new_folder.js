function newPostIt(){
    //파일, 내용 , 링크 저장하는 팝업창
    // var popupWidth = 400;
    // var popupHeight = 180;
    // var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
    // var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
    // var url = "new_choice.html"; 
    // var name = "plus postIt"
    // var option = "width ="+popupWidth+", height ="+popupHeight+", left="+popupX+", top="+popupY+", scrollbars = yes, location = no";
    // window.open(url, name, option);

        // var modal_postIt = document.querySelector(".modal_postIt"); // 팝업 될 레이어 class명
        // var trigger_postIt = document.querySelector("#postIt_plus"); // 가입하기 버튼
        // var closePostItButton = document.querySelector(".close_postIt_button");  // 우측 상단 닫기 버튼
        // function togglePostItModal() {
        //     modal_postIt.classList.toggle("show_modal");
        //     }
        // function windowOnClick(event) {
        //     if (event.register === modal_postIt) {
        //         togglePostItModal();
        //                     }}
        // trigger_postIt.addEventListener("click", togglePostItModal);
        // closePostItButton.addEventListener("click", togglePostItModal);
        // window.addEventListener("click", windowOnClick);
}
function choice(index){
    //0-2가 글, 링크, 파일 순으로 되어있음
    if(index==0){
        
        var popupWidth = 400;
        var popupHeight = 1000;
        var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
        var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
        var url = "new_content.html"; 
        var name = "plus link"
        var option = "width ="+popupWidth+", height ="+popupHeight+", left="+popupX+", top="+popupY+", scrollbars = yes, location = no";
        window.open(url, name, option);
    }
    else if(index==1){
        
        var popupWidth = 400;
        var popupHeight = 300;
        var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
        var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
        var url = "new_link.html"; 
        var name = "plus link"
        var option = "width ="+popupWidth+", height ="+popupHeight+", left="+popupX+", top="+popupY+", scrollbars = yes, location = no";
        window.open(url, name, option);
    }
    else{ //index==2
        
        var popupWidth = 400;
        var popupHeight = 300;
        var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
        var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
        var url = "new_file.html"; 
        var name = "plus link"
        var option = "width ="+popupWidth+", height ="+popupHeight+", left="+popupX+", top="+popupY+", scrollbars = yes, location = no";
        window.open(url, name, option);
    }
}
function showPostMenu(index){
    //나중에 index로 받아서 처리하기
    var dropdown=document.getElementsByClassName('dropdown_content')[index];
    

    $(`#dropdown-content${index}`).show();
  //  $(`#dropwdown-content${index}`).attr('data-value','open');
    
    $(`#revise_post${index}`).text("수정하기");
    $(`#revise_post${index}`).show();
    $(`#delete_post${index}`).text("삭제하기");
    $(`#delete_post${index}`).show();

    dropdown.setAttribute('data-value','open')
    var value=dropdown.getAttribute('data-value');
    console.log("지금 클릭된 것의 index:"+index+", value="+value);
}

function hidePostMenu(index){
    var dropdown=document.getElementsByClassName('dropdown_content');
    
    // for(i=0;i<dropdown.length;i++){
    //     var value=document.getElementsByClassName('dropdown_content')[i].getAttribute('data-value');
    //     console.log('index:'+i+', value:'+value);
    // if(value=='open'){
        console.log("현재 열린 것의 index:"+index);
        $(`#dropdown-content${index}`).hide();
        $(`#revise_post${index}`).hide();
        $(`#delete_post${index}`).hide();
        dropdown[i].setAttribute('data-value','close');
        console.log("닫힘");

    //}
//}
}
function revisePostClicked(index){
    alert("제목이나 글을 수정하였습니다.");
}
function deletePostClicked(index){
    alert("포스트잇을 삭제하시겠습니까?");
}

// 타켓 영역 제외하고 클릭했을 때 숨김처리
// $('body').on('click',function(e){
//     var tgPoint=$(e.target);
//     var popCallBtn=tgPoint.hasClass(`dropdown-content${index}`)
    
//     if(!popCallBtn){
//         $(`dropdown-cotent${index}`).removeClass('view');
//     }
// });

var star_toggle=1
function starPostClicked(index){
    var postIt=document.getElementsByClassName("class");
    var star=document.getElementsByClassName('fixed_star');
    if(star_toggle%2==1){
        star[index].src="/media/full_star.png"
        star[index].style.opacity=1;
    }else{
        star[index].src="/media/empty_star.png"
        star[index].style.opacity=0;
        
        // hover할 때만 있도록 설정해야 함.
    }
    star_toggle++;
}
function uploadTodo(){
    var str=$('#input_todo').val();
    console.log(str);
    $('#plusTodoModal').modal('hide');
    
}
function cancelClicked(){
    $('.modal').modal('hide');
}
function uploadContent(){
    var title=$('#input_content_title').val();
    var title_type=$('#input_content_title').attr('name');
    var content_type=$('#input_content').attr('name');
    var content=$('#input_content').val();
    console.log(title_type+":"+title);
    console.log(content_type+":"+content);

    $('.modal').modal('hide');
}
function uploadLink(){
    $('.modal').modal('hide');
}
function uploadFile(){
    $('.modal').modal('hide');
}