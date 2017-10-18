<template lang="html">
  <div class="admin_article_comment">
    <nav-bread>
      <span><router-link to="/admin_article">文章管理</router-link></span> / <span>{{ articleData.title }}</span>
    </nav-bread>
    <div class="table-box">
      <div class="table-top">
        <button type="button" name="button">评论总数 ({{ commentDataLength }})</button>
      </div>
      <table>
        <tr>
          <th>序号</th>
          <th>评论者</th>
          <th>评论时间</th>
          <th>评论内容</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in commentData">
          <td>{{index}}</td>
          <td>{{ item.user }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.comments }}</td>
          <td @click="del(index,item,articleData_id)"><button type="button" class="delButton">删除</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import navBread from '../../components/navBread'
export default {
  data(){
    return{
      articleData: '',
      articleData_id: '',
      commentData: '',
      commentDataLength: ''
    }
  },
  components:{
    navBread
  },
  methods:{
    getData(){
      this.$http.get('/admin/admin_article_comment?_id=' + this.$route.query._id).then((response) => {
        console.log(response.data);
        this.articleData = response.data.data;
        this.articleData_id = response.data.data._id;
        this.commentData = response.data.data.comment;
        this.commentDataLength = response.data.data.comment.length;
      })
    },
    del(index,item,articleData_id){
      console.log("当前点击的数据为:" + item.user,item.comments,item.time,articleData_id);
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/admin/admin_article_comment',{
            user: item.user,
            comments: item.comments,
            time: item.time,
            _id: articleData_id
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getData();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  },
  created(){
    this.getData();
    // this.$http.get('/admin/admin_article_comment_test' + this.$route.query._id).then((response) => {
    //   console.log("评论分页数据:" + response.data);
    // })
  }
}

</script>

<style lang="less" scoped>
.table-top{
  height: 80px;
  h1{
    float: left;
    margin-left: 20px;
    line-height: 80px;
  }
  button{
    float: left;
    height: 35px;
    line-height: 35px;
    margin-top: 22px;
    margin-left: 20px;
  }
}
</style>
