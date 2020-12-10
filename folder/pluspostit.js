var refer=document.referrer;
//console.log(refer);
var link=refer.split("=");
//console.log(link[1]);
var order=link[1]
function show_content(){
    location.replace("/folder/pluspostit.html?index="+order);
}
function show_link(){
    location.replace("/folder/pluspostit_link.html?index="+order);
}
function show_file(){
    location.replace("/folder/pluspostit_file.html?index="+order);
}
// function uploadContent(){
//     var username=localStorage.getItem('username');
//     activeUser=getActiveUser(username);
//     var new_name=document.getElementById("input_text").value
//     var new_content=document.getElementById("input_content").value
//     //alert("올리기 버튼을 눌렀습니다.");
//     ///console.log(new_name, new_content);


//     var new_content={ 
//         title:new_name,
//         content: new_content,
//         type: "content"
//     }

    
//     activeUser.folder[order].push(new_content)

//     console.info(activeUser.folder[order])

// }