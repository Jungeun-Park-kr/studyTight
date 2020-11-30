var doc = document;

console.log('activeUser:'+activeUser.name);
console.log('userlist[0]:'+userlist[0].name);

function btnLoginHome() {
    location.replace("login.html");
}

function login() {
    console.log('로그인 시도 :'+localStorage.getItem("activeUser"));
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
    console.log('------userlist와 사용자가 입력한 아이디/비번 비교 시작-------');
    //회원정보와 일치하는지 확인
    //for문으로 비교해서 로그인하는게 안됨....;
    for (var i=0; i<userlist.length; i++) {
        console.log(userlist[i].userId);
        // console.log(this.name);
        if (userlist[i].userId == userId) { //id 일치 확인
            id_ok = true;
            console.log('id는 잇음');
            if (userlist[i].password === userPassword) { //pw 일치 확인
                pass_ok = true;
                userName = userlist[i].name; //사용자의 이름 저장
                console.log('둘다 잇음');
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

    localStorage.setItem("userimg", activeUser.profile_image);
    localStorage.setItem("username", activeUser.name);
    var tmp = localStorage.getItem("username");
    console.log('로그인 제대로 되었는지 확인:'+tmp);
    location.replace("/mainframe.html"); //메인 화면으로 이동
    // setTimeout(function(){
    //     location.replace("/mainframe.html"); //메인 화면으로 이동
    //     alert('asdf');
    // }, 2000);
    
}

function logout() {
    //로그아웃
    activeUser = null;
    localStorage.setItem('username', null);
    localStorage.setItem("userimg", null);
    var tmp = localStorage.getItem('username');
    console.log('로그아웃 되었습니다:'+tmp);
    //로그인 화면으로 이동
    location.replace("login/login.html");
}