var doc = document;

function btnLoginHome() {
    location.replace("login.html");
}

function login() {
    var userId = doc.getElementById('login_id').value;
    var userPassword = doc.getElementById('login_password').value;
    var userName;
    var id_ok = false;
    var pass_ok = false;

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
    console.log(userId);
    console.log(userPassword);
    console.log('-------------');
    //회원정보와 일치하는지 확인
    //for문으로 비교해서 로그인하는게 안됨....;
    for (var key in userlist) {
        console.log(this.userId);
        // console.log(this.name);
        if (this.userId == userId) { //id 일치 확인
            id_ok = true;
            alert('id는 잇음');
            if (this.password === userPassword) { //pw 일치 확인
                pass_ok = true;
                userName = this.name; //사용자의 이름 저장
                alert('둘다 잇음');
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

    location.replace("/mainframe.html"); //메인 화면으로 이동
}
