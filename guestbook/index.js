const inputBar = document.querySelector("#comment_input");
const rootDiv = document.querySelector("#comments");
const btn = document.querySelector("#submit");
const mainCommentCount = document.querySelector('#count');

function generateTime() { const date = new Date(); const year = date.getFullYear(); const month = date.getMonth(); const wDate = date.getDate(); const hour = date.getHours(); const min = date.getMinutes(); const sec = date.getSeconds(); const time = year + '-' + month + '-' + wDate + ' ' + hour + ':' + min + ':' + sec; return time; }

function generateUserName() {
    return '박정은';

} //이후 이름으로 처리

function numberCount(event) {
    console.log(event.target);
    if (event.target === voteUp) { console.log("2"); return voteUp.innerHTML++; } else if (event.target === voteDown) { return voteDown.innerHTML++; }
}

function generateImage() {
    return;
}

function deleteComments(event) {
    const btn = event.target;
    const list = btn.parentNode.parentNode.parentNode;
    const hr = btn.parentNode.parentNode.parentNode.nextSibling;
    rootDiv.removeChild(hr);
    rootDiv.removeChild(list);
    activeUser = getActiveUser(username);
    activeUser.guestbook.commentlist.pop();
    console.log(activeUser.guestbook.commentlist);

}

//이게 마지막에 다 더한 리스트를 추가하는것.

function pressBtn() {
    const currentVal = inputBar.value;
    if (!currentVal.length) { alert("댓글을 입력해주세요!"); } else {
        // inputBar.value = '';
    }

}


btn.onclick = pressBtn;
//index.jsdml 33번째줄 참고