<template lang="html">
  <div class="index_list">
    <!-- 分类列表 -->
    <section class="category-item">
      <ul>
        <li @click="activeChecked = 'all'"  :class="{'actived': activeChecked == 'all'}" >
          <p  @click="selectAllData">All</p></li>
        <li @click="activeChecked = index" :class="{'actived':activeChecked == index }"  v-for="(item,index) in categoryData">
            <span @click="selectData(index,item)">{{item.title}}</span>
        </li>
      </ul>
    </section>
    <!-- 文章简介 -->
    <div class="left-item" v-for="item in articleData">
      <router-link :to="{path: '/detail', query: {_id: item._id }}">
        <h1>{{ item.title }}</h1>
        <p class="info">
          <span><i class="el-icon-menu"></i><i>分类:</i> {{ item.category }}</span>
          <span><i class="el-icon-information"></i><i>作者:</i> {{ item.author }}</span>
          <span><i class="el-icon-search"></i><i>浏览:</i> {{ item.views }}</span>
          <span><i class="el-icon-star-on"></i><i>点赞:</i> {{ item.like }}</span>
          <span><i class="el-icon-message"></i><i>评论:</i> {{ item.comment.length }}</span>
          <span><i class="el-icon-time"></i><i>时间:</i> {{ item.time }}</span>
        </p>
        <p class="desc" v-html="item.content"></p>
        <button type="button">阅读更多</button>
      </router-link>
    </div>
    <!-- 分页 -->
    <section class="page">
      <button type="button" @click="prev">上一页</button>

      <span>当前第 <i>{{ page }}</i> 页</span>/
      <span>总共 <i>{{ pages }}</i> 页</span>/
      <span>每页 <i>{{ limit }}</i> 条数据</span>/
      <span>总共 <i>{{ count }}</i> 条数据</span>

      <button type="button" @click="next">下一页</button>
    </section>
  </div>
</template>

<script>

export default {
  data(){
    return{
      categoryData:'',
      articleData:'',
      count: '',
      page: '',
      pages: '',
      limit: '',
      // activeChecked: '0'
      activeChecked: 'all'
    }
  },
  methods:{
    // 选择所有分类
    selectAllData(){
      this.$http.get('/index/index_article').then((response) => {
        console.log(response.data);
        this.articleData = response.data.data;
        this.count = response.data.count;
        this.page = response.data.page;
        this.pages = response.data.pages;
        this.limit = response.data.limit;
      });
    },
    // 选择单个分类
    selectData(index,item){
      var category = item.title;
      this.$http.get('/index/index_article_category?category=' + category ).then((response) => {
        console.log(response.data);
        this.articleData = response.data.data;
        this.count = response.data.count;
        this.page = response.data.page;
        this.pages = response.data.pages;
        this.limit = response.data.limit;
      })
    },
    next(obj){
      this.page++;
      if(this.page > this.pages){
        this.page = this.pages;
        this.$message({
          message: '已经是最后一页',
          type: 'warning'
        });
        return;
      }
      this.$http.get('/index/index_article?page=' + this.page).then((response) => {
        console.log(response.data);
        this.articleData = response.data.data;
      })
    },
    prev(){
      this.page--;
      if(this.page < 1){
        this.page = 1;
        this.$message({
          message: '已经是第一页',
          type: 'warning'
        });
        return;
      }
      this.$http.get('/index/index_article?page=' + '?page=' + this.page).then((response) => {
        this.articleData = response.data.data;
      })
    }
  },
  created(){
    this.$http.get('/index/index_article').then((response) => {
      console.log(response.data);
      this.articleData = response.data.data;
      this.count = response.data.count;
      this.page = response.data.page;
      this.pages = response.data.pages;
      this.limit = response.data.limit;
    });
    this.$http.get('/index/index_article_category').then((response) => {
      console.log(response.data);
    })
    this.$http.get('/index/index_category').then((response) => {
      console.log(response.data);
      this.categoryData = response.data.data;
    })
  }
}
</script>

<style lang="less" scoped>
.category-item{
  height: 50px;
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 4px;
  ul{
    li{
      float: left;
      padding: 0 20px;
      height: 50px;
      font-weight: bold;
      line-height: 50px;
      cursor: pointer;
      &:hover{
        color: #4fc08d;
        border-bottom: 2px solid #4fc08d;
      }
      &.actived{
        color: #4fc08d;
        border-bottom: 2px solid #4fc08d;
      }
      span{
        display: inline-block;
      }
    }
  }
}
.left-item{
  margin-bottom: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  text-align: left;
  transition: 0.5s;
  &:hover{
    transform: translateY(-6px);
    box-shadow: 0 15px 35px 0 rgba(24, 44, 79, 0.15);
  }
  h1{
    margin: 20px 0;
    font-size: 22px;
  }
  .info{
    margin: 20px 0;
    font-size: 14px;
    span{
      margin-right: 15px;
      color: #999;
      i{
        font-style: normal;
        color: #4fc08d;
        margin-right: 5px;
      }
    }
  }
  .desc{
    width: 800px;
    height: 40px;
    line-height: 40px;
    overflow:hidden;//将超出的部分隐藏
    // text-overflow:ellipsis;//超出部分用省略号显示
    // white-space:nowrap;//溢出不换行
  }
  button{
    width: 100px;
    height: 35px;
    margin-top: 20px;
    line-height: 35px;
    text-align: center;
    background-color: #fff;
    color: #4fc08d;
    border: 1px solid #4fc08d;
    border-radius: 5px;
    outline: none;
    &:hover{
      background-color: #4fc08d;
      color: #fff;
      border: 1px solid #4fc08d;
    }
  }
}
</style>
