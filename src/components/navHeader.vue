<template lang="html">
  <div class="navHeader">
    <div class="container">
      <div class="left">
        <router-link to="/"><img src="../assets/logo.png" width="60" height="60" alt=""></router-link>
      </div>
      <div class="right">
        欢迎来到 vue+express+mongodb 博客
      </div>
      <div class="github">
        <a href="https://github.com/pengrongjie/vue-node-mongodb" target="_blank">
          <img src="../assets/github-logo.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style lang="less" scoped>
.navHeader{
  height: 80px;
  background-color: #fff;
  box-shadow: 0 5px 5px rgba(0,0,0,0.07);
  .left{
    float: left;
    img{
      margin: 10px;
    }
  }
  .right{
    float: left;
    line-height: 80px;
    margin: 0 20px;
    font-weight: bold;
  }
  .github{
    float: right;
    img{
      width: 60px;
      height: 60px;
      display: block;
      margin: 10px;
    }
  }
}
</style>
