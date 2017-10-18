var express = require('express');
var router = express.Router();
var Model = require('../data/module')

var responseData;
router.use(function(req, res, next){
  responseData = {
    code: 0,
    message: ''
  }
  next();
})

var date = new Date(),
  yy = date.getFullYear(),
  MM = date.getMonth() + 1,
  dd = date.getDate(),
  hh = date.getHours(),
  mm = date.getMinutes(),
  ss = date.getSeconds();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('localhost:3000/user首页');
});

router.get('/userLogin', function(req, res, next){
  res.json('sdd')
});

// 登录
// router.post('/login', function(req, res, next){
//   var username = req.body.username;
//   var password = req.body.password;
//
//   Model.User.findOne({username: username}).then(function(userInfo){
//     if(password == userInfo.password){
//       responseData.code = 200;
//       responseData.message ='登录成功';
//       responseData.userInfo = {
//         _id: userInfo._id,
//         username: userInfo.username,
//         isAdmin: userInfo.isAdmin
//       }
//       res.cookie('userInfo', {
//         _id: userInfo._id,
//         username: userInfo.username,
//         isAdmin: userInfo.isAdmin
//       }, {maxAge: 1000*60*60});
//       res.cookie('isAdmin',userInfo.isAdmin, {maxAge: 1000*60*60});
//       res.json(responseData);
//     }
//     if(password !== userInfo.password ){
//       responseData.code = 1;
//       responseData.message = '用户名或密码错误';
//       res.json(responseData);
//       return;
//     }
//   })
// })

// 测试
router.post('/login', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  Model.User.findOne({username: username,password: password}).then(function(userInfo){
    if(!userInfo){
      responseData.code = 1;
      responseData.message = '用户名或密码错误';
      res.json(responseData);
      return;
    }else{
      responseData.code = 200;
      responseData.message ='登录成功';
      responseData.userInfo = {
        _id: userInfo._id,
        username: userInfo.username,
        isAdmin: userInfo.isAdmin
      }
      res.cookie('userInfo', {
        _id: userInfo._id,
        username: userInfo.username,
        isAdmin: userInfo.isAdmin
      }, {maxAge: 1000*60*60});
      res.cookie('isAdmin',userInfo.isAdmin, {maxAge: 1000*60*60});
      res.json(responseData);
      return;
    }
  })
})

// 注册
router.post('/register', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var newUser = {
    username: username,
    password: password,
    time : yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
  }
  Model.User.findOne({username: username}).then(function(userInfo){
    if(userInfo){
      responseData.code = 1;
      responseData.message ='用户名已被注册';
      res.json(responseData);
      return;
    }
    Model.User.create(newUser).then(function(newUserInfo){
      responseData.code = 200;
      responseData.message = '注册成功';
      res.json(responseData);
    })
  })
})

// 退出
router.get('/logout', function(req, res, next){
  res.clearCookie('userInfo');
  res.clearCookie('isAdmin');
  responseData.code = 200;
  responseData.message = '退出成功';
  res.json(responseData);
});

// 检查是否登录
router.get('/checkLogin', function(req, res, next){
  if(req.cookies.userInfo){
    responseData.code = 200;
    responseData.message = req.cookies.userInfo;
    res.json(responseData);
  }else{
    responseData.code = '3';
    responseData.message = '没有登录';
    res.json(responseData);
    return;
  }
})


module.exports = router;
