var doc = document;

//로그인 완료한 후에는 주석처리하기
console.log('DB에 있는 유저 정보');
console.info(userlist);

function btnLoginHome() {
    location.replace("login.html");
}

function login() {
    var userId = doc.getElementById('login_id').value;
    var userPassword = doc.getElementById('login_password').value;
    var userName;
    var id_ok = false;
    var pass_ok = false;

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
    for (var i=0; i<userlist.length; i++) {
        if (userlist[i].userId == userId) { //id 일치 확인
            id_ok = true;
            if (userlist[i].password === userPassword) { //pw 일치 확인
                pass_ok = true;
                userName = userlist[i].name; //사용자의 이름 저장
                break;
            }
        }
    }
    
    if (id_ok===false) { //아이디 확인(아이디조차 존재하지 않는 경우)
        alert('아이디를 다시 확인해주세요');
        doc.getElementById('login_id').value=''; //아이디 지우기
        doc.getElementById('login_password').value=''; //비밀번호 지우기
        doc.getElementById('login_id').focus(); //아이디 커서
        return;
    }
    if (pass_ok===false) { //해당 아이디의 비밀번호 확인
        alert('비밀번호가 아이디와 일치하지 않습니다.');
        doc.getElementById('login_password').value=''; //비밀번호 지우기
        doc.getElementById('login_password').focus(); //아이디 커서
        return;
    }
    
    //로그인 정상적으로 된 경우
    //현재 로그인 된 계정 저장(activeUser)
    activeUser.id = userId; //활성화된 사용자 아이디 저장
    activeUser.name = userName; //활성화된 사용자 이름 저장

    localStorage.setItem("username", activeUser.name);
    var tmp = localStorage.getItem("username");
    console.log('로그인이 성공되었습니다. 5초 뒤에 메인 화면으로 이동합니다.')
    setTimeout(function(){
        location.replace("/mainframe.html"); //메인 화면으로 이동
    }, 5000);
    //location.replace("/mainframe.html"); //메인 화면으로 이동
}

function logout() {
    //로그아웃
    //activeUser = null;
    localStorage.removeItem('username');
    var tmp = localStorage.getItem('username');
    if (tmp== null)
        console.log('로그아웃 되었습니다. 5초 뒤 로그인 화면으로 이동합니다.');
    //로그인 화면으로 이동
    setTimeout(function(){
        location.replace("login/login.html");
    }, 5000);
    //location.replace("login/login.html");
}