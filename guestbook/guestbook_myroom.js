// function showFriendsAddPopup() {
//     var popupWidth = 650;
//     var popupHeight = 800;
//     var popupX = (document.body.offsetWidth / 2) - (popupWidth / 2);
//     var popupY = (document.body.offsetHeight / 2) - (popupHeight / 2);
//     var url = "timetable_add.html";
//     var name = "timetable add popup"
//     var option = "width =" + popupWidth + ", height =" + popupHeight + ", left" + popupX + ", top=" + popupY + ", scrollbars = yes, location = no";
//     window.open(url, name, option);
// }


function showhiddengroup() {
    mydiv = document.getElementById(submenu); //좌측 띄어줄것들.
    mydiv.style.visibility = "visible"
    Console.log(mydiv);
}

function showFriendsEditPopup() {
    var popupWidth = 650;
    var popupHeight = 800;
    var popupX = (document.body.offsetWidth / 2) - (popupWidth / 2);
    var popupY = (document.body.offsetHeight / 2) - (popupHeight / 2);
    var url = "friends_edit.html";
    var name = "timetable add popup"
    var option = "width =" + popupWidth + ", height =" + popupHeight + ", left" + popupX + ", top=" + popupY + ", scrollbars = yes, location = no";
    window.open(url, name, option);
}

function modifyCourse(course) {
    //과목 수정 버튼 누를 경우 해당 과목의 정보 수정

}

function deleteCourse(course) {
    var ret = confirm("정말로 삭제하시겠습니까?");
    if (ret) {
        //삭제 수행
    } else { //취소버튼 or 다이얼로그 닫은 경우
        ;
    }
}

function get_courses(value) {
    //파라미터 : td[번호]

}

function showmyprofile(profile) { //게스트북의 프로필 받아옴.
    //입력받은 정보로 프로필 출력하기
    var name, school, major, grade, age, gender, profilesecret;
    var school_secret, major_secret, grade_secret;
    name = profile.name; //기본정보
    school = profile.school;
    major = profile.major;
    age = profile.age;
    gender = profile.gender;
    profilesecret = profile.profilesecret;

    school_secret = profile.school_secret; //비밀여부
    major_secret = profile.major_secret;
    grade_secret = profile.grade_secret;

    console.log("프로필 in js" + profile);
    console.log("이름 in js" + name);

    myvar = document.getElementById(leftmenu); //좌측 띄어줄것들. //좌측 띄어줄것들.
    // myvar.innerHTML = title; //첫줄에는 과목이름
    // tmpvar.style.backgroundColor = color;

}