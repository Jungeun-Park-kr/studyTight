
const express = require('express');
const router = express.Router();

const path = require('path'); // 현재 프로젝트의 경로

// GET /login 라우터 (login으로 왔을때의 root)
router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../views/login.ejs'));
})

module.exports = router;
