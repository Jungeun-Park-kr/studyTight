const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const Profile = require('../../models/profile');
const User = require('../../models/user');
const Top_comment = require('../../models/top_comment');
const Bottom_comment = require('../../models/bottom_comment');
const Friend = require('../../models/friend'); //친구관리를 위함.
const Course = require('../../models/course');
const { mongo, Mongoose } = require('mongoose');
const top_comment = require('../../models/top_comment');
const { hasUserDefinedProperty } = require('mongoose/lib/utils');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

//미들웨어

// guestbook

router.get('/', isLoggedIn, async(req, res, next) => {

    try {
        const OneUser = await User.findOne({ _id: res.locals.user._id })
        const profile = await Profile.find({ user_id: res.locals.user._id }).populate('profiles')
        const friend = await Friend.find({ user_id: res.locals.user._id }).populate('friends')
        const top_comment = await Top_comment.find({ commented_email: res.locals.user._id }).populate('commenter_email').sort({ _id: -1 })
        const bottom_comment = await Bottom_comment.find({ commented_email: res.locals.user._id })
            //검색을 위해서 new RegExp을 이용하여 해당 문자열이 포함되어있는지 검색.
        res.render('../views/guestbook/guestbook_myroom.ejs', {
            profile: profile[0],
            friend: friend,
            top_comment: top_comment,
            bottom_comment: bottom_comment,
            myname: OneUser.name
        });
    } catch (err) {
        console.error('/views/timetable/guestbook_myroom.ejs 에서 에러');
        console.error(err);
        next(err);
    }
});

router.get('/searfriend', isLoggedIn, async(req, res, next) => {

    try {
        const OneUser = await User.findOne({ _id: res.locals.user._id })
        const { search_email } = req.query; //get이라서 query해야됨.
        const profile = await Profile.find({ user_id: res.locals.user._id }).populate('profiles')
        const friend = await Friend.find({ user_id: res.locals.user._id }).populate('friends')
        const top_comment = await Top_comment.find({ commented_email: res.locals.user._id }).populate('commenter_email').sort({ _id: -1 })
        const bottom_comment = await Bottom_comment.find({ commented_email: res.locals.user._id })
        const myfriend = await Friend.find({ user_id: res.locals.user._id }).find({ Friend_Name: new RegExp(search_email) }) //내 전체 친구들 리스트.
            // .select('major')
            //첫번째 . 까진 id똑같은걸로 찾는거
        res.render('../views/guestbook/guestbook_myroom_searchforedit.ejs', {
            profile: profile[0],
            friend: friend,
            top_comment: top_comment,
            bottom_comment: bottom_comment,
            search_email: search_email,
            search_list: myfriend,
            myname: OneUser.name
        });
    } catch (err) {
        console.error('/views/timetable/guestbook_myroom_searchforeidt.ejs 에서 에러');
        console.error(err);
        next(err);
    }
});

router.post('/addgroup', isLoggedIn, async(req, res, next) => {
    const { search_email } = req.body;

    try {

        const profile = await Profile.find({ user_id: res.locals.user._id }).populate('profiles')

        await Profile.updateOne({ user_id: res.locals.user._id }, {
            $push: {
                group: search_email
            }
        });

        res.redirect("/guestbook");

    } catch (err) {

        console.error('/views/timetable/guestbook_myroom_searchforeidt.ejs 에서 에러');
        console.error(err);
        next(err);
    }

});

router.post('/deletegroup', isLoggedIn, async(req, res, next) => {
    const { group_dropdown } = req.body;

    try {
        const profile = await Profile.find({ user_id: res.locals.user._id }).populate('profiles')

        await Profile.updateOne({ user_id: res.locals.user._id }, {
            $pull: {
                group: {

                    $in: group_dropdown

                }
            }
        });
        res.redirect("/guestbook");

    } catch (err) {

        console.error('/views/timetable/guestbook_myroom_searchforeidt.ejs 에서 에러');
        console.error(err);
        next(err);
    }

});

router.get('/searfriend/friendedit', isLoggedIn, async(req, res, next) => {

    try {
        const OneUser = await User.findOne({ _id: res.locals.user._id })
        const { select_friend } = req.query;
        const { search_email } = req.query;
        const profile = await Profile.find({ user_id: res.locals.user._id }).populate('profiles')
        const friend = await Friend.find({ user_id: res.locals.user._id }).populate('friends')
        const top_comment = await Top_comment.find({ commented_email: res.locals.user._id }).populate('commenter_email').sort({ _id: -1 })
        const bottom_comment = await Bottom_comment.find({ commented_email: res.locals.user._id })
        const search_list = await User.find({ name: new RegExp(search_email) })
        const select_info = await Friend.findOne({ Friend_ID: select_friend })
            // .select('major')
            //첫번째 . 까진 id똑같은걸로 찾는거
        res.render('../views/guestbook/guestbook_myroom_foredit.ejs', {
            profile: profile[0],
            friend: friend,
            top_comment: top_comment,
            bottom_comment: bottom_comment,
            search_list: search_list,
            search_email: search_email,
            select_friend: select_friend,
            select_info: select_info,
            myname: OneUser.name
        });
    } catch (err) {
        console.error('/views/timetable/guestbook_myroom_search.ejs 에서 에러');
        console.error(err);
        next(err);
    }
});

