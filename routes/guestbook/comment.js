// 데이터를 전송할때에는 Post방식대신 Get방식을 이용한다.
// 그래야 데이터가 URL에 노출되지 않고 전송될 수 있다.

var express = require('express');
const { report } = require('.');
var router = express.Router(); //라우터 분리를 위해 사용
