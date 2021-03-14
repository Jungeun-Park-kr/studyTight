function newPostIt(){
    //파일, 내용 , 링크 저장하는 팝업창
    var popupWidth = 400;
    var popupHeight = 300;
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