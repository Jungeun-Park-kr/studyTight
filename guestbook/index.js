const inputBar = document.querySelector("#comment-input");
const rootDiv = document.querySelector("#comments");
const btn = document.querySelector("#submit");
const mainCommentCount = document.querySelector('#count');

function generateTime() { const date = new Date(); const year = date.getFullYear(); const month = date.getMonth(); const wDate = date.getDate(); const hour = date.getHours(); const min = date.getMinutes(); const sec = date.getSeconds(); const time = year + '-' + month + '-' + wDate + ' ' + hour + ':' + min + ':' + sec; return time; }

function generateUserName() {
    return '최시언';

} //이후 이름으로 처리

function numberCount(event) {
    console.log(event.target);
    if (event.target === voteUp) { console.log("2"); return voteUp.innerHTML++; } else if (event.target === voteDown) { return voteDown.innerHTML++; }
}

function deleteComments(event) {
    const btn = event.target;
    const list = btn.parentNode.parentNode;
    rootDiv.removeChild(list);
    if (mainCommentCount.innerHTML <= '0') { mainCommentCount.innerHTML = 0; } else { mainCommentCount.innerHTML--; }
}

function showComment(comment) {
    const userName = document.createElement('div');
    const inputValue = document.createElement('span');
    const showTime = document.createElement('div');
    const countSpan = document.createElement('span');
    const commentList = document.createElement('div');
    const delBtn = document.createElement('button');
    delBtn.className = "deleteComment";
    delBtn.innerHTML = "삭제";
    commentList.className = "eachComment";
    userName.className = "name";
    inputValue.className = "inputValue";
    showTime.className = "time";
    userName.innerHTML = generateUserName();
    userName.appendChild(delBtn);
    inputValue.innerText = comment;
    showTime.innerHTML = generateTime();
    countSpan.innerHTML = 0;
    commentList.appendChild(userName);
    commentList.appendChild(inputValue);
    commentList.appendChild(showTime);
    rootDiv.prepend(commentList);
}

function pressBtn() {
    const currentVal = inputBar.value;
    if (!currentVal.length) { alert("댓글을 입력해주세요!"); } else {
        showComment(currentVal);
        mainCommentCount.innerHTML++;
        inputBar.value = '';
    }
}

btn.onclick = pressBtn;