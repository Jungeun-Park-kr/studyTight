
const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn} = require('../middlewares');
const User = require('../../models/user');
const router = express.Router();

const path = require('path'); // 현재 프로젝트의 경로


router.get('/main', isLoggedIn, async (req, res, next) => {
    console.log('시간표 메인');
    try {
        res.render(path.join(__dirname, '../../views/timetable/timetable_main.ejs' ), {
            title: '내 시간표',
        });
    }
    catch (err) {
        console.error('/views/timetable/timetable.js 에서 에러');
        console.error(err);
        next(err);
    }
});

router.get('/edit', isLoggedIn, async (req, res, next) => {
    console.log('시간표 관리');
    try {
        res.render(path.join(__dirname, '../../views/timetable/timetable_edit.ejs' ), {
            title: '시간표 관리',
        });
    }
    catch (err) {
        console.error('/views/timetable/timetable.js 에서 에러');
        console.error(err);
        next(err);
    }
});

module.exports = router;