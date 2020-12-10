// function uploadLink(){
//     var new_name=document.getElementById("input_text").value;
//     var new_link=document.getElementById("input_content").value;

//     console.log(new_name,new_link); //해당 이름과 링크가 찍힘
    

//     var username=localStorage.getItem('username');
//     activeUser=getActiveUser(username);

// }
var refer=document.referrer;
////console.log(refer);
var link=refer.split("=");
//console.log(link[1]);
var order=link[1]
function uploadLink(){
    var username=localStorage.getItem('username');
        activeUser=getActiveUser(username)
    var new_name=document.getElementById("input_text").value
    var new_link=document.getElementById("input_link").value
    //alert("올리기 버튼을 눌렀습니다.");
    ///console.log(new_name, new_content);


    var new_content={
        title:new_name,
        type: "link",
        url: new_link
    }

   // console.log("아니 넣을 몇번째 폴더인지"+order)
    activeUser.folder[order].postIt.push(new_content)

    console.info(activeUser.folder[order])
            //저장되었다고 보여짐. 단지 팝업을 닫으면 추가는 안된다.
}