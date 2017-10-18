var express = require('express');
var router = express.Router();
var Model = require('../data/module');

// 所有请求都要经过这一步，统一请求返回的数据格式
var responseData;
router.use(function(req, res, next){
  responseData = {
    code: 0,
    message: ''
  }
  next();
});

// 定义时间格式
var date = new Date(),
  yy = date.getFullYear(),
  MM = date.getMonth() + 1,
  dd = date.getDate(),
  hh = date.getHours(),
  mm = date.getMinutes(),
  ss = date.getSeconds();
var time = yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 前台所有分类
router.get('/index_category', function(req, res, next){
  Model.Category.find().then(function(doc){
    responseData.code = 200;
    responseData.message = '查找所有分类成功';
    responseData.data = doc;
    res.json(responseData);
  })
})

// 查找单个分类的数据
router.get('/index_article_category', function(req, res, next){
  var categoryy = req.query.category;
  console.log('单个分类名为:' + categoryy);
  var newData = {'category': categoryy};

  var page = Number(req.query.page || 1);
  var limit = 4;
  var pages = 0;
  Model.Article.count(newData).then(function(count){
    pages = Math.ceil(count/limit); //总数据除以每页限制数据=页数
    page = Math.min(page,pages);
    page = Math.max(page,1);
    var skip = (page-1)*limit;

    Model.Article.find(newData).sort({_id: -1}).limit(limit).skip(skip).then(function(doc){
      console.log(doc);
        responseData.code = 200;
        responseData.message = '查找单个分类数据成功';
        responseData.data = doc;
        responseData.count = count;
        responseData.limit = limit;
        responseData.page = page;
        responseData.pages = pages;
        responseData.skip = skip;
        console.log(responseData);
        res.json(responseData);
    })
  })
})

// 查找所有文章
router.get('/index_article', function(req, res, next){
  var page = Number(req.query.page || 1);
  var limit = 4;
  var pages = 0;
  Model.Article.count().then(function(count){
    pages = Math.ceil(count/limit); //总数据除以每页限制数据=页数
    page = Math.min(page,pages);
    page = Math.max(page,1);
    var skip = (page-1)*limit;

    Model.Article.find({}).sort({_id: -1}).limit(limit).skip(skip).then(function(doc){
      console.log(doc);
        responseData.code = 200;
        responseData.message = '查找所有文章成功';
        responseData.data = doc;
        responseData.count = count;
        responseData.limit = limit;
        responseData.page = page;
        responseData.pages = pages;
        responseData.skip = skip;
        console.log(responseData);
        res.json(responseData);
    })
  })
})

//文章详情
router.get('/index_detail', function(req, res, next){
  var _id= req.query._id;
  console.log(_id);
  Model.Article.findOne({_id: _id}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      doc.views++;
      doc.save();
      responseData.code = 200;
      responseData.message = '查找一篇文章成功';
      responseData.data = doc;
      console.log(responseData);
      res.json(responseData);
    }
  })
})

// 查找一篇文章的评论
router.get('/index_detail_comment', function(req, res, next){
  var _id = req.query._id;
  console.log("传过来的id为:" + _id);
  Model.Article.findOne({_id: _id}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      console.log('查找一篇文章，所有评论成功' + doc);
      responseData.code = 200;
      responseData.message = '查找一篇文章，所有评论成功';
      responseData.data = doc.comment;
      res.json(responseData);
    }
  })
})

// 评论分页
// router.get('/index_detail_comment', function(req, res, next){
//   var _id= req.query._id;
//   console.log(_id);
//   Model.Article.findOne({_id: _id}, function(err, doc){
//     if(err){
//       console.log(err);
//       return;
//     }else{
//       var page = Number(req.query.page || 1);
//       var limit = 4;
//       var pages = 0;
//       Model.Article.count(doc.comment).then(function(count){
//         pages = Math.ceil(count/limit); //总数据除以每页限制数据=页数
//         page = Math.min(page,pages);
//         page = Math.max(page,1);
//         var skip = (page-1)*limit;
//
//         Model.Article.find(doc.comment).sort({_id: -1}).limit(limit).skip(skip).then(function(docs){
//           console.log(docs);
//             responseData.code = 200;
//             responseData.message = '查找所有评论成功';
//             responseData.data = docs;
//             responseData.count = count;
//             responseData.limit = limit;
//             responseData.page = page;
//             responseData.pages = pages;
//             responseData.skip = skip;
//             console.log(responseData);
//             res.json(responseData);
//         })
//       })
//     }
//   })
// })

// 文章详情,提交新的评论
router.post('/index_detail', function(req, res, next){
  var newComment = req.body.newComment;
  var _id = req.body._id;
  var user = req.body.user;
  var date = new Date(),
    yy = date.getFullYear(),
    MM = date.getMonth() + 1,
    dd = date.getDate(),
    hh = date.getHours(),
    mm = date.getMinutes(),
    ss = date.getSeconds();
  newData ={
    user: user,
    comments: newComment,
    time: time
  }
  Model.Article.findOne({_id: _id}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      doc.comment.push(newData);
      doc.save();
      responseData.code = 200;
      responseData.message = '评论成功';
      responseData.data = doc;
      res.json(responseData);
    }
  })
})
// 点赞
router.post('/index_detail_like',function(req, res, next){
  var like = req.body.like;
  var _id = req.body._id;
  Model.Article.findOne({_id: _id}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      doc.like++;
      doc.save();
      responseData.code = 200;
      responseData.message = '点赞成功';
      responseData.data = doc;
      res.json(responseData);
    }
  })
})
// 取消点赞
router.post('/index_detail_noLike',function(req, res, next){
  var like = req.body.like;
  var _id = req.body._id;
  Model.Article.findOne({_id: _id}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      doc.like--;
      doc.save();
      responseData.code = 200;
      responseData.message = '取消点赞成功';
      responseData.data = doc;
      res.json(responseData);
    }
  })
})

module.exports = router;
