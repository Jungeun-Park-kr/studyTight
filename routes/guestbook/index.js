//인덱스는 HTML화면을 렌더링하는 라우터다.
// index.js file
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/guestbook/users', function(req, res) { //해당하는 유저의 방명록에 입장하였을 때 글을 쓰는것들이 가능해야댐.
res.render('index', { title: 'Express' });
});

module.exports = router;