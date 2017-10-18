<template lang="html">
  <div class="admin">
    <section class="top">
      <router-link to="/admin">
        <img class="img" src="../../assets/logo.png" alt="">
        <p class="top-left">欢迎来到vue+express+mongodb后台</p>
      </router-link>
      <p class="top-right" @click="logout">退出</p>
      <router-link to="/"><p class="top-right">返回前台首页</p></router-link>
    </section>
    <section class="list">
      <div class="list-left">
        <el-menu theme="dark" default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
            <el-menu-item-group>
              <router-link to="/admin_users"><el-menu-item index="1-1"><i class="el-icon-menu"></i>用户列表</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-setting"></i>分类管理</template>
            <el-menu-item-group>
              <router-link to="/admin_category"><el-menu-item index="2-1"><i class="el-icon-menu"></i>分类列表</el-menu-item></router-link>
              <router-link to="/admin_category_add"><el-menu-item index="2-2"><i class="el-icon-plus"></i>分类增加</el-menu-item></router-link>
              <router-link to="/admin_category_update"><el-menu-item index="2-3"><i class="el-icon-edit"></i>分类修改</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>文章管理</template>
            <el-menu-item-group>
              <router-link to="/admin_article"><el-menu-item index="3-1"><i class="el-icon-menu"></i>文章列表</el-menu-item></router-link>
              <router-link to="/admin_article_add"><el-menu-item index="3-2"><i class="el-icon-plus"></i>文章增加</el-menu-item></router-link>
              <router-link to="/admin_article_update"><el-menu-item index="3-3"><i class="el-icon-edit"></i>文章修改</el-menu-item></router-link>
              <router-link to="/admin_article_comment"><el-menu-item index="3-4"><i class="el-icon-menu"></i>评论列表</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="list-right">
        <router-view>
        </router-view>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
        this.$http.get('/users/logout').then((respond) => {
          var that = this;
          if(respond.data.code == 200 ){
            this.userCookie = !this.userCookie;
            this.$message({
              message: '退出后台管理平台，返回前台首页',
              type: 'success'
            });
            setTimeout(function(){
              that.$router.push({path: '/'});
            },1000)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .admin{
    background-color: #f1f1f1;
    .top {
      position: fixed;
      top: 0;
      left: 0;
      height: 80px;
      width: 100%;
      overflow: hidden;
      background-color: #1f2d3d;
      .img{
        float: left;
        height: 60px;
        width: 60px;
        margin: 10px 30px;
      }
      .top-left{
        float: left;
        margin-right: 20px;
        line-height: 80px;
        color: #fff;
      }
      .top-right{
        float: right;
        margin-right: 20px;
        line-height: 80px;
        color: #fff;
        cursor: pointer;
      }
    }
    .list{
      margin-top: 80px;
      display: flex;
      .list-left{
        position: fixed;
        top: 80px;
        left: 0;
        flex: 0 0 250px;
        width: 250px;
        height: 100%;
        background-color: #324157;
      }
      .list-right{
        flex: 1;
        margin-left: 250px;
        padding: 20px;
        background-color: #fff;
      }
    }
  }
</style>
