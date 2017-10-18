<template lang="html">
  <div class="navBread">
      <router-link class="nav-bread-item" to="/admin">后台首页 /</router-link>
      <slot class="nav-bread-slot"></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.navBread{
  height: 50px;
  margin-left: 20px;
  line-height: 50px;
  .nav-bread-item{
    float: left;
    margin-right: 10px;
    color: #333;
  }
  span{
    color: #e96900;
  }
  slot{
    color: #e96900;
  }
}
</style>
