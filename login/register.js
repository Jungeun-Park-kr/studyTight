var doc = document;
var sign = doc.getElementById('signUp');
var isIdCheck = false;

function register() {
    //회원가입시 입력한 값들 가져오기
    var userId = doc.getElementById('userId').value;
    var userPassword = doc.getElementById('userPassword').value;
    var userConfirm = doc.getElementById('userConfirm').value;
    var userName = doc.getElementById('userName').value;

    for (var key in userlist) {
        console.log(key.userName);
        if (key.userId === userId) { //id 일치 확인
            id_ok = true;
            alert('id는 잇음');
            if (this.userPassword === password) { //pw 일치 확인
                pass_ok = true;
                userName = this.name; //사용자의 이름 저장
                break;
            }
        }
    }
    // //입력 잘 되었나 확인용
    // console.log(userId);
    // console.log(userPassword);

    if (!userId) { //아이디 입력 안했을 때
        alert('이메일을 입력하세요');
        doc.getElementById('userId').focus(); //커서 가도록 함
        return;
    }
    if (!userPassword) {
        alert('비밀번호를 입력하세요');
        doc.getElementById('userPassword').focus(); //커서 가도록 함
        return;
    }
    if (!userConfirm) {
        alert('비밀번호를 입력하세요');
        doc.getElementById('userConfirm').focus(); //커서 가도록 함
        return;
    }
    if (userPassword.length < 6) { //비밀번호 길이 6보다 짧으면 재입력 요구
        alert('비밀번호는 최소 6자리 이상이어야 합니다.');
        doc.getElementById('userPassword').value=''; //비밀번호 입력칸 비우기
        doc.getElementById('userComfirm').value=''; //비밀번호 확인 입력칸 비우기
        doc.getElementById('userPassword').focus(); //비밀번호 입력칸에 커서
        return;
    }
    //비밀번호와 비밀번호 확인이 같은지 확인
    if (userPassword != userConfirm) { //비밀번호, 비밀번호 확인 불일치할 경우 비밀번호 창 비운 후 커서 가도록 하기
        alert('비밀번호가 일치하지 않습니다.');
        doc.getElementById('userPassword').value=''; //비밀번호 입력칸 비우기
        doc.getElementById('userComfirm').value=''; //비밀번호 확인 입력칸 비우기

        doc.getElementById('userPassword').focus(); //비밀번호 입력칸에 커서
        return;
    }
    
    if (!isIdCheck) {
        alert('아이디 중복확인을 해주세요.');
        return;
    }
    //사용자가 입력한 정보들을 회원정보 리스트에 추가하기
    //in here
    var newUser = createUser(userId, userPassword, userName); //유저 객체 생성 (user/user.js) 성공시 true리턴
    if (newUser) { //회원가입 완료
        alert('study Tight 회원가입을 축하합니다.');
        for (var i=0; i<userlist.length; i++) {
            console.log('user'+i+':'+userlist[i].name);
        }
        setTimeout(function(){
            location.replace("/login/login.html"); //로그인 화면으로 이동
            alert('asdf');
        }, 2000);
        //location.replace("/login/login.html"); //로그인 화면으로 이동
    }
    else { //유저 추가 에러 발생
        alert('회원가입을 실패했습니다. 다시 시도해주세요.');
    }
}

// var regis = function() {
//     alert('시작');
//     //회원가입시 입력한 값들 가져오기
//     var userId = doc.getElementById('userId').value;
//     var userPassword = doc.getElementById('userPassword').value;
//     var userConfirm = doc.getElementById('userConfirm').value;
    
//     //입력 잘 되었나 확인용
//     console.log(userId);
//     console.log(userPassword);

//     if (!userId) { //아이디 입력 안했을 때
//         alert('이메일을 입력하세요');
//         doc.getElementById('userId').focus(); //커서 가도록 함
//         return;
//     }
//     if (!userPassword) {
//         alert('비밀번호를 입력하세요');
//         doc.getElementById('userPassword').focus(); //커서 가도록 함
//         return;
//     }
//     if (!userConfirm) {
//         alert('비밀번호를 입력하세요');
//         doc.getElementById('userConfirm').focus(); //커서 가도록 함
//         return;
//     }
//     if (userPassword.length < 6) { //비밀번호 길이 6보다 짧으면 재입력 요구
//         alert('비밀번호는 최소 6자리 이상이어야 합니다.');
//         doc.getElementById('userPassword').value=''; //비밀번호 입력칸 비우기
//         doc.getElementById('userComfirm').value=''; //비밀번호 확인 입력칸 비우기
//         doc.getElementById('userPassword').focus(); //비밀번호 입력칸에 커서
//         return;
//     }
//     //비밀번호와 비밀번호 확인이 같은지 확인
//     if (userPassword != userConfirm) { //비밀번호, 비밀번호 확인 불일치할 경우 비밀번호 창 비운 후 커서 가도록 하기
//         alert('비밀번호가 일치하지 않습니다.');
//         doc.getElementById('userPassword').value=''; //비밀번호 입력칸 비우기
//         doc.getElementById('userComfirm').value=''; //비밀번호 확인 입력칸 비우기

//         doc.getElementById('userPassword').focus(); //비밀번호 입력칸에 커서
//         return;
//     }
    
//     if (!isIdCheck) {
//         alert('아이디 중복확인을 해주세요.');
//         return;
//     }
//     alert('study Tight 회원가입을 축하합니다.');
// }
// sign.addEventListener('click', regis);


function id_check() { //아이디 중복확인 메소드
    var userId = doc.getElementById('userId').value;
    var isdup = false;

    console.log(userId);
    //입력유무 확인
    if (!userId) { //아이디 입력 안했을 때
        alert('이메일을 입력하세요');
        doc.getElementById('userId').focus(); //커서 가도록 함
        return;
    }
    //정규식을 이용해 아이디의 이메일 형식 확인
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!regExp.test(userId)) {
        alert('이메일 형식이 아닙니다. 아이디를 다시 입력해주세요');
        doc.getElementById('userId').value='';
        doc.getElementById('userId').focus();
        return;
    }
    //리스트에 회원명단 넣어두고 반복문으로 입력받은 id와 비교하는 방식??
    for (var i=0; i<userlist.length; i++) {
        if (userlist[i].userId == userId) { //userlist의 id와 일치하면 사용불가
            isdup = true;
            break;
        }
    }

    if (!isdup) {
        alert('사용가능한 아이디입니다.');
        isIdCheck = true;
        return;
    } 
    else {
        alert('사용 불가능한 아이디입니다.');
        doc.getElementById('userId').value=''; //아이디 지우기
        doc.getElementById('userId').focus(); //아이디 커서
        return;
    }
}
