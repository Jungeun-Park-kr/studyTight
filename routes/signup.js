// const express = require('express');
// const router = express.Router();

// const path = require('path'); // 현재 프로젝트의 경로

// // GET /signup 라우터 (signup으로 왔을때의 root)
// router.get('/', (req, res) => {
//     res.render(path.join(__dirname, '../views/signup.ejs'));
// });


// router.get('/agree', (req, res) => {
//     //res.send('This is signup page');
//     res.render(path.join(__dirname, '../views/signup_agree.ejs'));
// });



// // POST /signup 라우터 
// // 회원가입 form
// router.post('/', (req, res, next) => {
//     console.log('회원가입 버튼 누름');
//     console.log(req.body);
//     User.find({ email:req.body.email })
//         .exec()
//         .then(user => {
//             if (user.length >= 1) {
//                 res.send('<script type="text/javascript">alert("이미 존재하는 이메일입니다."); window.location="/signup"; </script>');
//             } else {
//                 const user = new User({
//                     _id: new mongoose.Types.ObjectId(),
//                     name:req.body.name,
//                     email: req.body.email,
//                     password: req.body.password
//                 });
//                 user
//                     .save()
//                     .then(result => {
//                         console.log(result);
//                         res.redirect("/");
//                     })
//                     .catch(err => {
//                         console.log(err);
//                     });
//                   }
//         });
// });

// module.exports = router;