router.post('/searchemail/friendadd/edit', isLoggedIn, async(req, res, next) => {
    const { star_friend, group_dropdown, friend_id } = req.body;
    try {
        const { select_friend } = req.query;
        const { search_email } = req.query;
        const profile = await Profile.find({ user_id: res.locals.user._id }).populate('profiles')
        const friend = await Friend.find({ user_id: res.locals.user._id }).populate('friends')
        const top_comment = await Top_comment.find({ commented_email: res.locals.user._id }).populate('commenter_email').sort({ _id: -1 })
        const bottom_comment = await Bottom_comment.find({ commented_email: res.locals.user._id })
        const search_list = await User.find({ name: new RegExp(search_email) })
        const select_info = await Friend.findOne({ Friend_ID: select_friend })
        const OneUser = await User.findOne({ _id: res.locals.user._id })

        await Friend.updateOne({ user_id: res.locals.user._id, Friend_ID: friend_id }, {
            friend_group: group_dropdown
        });

        res.redirect("/guestbook");
    } catch (err) {
        console.error('/views/timetable/guestbook_myroom_search.ejs 에서 에러');
        console.error(err);
        next(err);
    }
});

router.get('/searchemail', isLoggedIn, async(req, res, next) => {

    try {
        const { search_email } = req.query; //get이라서 query해야됨.
        const profile = await Profile.find({ user_id: res.locals.user._id }).populate('profiles')
        const friend = await Friend.find({ user_id: res.locals.user._id }).populate('friends')
        const top_comment = await Top_comment.find({ commented_email: res.locals.user._id }).populate('commenter_email').sort({ _id: -1 })
        const bottom_comment = await Bottom_comment.find({ commented_email: res.locals.user._id })
        const search_list = await User.find({ name: new RegExp(search_email) })
        const OneUser = await User.findOne({ _id: res.locals.user._id })
            // .select('major')
            //첫번째 . 까진 id똑같은걸로 찾는거
        res.render('../views/guestbook/guestbook_myroom_search.ejs', {
            profile: profile[0],
            friend: friend,
            top_comment: top_comment,
            bottom_comment: bottom_comment,
            search_email: search_email,
            search_list: search_list,
            myname: OneUser.name
        });
    } catch (err) {
        console.error('/views/timetable/guestbook_myroom_search.ejs 에서 에러');
        console.error(err);
        next(err);
    }
});

router.post('/searchemail/friendadd', isLoggedIn, async(req, res, next) => {
    const { select_friend } = req.body; //이렇게하면 체크된 값이 제대로 전달이 잘된다.

    try {
        const { search_email } = req.query; //get이라서 query해야됨.
        const profile = await Profile.find({ user_id: res.locals.user._id }).populate('profiles')
        const friend = await Friend.find({ user_id: res.locals.user._id }).populate('friends')
        const top_comment = await Top_comment.find({ commented_email: res.locals.user._id }).populate('commenter_email').sort({ _id: -1 })
        const bottom_comment = await Bottom_comment.find({ commented_email: res.locals.user._id })
        const search_list = await User.find({ name: new RegExp(search_email) })
        const OneUser = await User.findOne({ email: select_friend })
        const pprofile = await Profile.findOne({ user_id: res.locals.user._id }).populate('profiles')
            // mongoDB에 프로파일 추가
        const addfriend = await Friend.create({
            user_id: pprofile.user_id,
            received: true,
            send: true,
            Friend_ID: select_friend,
            Friend_Name: OneUser.name,
            friend_link: OneUser.email_id,
            friend_group: "basic"
        })

        res.redirect("/guestbook");

    } catch (err) {}

});


// 직접 자신의 방명록의 적은 경우
router.post('/addcomment', isLoggedIn, async(req, res, next) => {
    const { comment_input, checkbox } = req.body;

    try {

        const top_comment1 = await Top_comment.find({ commented_email: res.locals.user._id }).populate('commenter_email')
            // mongoDB에 프로파일 추가
        const top_comment = await Top_comment.create({
            commented_email: req.user._id, //이것만 올라가는 상황.
            commenter_email: req.user._id,
            comment_time: getCurrentDate(),
            comment_secret: checkbox,
            comment_count: "0",
            text: comment_input,
            post_id: top_comment1.length + 1,

        });
        res.redirect("/guestbook");

    } catch (err) {}

});

