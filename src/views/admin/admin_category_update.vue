<template lang="html">
  <div class="admin_category_update">
    <nav-bread>
      <span>分类修改</span>
    </nav-bread>
    <div class="form-group">
      <p>分类名</p>
      <input type="text" v-model="oldCategoryTitle" placeholder='请输入分类名'>
    </div>
    <button type="button" @click='UpdateCategory(oldCategoryId)'>修改</button>
  </div>
</template>

<script>
  import navBread from '../../components/navBread'
  export default {
    data() {
      return {
        oldCategory:'',
        oldCategoryTitle: '',
        oldCategoryId: ''
      }
    },
    components:{
      navBread
    },
    methods:{
      UpdateCategory(obj){
        var that = this;
        this.$http.post('/admin/admin_category_update',{
          _id: obj,
          title: this.oldCategoryTitle
        }).then((response) => {
          console.log(response.data);
          this.$message({
            message: '修改成功，1秒后跳转到分类列表',
            type: 'success'
          });
          setTimeout(function(){
            that.$router.push({path: '/admin_category'});
          },1000)
        })
      }
    },
    created(){
      this.$http.get('/admin/admin_category_update?_id=' + this.$route.query._id).then((response) => {
        console.log(response.data);
        this.oldCategory = response.data.data;
        this.oldCategoryTitle = response.data.data.title;
        this.oldCategoryId = response.data.data._id;
      })
    }
  }
</script>

<style lang="less" scoped>
h1{
  margin: 20px 0;
  margin-left: 120px;
}
button{
  margin-left: 120px;
  height: 35px;
  line-height: 35px;
}
</style>
