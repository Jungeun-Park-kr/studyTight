exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticatd()) { // 로그인 상태 확인
        next(); // 로그인 상태이면 다음 미들웨어로 넘어감
    } else { // 로그인 안된 상태
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticatd()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redired(`/?error=${message}`);
    }
};