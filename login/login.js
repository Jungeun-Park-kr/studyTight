var doc = document;

function btnLoginHome() {
    location.replace("login.html");
}

function login() {
    var userId = doc.getElementById('login_id').value;
    var userPassword = doc.getElementById('login_password').value;
    var id_ok = true;
    var pass_ok = true;

    //입력 잘 되었나 확인용
    console.log(userId);
    console.log(userPassword);

    //입력여부 확인
    if (!userId) { //아이디 입력 안했을 때
        alert('아이디를 입력하세요');
        doc.getElementById('login_id').focus(); //커서 가도록 함
        return;
    }
    if (!userPassword) {
        alert('비밀번호를 입력하세요');
        doc.getElementById('userPassword').focus(); //커서 가도록 함
        return;
    }

    //회원정보와 일치하는지 확인
    //in here
    //
    
    if (id_ok==false) { //아이디 확인
        alert('아이디를 다시 확인해주세요');
        doc.getElementById('login_id').value=''; //아이디 지우기
        doc.getElementById('login_password').value=''; //비밀번호 지우기
        doc.getElementById('login_id').focus(); //아이디 커서
        return;
    }
    if (pass_ok==false) { //해당 아이디의 비밀번호 확인
        alert('비밀번호가 아이디와 일치하지 않습니다.');
        doc.getElementById('login_password').value=''; //비밀번호 지우기
        doc.getElementById('login_password').focus(); //아이디 커서
        return;
    }
    
    //로그인 정상적으로 된 경우
    location.replace("../mainframe.html");
}
