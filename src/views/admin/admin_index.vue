<template lang="html">
  <div class="admin_index">
    <h1>涉及技术</h1>
    <section class="admin_index_box">
      <div class="admin_index_item">
          <img src="../../assets/logo.png" alt="">
        <p class="text">
          <span>前端:</span> vue.js + vue-router + axios
        </p>
      </div>
      <div class="admin_index_item">
        <img src="../../assets/nodejs.png" alt="">
        <p class="text">
          <span>后台:</span> express + element-ui
        </p>
      </div>
      <div class="admin_index_item">
        <img src="../../assets/mongo-db.png" alt="">
        <p class="text">
          <span>数据库:</span> mongodb + mongoose
        </p>
      </div>
    </section>
    <h1>功能总概</h1>
    <section class="admin_index_desc">
      <!-- <h2 >总想找个机会用node(express+mongoose)做后台，vue做前台，整合成一个系统，历时差不多一个月，终于完成了,包括了以下功能</h2> -->
      <div class="admin_index_desc_box">
        <ul>
          <li class="title">前台(index)</li>
          <li><i class="el-icon-circle-check"></i>登录</li>
          <li><i class="el-icon-circle-check"></i>注册</li>
          <li><i class="el-icon-circle-check"></i>退出</li>
          <li><i class="el-icon-circle-check"></i>点赞/取消点选</li>
          <li><i class="el-icon-circle-check"></i>评论</li>
          <li><i class="el-icon-circle-check"></i>浏览次数+1</li>
        </ul>
        <ul>
          <li class="title">后台(admin)</li>
          <li><i class="el-icon-circle-check"></i>用户管理</li>
          <li><i class="el-icon-circle-check"></i>分类管理</li>
          <li><i class="el-icon-circle-check"></i>文章管理</li>
          <li><i class="el-icon-circle-check"></i>评论管理</li>
        </ul>
        <ul>
          <li class="title">待完善</li>
          <li><i class="el-icon-circle-cross"></i>七牛云图片上传</li>
          <li><i class="el-icon-circle-cross"></i>分页组件化</li>
          <li><i class="el-icon-circle-cross"></i>评论分页</li>
          <li><i class="el-icon-circle-cross"></i>分类删除后，文章还显示原来分类</li>
          <li><i class="el-icon-circle-cross"></i>富文本编辑器，转发显示有点问题</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
.admin_index{
  h1{
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 22px;
  }
  .admin_index_box{
    display: flex;
    .admin_index_item{
      flex: 1;
      text-align: center;
      img{
        width: 100px;
        height: 100px;
      }
      .text{
        height: 50px;
        line-height: 50px;
        span{
          color: #4fc08d;
        }
      }
    }
  }
  .admin_index_desc{
    margin-top:20px;
    text-align: center;
    .admin_index_desc_box{
      display: flex;
      ul{
        flex: 1;
        li{
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #f5f5f5;
          text-align: left;
          &.title{
            color: #4fc08d;
          }
          i{
            display: inline-block;
            margin-right: 10px;
          }
        }
      }
    }
  }
}

</style>
