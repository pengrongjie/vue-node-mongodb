<template lang="html">
  <div class="detail">
    <!-- 文章详情 -->
    <section class="detail-content">
      <h1>{{ detailData.title }}</h1>
      <div class="detail-info">
        <p class="info">
          <span><i class="el-icon-menu"></i><i>分类:</i> {{ detailData.category }}</span>
          <span><i class="el-icon-information"></i><i>作者:</i> {{ detailData.author }}</span>
          <span><i class="el-icon-view"></i><i>浏览:</i> {{ detailData.views }}</span>
          <span><i class="el-icon-star-on"></i><i>点赞:</i> {{ detailData.like }}</span>
          <span><i class="el-icon-message"></i><i>评论:</i> {{ commentLength }}</span>
          <span><i class="el-icon-time"></i><i>时间:</i> {{ detailData.time }}</span>
        </p>
        <!-- <div class="content">
          {{ detailData.content }}
        </div> -->
        <div class="detailContent"  v-html="detailData.content">

        </div>
      </div>
    </section>
    <!-- 文章评论 -->
    <section class="comment">
      <div v-if="userCookie" class="comment-isLogined">
        <textarea v-model="newComment" placeholder="段子手，来段评论吧...."></textarea>
        <button class="toComment" @click="gotoComment(detailData._id)" type="button">评论</button>
        <button v-show="showLike == false" class="like" @click="like(detailData._id)">点赞</button>
        <button v-show="showLike == true" class="like" @click="noLike(detailData._id)">取消点赞</button>
      </div>
      <div v-else class="comment-noLogined">
        段子手，你还没有登录，请登录后再进行评论
      </div>
      <div class="comments">
        <h2>当前共有 <span class="number">{{commentLength}}</span> 条评论</h2>
        <div class="comment-item" v-for="item in comments">
          <img class="img" src="../../assets/logo.png" alt="">
          <div class="comment-text">
            <p class="comment-author">{{item.user}}</p>
            <p class="comment-time">{{item.time}}</p>
            <p class="comment-content">{{item.comments}}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 分页 -->
    <!-- <section class="page">
      <button type="button" @click="prev">上一页</button>

      <span>当前第 <i>{{ page }}</i> 页</span>/
      <span>总共 <i>{{ pages }}</i> 页</span>/
      <span>每页 <i>{{ limit }}</i> 条数据</span>/
      <span>总共 <i>{{ count }}</i> 条数据</span>

      <button type="button" @click="next">下一页</button>
    </section> -->
  </div>
</template>

<script>
export default {
  data(){
    return{
      detailData: '',
      newComment: '',
      commentLength: '',
      comments: '',
      showLike: false
      // count: '',
      // page: '',
      // pages: '',
      // limit: '',
    }
  },
  props:{
    userCookie:{
      default: '我是准备接收父类传过来的数据用户cookie，之前的默认数据'
    }
  },
  methods:{
    like(obj){
      this.showLike = !this.showLike;
      this.$http.post('/index/index_detail_like',{
        like: this.detailData.like,
        _id: obj
      }).then((response) => {
        console.log(response.data);
        this.detailData = response.data.data;
      })
    },
    noLike(obj){
      this.showLike = !this.showLike;
      this.$http.post('/index/index_detail_noLike',{
        like: this.detailData.like,
        _id: obj
      }).then((response) => {
        console.log(response.data);
        this.detailData = response.data.data;
      })
    },
    gotoComment(obj){
      if(this.newComment == ""){
        this.$message({
          message: '评论不能为空',
          type: 'error'
        });
        return;
      }
      this.$http.post('/index/index_detail',{
        newComment: this.newComment,
        _id: obj,
        user: this.userCookie.username
      }).then((response) => {
        console.log(response.data);
        this.$message({
          message: '评论成功',
          type: 'success'
        });
        this.$http.get('/index/index_detail_comment?_id=' + this.$route.query._id).then((response) => {
          this.comments = response.data.data;
          this.commentLength = this.comments.length;
        })
      })
    }
  },
  created(){
    // this.getData();
    this.$http.get('/index/index_detail?_id=' + this.$route.query._id).then((response) =>{
      console.log(response.data);
      this.detailData = response.data.data;
      this.comments = response.data.data.comment;
      this.commentLength = response.data.data.comment.length;
    });
  }
}
</script>

<style lang="less" scoped>
  .detail{
    width: 850px;
    .detail-content{
      padding: 20px;
      margin-bottom: 40px;
      background-color: #fff;
      h1{
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 22px;
      }
      .info{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        color: #999;
        font-size: 14px;
        span{
          margin: 0 10px;
          i{
            font-style: normal;
            color: #4fc08d;
            margin-right: 5px;
          }
        }
      }
      .content{
        background-color: red;
        h1{
          height: 100px;
          line-height: 100px;
        }
        p{
          height: 100px;
          line-height: 100px;
        }
      }
    }
    .comment{
      padding: 20px;
      margin-bottom: 40px;
      background-color: #fff;
      h2{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        .number{
          color: #4fc08d;
        }
      }
      .comment-noLogined{
        height: 80px;
        line-height: 80px;
        text-align: center;
        color: #4fc08d;
        font-weight: bold;
      }
      .comment-isLogined{
        height: 220px;
        border-bottom: 1px solid #ccc;
        textarea{
          height: 120px;
          width: 790px;
          margin: 10px 0;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          outline: none;
          &:focus{
            border-color: #66afe9;
            box-shadow:  0 0 8px rgba(102, 175, 233, .6);
          }
        }
        button{
          float: right;
          &.like{
            margin-right: 20px;
            background-color: #fff;
            color: #4fc08d;
            &:hover{
              background-color: #4fc08d;
              color: #fff;
            }
          }
        }
      }
      .comment-item{
        display: flex;
        border-bottom: 1px solid #f1f1f1;
        .img{
          flex: 0 0 40px;
          width: 40px;
          height: 40px;
          margin: 10px;
          border-radius: 50%;
          border-radius: 1px solid #4fc08d;
        }
        .comment-text{
          flex: 1;
          margin-top: 10px;
          .comment-author{
            margin-right: 10px;
            font-size: 14px;
            color: #4fc08d;
          }
          .comment-time{
            font-size: 14px;
            color: #999;
          }
          .comment-content{
            margin: 10px 0;
          }
        }
      }
    }
  }
</style>
