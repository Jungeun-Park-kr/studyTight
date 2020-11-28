const btn = document.getElementById("reply-button1"); //리플라이버튼

function replyBtn() {

    if (document.getElementById("replyplace1").style.display == 'none') {
        document.getElementById("replyplace1").style.display = 'initial';
    } else {
        document.getElementById("replyplace1").style.display = 'none';
    }

}

btn.onclick = replyBtn;