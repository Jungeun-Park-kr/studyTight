const passport = require('passport');
const local = require('./localStrategy')
const User = require('../models/user');


// passport.use(UserDetails.createStrategy()); 
// passport.serializeUser(UserDetails.serializeUser()); 
// passport.deserializeUser(UserDetails.deserializeUser());


module.exports = () => {
    passport.serializeUser((user, done) => { // 사용자의 아이디만 저장
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => { // req.session에 저장된 아이디로 DB조회 -> 사용자 정보 얻음 -> req.user에 저장
        User.findOne({ _id : id }) //일치하는 아이디 있는 경우
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    local();
};