// function uploadFile(){
//     var new_text=document.getElementById("input_text").value; //해당 제목 가져오기
//     var new_file=document.getElementById('input_file').value; //해당 파일 위치 가져오기?
//     var new_div=document.createElement('div');
    
//     console.log(new_text, new_file); // 파일 위치를 가져온다.

    

//     //파일 이름이 같으면 그 파일을 보여주기. 
// }
var refer=document.referrer;
//console.log(refer);
var link=refer.split("=");
//console.log(link[1]);
var order=link[1]
function uploadFile(){
    var username=localStorage.getItem('username');
activeUser=getActiveUser(username)
    var new_name=document.getElementById("input_text").value
    var new_file=document.getElementById("input_file").value
    //alert("올리기 버튼을 눌렀습니다.");
    ///console.log(new_name, new_content);


    var new_content={
        title:new_name,
        type: "file",
        url: new_file
    }

    
    activeUser.folder[order].postIt.push(new_content)

    console.info(activeUser.folder[order])
            //저장되었다고 보여짐. 단지 팝업을 닫으면 추가는 안된다.
}