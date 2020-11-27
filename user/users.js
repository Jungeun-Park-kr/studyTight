var userlist = new Array(); //사용자들을 담을 배열
var activeUser = new Object(); //로그인 중인 사용자를 담을 객체
userlist.push(
    {
        userId : 'je991025@gmail.com',
        password : 'angelje',
        name : '박정은',
        course : [] //과목 정보 저장할 곳
    }
);


function createUser(userid, userpw, username) { //userlist에 새로운 사용자 추가
    var user = new Object();
    user.userId = userid;
    user.password = userpw;
    user.name = username;
    userlist.push(user);
    //console.log('새로운사용자'+user.userId+user.name);
    return true;
}

activeUser = userlist[0]; //test사용자를 로그인 시켜둠
