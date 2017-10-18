var express = require('express');
var router = express.Router();
var Model = require('../data/module')

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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('localhost:3000/admin首页');
});

router.use(function (req, res, next) {
    console.log(req.userInfo);
    if (!req.cookies.userInfo) {
        responseData.code = 1;
        responseData.message = '没有登录';
        res.json(responseData);
        return;
    }
    next();
})

// 查找所有用户
router.get('/admin_users', function(req, res, next){
  var page = Number(req.query.page || 1);
  var limit = 4;
  var pages = 0;
  Model.User.count().then(function(count){
    pages = Math.ceil(count/limit); //总数据除以每页限制数据=页数
    page = Math.min(page,pages);
    page = Math.max(page,1);
    var skip = (page-1)*limit;

    Model.User.find({}).limit(limit).skip(skip).then(function(doc){
      // console.log(doc);
        responseData.code = 200;
        responseData.message = '查找所有用户成功';
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

// 删除用户
router.post('/admin_users_del', function(req, res, next){
  var _id = req.body._id;
  Model.User.remove({_id: _id}, function(err, doc){
    if(err){
      conosle.log(err);
      return;
    }else{
      responseData.code = '200';
      responseData.message = '删除成功';
      res.json(responseData);
      return;
    }
  })
})

// 查找所有分类
router.get('/admin_category', function(req, res, next){
  var page = Number(req.query.page || 1);
  var limit = 4;
  var pages = 0;
  Model.Category.count().then(function(count){
    pages = Math.ceil(count/limit); //总数据除以每页限制数据=页数
    page = Math.min(page,pages);
    page = Math.max(page,1);
    var skip = (page-1)*limit;

    Model.Category.find({}).sort({_id: -1}).limit(limit).skip(skip).then(function(doc){
      // console.log(doc);
        responseData.code = 200;
        responseData.message = '查找所有分类成功';
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


// 分类增加
router.post('/admin_category_add', function(req, res, next){
  var categoryName = req.body.categoryName;
  console.log('新的分类名为:' + categoryName );
  newCategory= {
    title: categoryName,
    time : yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
  };
  Model.Category.findOne({title: categoryName}, function( doc){
    if(doc){
      responseData.code = 1;
      responseData.message = '分类名已经存在';
      res.json(responseData);
      return;
    }
    else{
      Model.Category.create(newCategory, function(doc){
        responseData.code = 200;
        responseData.message = '增加新的分类成功';
        responseData.data = doc;
        res.json(responseData);
      })
    }
  })
})

// 分类删除
router.post('/admin_category_del', function(req, res, next){
  var _id = req.body._id;
  Model.Category.remove({_id: _id}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      res.send(doc);
    }
  })
});

// 点击修改跳转到分类修改页面
router.get('/admin_category_update', function(req, res, next){
  var _id = req.query._id;
  Model.Category.findOne({_id: _id}, function(err,doc){
    if(err){
      console.log(err);
      return;
    }else{
      responseData.code = 200;
      responseData.message = '查询分类修改id成功';
      responseData.data = doc;
      res.json(responseData);
    }
  })
});

// 分类修改
router.post('/admin_category_update', function(req, res,next){
  var _id = req.body._id;
  var title = req.body.title;
  Model.Category.update({_id: _id}, {$set: {title: title}}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      responseData.code = 200;
      responseData.message = '修改成功';
      responseData.data = doc;
      res.json(responseData);
    }
  })
});


// 查找所有文章
router.get('/admin_article', function(req, res, next){
  var page = Number(req.query.page || 1);
  var limit = 4;
  var pages = 0;
  Model.Article.count().then(function(count){
    pages = Math.ceil(count/limit); //总数据除以每页限制数据=页数
    page = Math.min(page,pages);
    page = Math.max(page,1);
    var skip = (page-1)*limit;

    Model.Article.find({}).sort({_id: -1}).limit(limit).skip(skip).then(function(doc){
      // console.log(doc);
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

// 文章添加页
router.get('/admin_category_add', function(req, res, next){
  Model.Category.find({}, function(err,doc){
    if(err){
      console.log(err);
      return;
    }else{
      responseData.code = 200;
      responseData.message = '查询文章分类成功';
      responseData.data = doc;
      res.json(responseData);
    }
  })
});
// 文章添加操作页面
router.post('/admin_article_add', function(req, res, next){
  var title = req.body.articleName;
  var category = req.body.articleCategory;
  var content = req.body.articleContent;
  var time = yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
  var newArticle = {
    title: title,
    category: category,
    content: content,
    time: time
  }
  Model.Article.create(newArticle, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      responseData.code = 200;
      responseData.message = '查询文章分类成功';
      responseData.data = doc;
      res.json(responseData);
    }
  })
})
// 文章删除
router.post('/admin_article_del', function(req, res, next){
  var _id = req.body._id;
  Model.Article.remove({_id: _id}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      res.send(doc);
    }
  })
});
// 跳转到文章修改页面
router.get('/admin_article_update', function(req, res, next){
  var _id = req.query._id;
  Model.Article.findOne({_id: _id}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      responseData.code = 200;
      responseData.message = '查询要修改文章成功';
      responseData.data = doc;
      res.json(responseData);
    }
  })
})

// 文章修改
router.post('/admin_article_update', function(req, res, next){
  var articleTitle = req.body.articleTitle;
  var articleCategory = req.body.articleCategory;
  console.log('新的文章分类为' + articleCategory);
  var articleContent = req.body.articleContent;
  var articleId = req.body.articleId;
  var newArticle = {
    title: articleTitle,
    category: articleCategory,
    content: articleContent
  }
  Model.Article.update({_id: articleId}, {$set: newArticle}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      // console.log(doc);
      res.send(doc);
    }
  })
})

// 跳转到文章评论管理页面
router.get('/admin_article_comment', function(req, res, next){
  var _id = req.query._id;
  Model.Article.findOne({_id: _id}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      responseData.code = 200;
      responseData.message = '查询当前文章,所有的评论成功';
      responseData.data = doc;
      res.json(responseData);
    }
  })
})

// 删除当前文章的一个评论
router.post('/admin_article_comment', function(req, res, next){
  var _id = req.body._id;
  var user = req.body.user;
  var comments = req.body.comments;
  var time = req.body.time;
  var delData = {
    user: user,
    comments: comments,
    time: time
  }
  console.log("传过来的数据:" + _id,user,comments,time);
  Model.Article.findOne({_id: _id}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else{
      doc.comment.remove(delData);
      doc.save();
      responseData.code = 200;
      responseData.message = '删除当前文章,一条评论成功';
      responseData.data = doc;
      res.json(responseData);
    }
  })
})

module.exports = router;