router.post('/deletecomment', isLoggedIn, async(req, res, next) => { //할 일 목록에서 삭제 버튼을 누른 경우
    const { id } = req.body;
    const top_comment = await Top_comment.find({ commented_email: res.locals.user._id }).populate('commenter_email').sort({ _id: -1 })
    try {
        await Top_comment.deleteOne({ _id: id });
    } catch (err) {
        next(err);
    }
    res.redirect("/guestbook");
});

router.post('/editprofile', isLoggedIn, async(req, res, next) => {
    const { school, school_private, major, major_private, grade, grade_private, age, gender } = req.body;

    try {
        // mongoDB에 프로파일 추가
        const profile = await Profile.create({
            user_id: req.user._id,
            school: school,
            school_private: school_private,
            major: major,
            major_private: major_private,
            grade: grade,
            grade_private: grade_private,
            age: age,

        });

    } catch (err) {
        console.log('guestbookedit error');
        next(err);
    }

});

router.patch('/editprofile', isLoggedIn, async(req, res, next) => { //update할 데이터의 구분자: id

    try {
        const user = await User.findOne({ _id: res.locals.user._id });
        const { name, school, school_private, major, major_private, grade, grade_private, age, gender } = req.body;
        console.info(user);
        const users = await User.updateOne({ //해당하는 값을 필터링함
            _id: name
        }, {
            $set: { //해당하는 값을 바꿈
                //
            }
        });


    } catch (err) {
        next(err);
    }
});

router.get('/:id', isLoggedIn, async(req, res, next) => {

    const id_obj = req.params.id; //내가 보내준 ID
    try {
        //일단 유저정보를 받아와서 페이지 먼저 띄우기.
        const friendUser = await User.findOne({ email_id: req.params.id });
        const user = await User.findOne({ email_id: id_obj });
        const profile = await Profile.findOne({ user_id: user._id });
        res.render('../views/guestbook/guestbook_friendroom.ejs', {
            friend_id: id_obj,
            profile: profile,
            friendUser: friendUser
        });
    } catch (err) {
        next(err);
    }
});

router.get('/:id/timetable/auth', isLoggedIn, async(req, res, next) => { // 해당 친구의 시간표를 볼 수 있는지 확인 (권한 확인용)
    try {
        const friendUser = await User.findOne({ email_id: req.params.id }); // 클릭한 친구
        console.log('-------------친구-----------');
        console.info(friendUser);
        // 클릭한 친구와 내가 친구가 되어있는지 확인 및 시간표 보기 권한 있는지 확인
        const friend = await Friend.findOne({ user_id: res.locals.user._id, Friend_ID: friendUser.email, received: true, send: true }); // 친구 데이터 가져오기
        const profile = await Profile.findOne({ user_id: friendUser._id }); // 친구의 프로필 공개 정보 가져오기
        console.log('---------------------친구 프로필---------------------');
        console.info(friend);
        console.info(profile);
        if (friend == null) { // 친구가 아닌 경우
            //console.log('친구가 아님');
            return res.send('/' + req.params.id + '/timetable?error=notfriend');
        }
        if (profile.timetable_private) { // 시간표 비공개 한 경우
            //console.log('친구가 시간표 비공개함');
            return res.send('/' + req.params.id + '/timetable?error=private');
        }
        return res.send(req.params.id);
    } catch (err) {
        console.error('/views/guestbook/guestbook.js 에서 에러');
        console.error(err);
        return (err);
    }
});


router.get('/:id/timetable', isLoggedIn, async(req, res, next) => { // 해당 친구의 시간표 보기 (페이지 이동)
    try {
        const friendUser = await User.findOne({ email_id: req.params.id }); // 클릭한 친구
        const timetable = await Course.find({ user_id: friendUser._id }).populate('schedules').sort({ 'createdAt': 1 }); // 클릭한 친구의 시간표
        // console.log('---------------------친구 시간표---------------------');
        // console.info(timetable);

        res.render('../views/guestbook/guestbook_timetable.ejs', {
            title: friendUser.name + '의 시간표',
            user: res.locals.user,
            friend: friendUser,
            timetable: timetable
        });

    } catch (err) {
        console.error('/views/guestbook/guestbook.js 에서 에러');
        console.error(err);
        return (err);
    }
});

function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var today = date.getDate() + 1;
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return (year + "-" + month + "-" + today + " " + hours + ":" + minutes + ":" + seconds);
}

module.exports = router;

//모듈로서 내보내줘야된다.