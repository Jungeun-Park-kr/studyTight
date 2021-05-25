const mongoose = require('mongoose');
const User = require('./user');
const Course = require('./course');
const CourseSchedule = require('./course_schedule');

const uri = process.env.ATLAS_URI; // .env에 DB계정 잘 입력되었는지 확인
const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true); // 디버깅 모드
    }
    mongoose.connect(uri, {
        dbName : 'studyTight',
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }, (error) => {
        if (error) {
            console.log('MongoDB database connection error', error);
        } else {
            console.log("MongoDB database connection success");
        }
    });
};

mongoose.connection.on('error', (error) => {
    console.log('MongoDB database connection error', error);
});
mongoose.connection.on("disconnected", () => {
    console.log('MogoDB database disconnected. Try again');
    connect();
});

module.exports = connect;