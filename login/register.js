
var doc = document;
var sign = doc.getElementById('signUp');

var regis = function register() {
    //회원가입시 입력한 값들 가져오기
    var userid = doc.getElementById('userId').value;
    var userpassword = doc.getElementById('userPassword').value;
    var userconfirm = doc.getElementById('userConfirm').value;
    
    //입력 잘 되었나 확인용
    console.log(userid);
    console.log(userpassword);

    if (!userid) { //아이디 입력 안했을 때
        alert('이메일을 입력하세요');
        doc.getElementById('userId').focus(); //커서 가도록 함
        return;
    }
    if (!userpassword) {
        alert('비밀번호를 입력하세요');
        doc.getElementById('userPassword').focus(); //커서 가도록 함
        return;
    }
    if (!userconfirm) {
        alert('비밀번호를 입력하세요');
        doc.getElementById('userConfirm').focus(); //커서 가도록 함
        return;
    }
    //비밀번호와 비밀번호 확인이 같은지 확인

    alert('study Tight 회원가입을 축하합니다.');
}
sign.addEventListener('click', regis);


function id_check() {
    //아이디 중복확인 메소드
}

