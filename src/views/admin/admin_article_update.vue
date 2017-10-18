<template lang="html">
  <div class="admin_article_update">
    <nav-bread>
      <span>文章修改</span>
    </nav-bread>
    <div class="form-group">
      <p>文章名称</p>
      <input type="text" v-model="articleTitle" placeholder='请输入分类名'>
    </div>
    <div class="form-group">
      <p>文章分类</p>
      <select v-model="articleCategory">
        <option v-for="item in categoryData" >{{item.title}}</option>
      </select>
    </div>
    <div class="form-group">
      <p>文章内容</p>
      <!-- <textarea v-model="articleContent"></textarea> -->
    </div>
    <div class="edit">
      <quill-editor class="articleContent" v-model="articleContent"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
      <button type="button" @click='updateArticle(articleId)'>修改</button>
    </div>
  </div>
</template>

<script>
import navBread from '../../components/navBread'
export default {
  data(){
    return{
      articleData:'',
      articleTitle: '',
      articleCategory: '',
      articleContent: '',
      articleId: '',
      categoryData: '',
      editorOption: {},
    }
  },
  components:{
    navBread
  },
  methods:{
    updateArticle(obj){
      console.log(this.articleCategory);
      var that = this;
      this.$http.post('/admin/admin_article_update',{
        articleTitle: this.articleTitle,
        articleCategory: this.articleCategory,
        articleContent: this.articleContent,
        articleId: obj
      }).then((response) => {
        console.log(response.data);
        this.$message({
          message: '修改成功，1秒后跳转',
          type: 'info'
        });
        setTimeout(function(){
          that.$router.push({path: '/admin_article'});
        },1000)
      })
    },
    onEditorBlur(editor) {
    },
    onEditorFocus(editor) {
    },
    onEditorReady(editor) {
    },
    onEditorChange({ editor, html, text }) {
      this.content = html
    }
  },
  created(){
    this.$http.get('/admin/admin_article_update?_id=' + this.$route.query._id).then((response) => {
      console.log(response.data);
      this.article = response.data.data;
      this.articleTitle = response.data.data.title;
      this.articleCategory = response.data.data.category;
      this.articleContent = response.data.data.content;
      this.articleId = response.data.data._id;
    })
    this.$http.get('/index/index_category').then((response) => {
      console.log(response.data);
      this.categoryData = response.data.data;
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
  // margin-left: 120px;
  margin-top: 70px;
}
.edit{
  margin: 0 40px;
}
.articleContent{
  height: 250px;
}
</style>
