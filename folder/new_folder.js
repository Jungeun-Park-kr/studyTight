function newPostIt(){
    //파일, 내용 , 링크 저장하는 팝업창
    var popupWidth = 400;
    var popupHeight = 180;
    var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
    var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
    var url = "new_choice.html"; 
    var name = "plus postIt"
    var option = "width ="+popupWidth+", height ="+popupHeight+", left="+popupX+", top="+popupY+", scrollbars = yes, location = no";
    window.open(url, name, option);
}
function choice(index){
    //0-2가 글, 링크, 파일 순으로 되어있음
    if(index==0){
        window.close();
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
        window.close();
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
        window.close();
        var popupWidth = 400;
        var popupHeight = 300;
        var popupX = (document.body.offsetWidth/2) - (popupWidth/2);
        var popupY = (document.body.offsetHeight/2) - (popupHeight/2);
        var url = "new_link.html"; 
        var name = "plus link"
        var option = "width ="+popupWidth+", height ="+popupHeight+", left="+popupX+", top="+popupY+", scrollbars = yes, location = no";
        window.open(url, name, option);
    }
}
function showPostMenu(index){
    //나중에 index로 받아서 처리하기
    $(`#dropdown-content${index}`).show();
    $(`#revise_post${index}`).text("수정하기");
    $(`#revise_post${index}`).show();
    $(`#delete_post${index}`).text("삭제하기");
    $(`#delete_post${index}`).show();
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
    var star=document.getElementsByClassName('fixed_star');
    if(star_toggle%2==1){
        star[index].src="/media/full_star.png"
        star[index].style.opacity=1;
    }else{
        star[index].src="/media/empty_star.png"
        // hover할 때만 있도록 설정해야 함.
    }
    star_toggle++;
}