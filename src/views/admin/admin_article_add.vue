<template lang="html">
  <div class="admin_article_add">
    <nav-bread>
      <span>文章增加</span>
    </nav-bread>
    <div class="form-group">
      <p>文章名称</p>
      <input type="text" v-model="articleName" placeholder='请输入文章名称'>
    </div>
    <div class="form-group">
      <p>文章分类</p>
        <select v-model='articleCategory'>
          <option v-for="item in categoryData" >{{ item.title }}</option>
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
      <button type="button" @click='addArticle'>添加</button>
    </div>
  </div>
</template>

<script>
import navBread from '../../components/navBread'
export default {
  data(){
    return{
      articleName: '',
      articleCategory: '',
      articleContent: '',
      categoryData:'',
      editorOption: {},
    }
  },
  components:{
    navBread
  },
  methods:{
    addArticle(){
      var that = this;
      this.$http.post('/admin/admin_article_add',{
        articleName: this.articleName,
        articleCategory: this.articleCategory,
        articleContent: this.articleContent
      }).then((response) => {
        console.log(response.data);
        this.$message({
          message: '增加成功，1秒后跳转',
          type: 'success'
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
    this.$http.get('/index/index_category').then((response) => {
      console.log(response.data);
      this.categoryData = response.data.data;
      console.log(this.categoryData);
    })
  }
}
</script>

<style lang="less" scoped>
h1{
  margin-left: 120px;
}
button{
  margin-top: 70px;
}
.edit{
  margin: 0 40px;
}
.articleContent{
  height: 250px;
}
</style>
