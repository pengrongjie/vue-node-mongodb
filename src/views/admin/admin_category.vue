<template lang="html">
  <div class="category">
    <nav-bread>
      <span>所有分类</span>
    </nav-bread>
    <div class="table-box">
      <div class="table-top">
        <router-link to="/admin_category_add"><button type="button" name="button"><i class="el-icon-plus"></i> 新的分类</button></router-link>
      </div>
      <table>
        <tr>
          <th>序号</th>
          <th>_id</th>
          <th>分类名</th>
          <th>时间</th>
          <th>操作</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in category">
          <td>{{ index}}</td>
          <td>{{ item._id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.time }}</td>
          <td><router-link :to="{ path: '/admin_category_update', query: {_id: item._id} }"><button type="button" class="updateButton">修改</button></router-link></td>
          <td @click="del(item._id)"><button type="button" class="delButton">删除</button></td>
        </tr>
      </table>
    </div>
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
import navBread from '../../components/navBread'
export default {
  data(){
    return{
      category:'',
      count: '',
      pages: '',
      page: '',
      limit: '',
      skip: ''
    }
  },
  components:{
    navBread
  },
  methods:{
    getData(){
      this.$http.get('/admin/admin_category').then((response) => {
        console.log(response.data);
        this.category = response.data.data;
        this.count = response.data.count;
        this.pages = response.data.pages;
        this.page = response.data.page;
        this.limit = response.data.limit;
        this.skip = response.data.skip;
        console.log(this.category);
      })
    },
    del(obj){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/admin/admin_category_del',{
            _id: obj
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除一个分类成功!'
            });
            this.getData();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
      this.$http.get('/admin/admin_category?page=' + this.page).then((response) => {
        console.log(response.data);
        this.category = response.data.data;
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
      this.$http.get('/admin/admin_category?page=' + this.page).then((response) => {
        console.log(this.$route.path);
        console.log(this.$route.fullPath);
        console.log(window.location.href);
        console.log(response.data);
        this.category = response.data.data;
      })
    }
  },
  created(){
    this.getData();
  }
}
</script>

<style lang="less" scoped>
.category{
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
}
</style>
