<template lang="html">
  <div class="index">
    <!-- 头部 -->
    <nav-header></nav-header>
    <!-- 内容 -->
    <section class="main container">
      <!-- 左边 -->
      <div class="left">
        <!-- 把登录后的数据传给组件 -->
        <router-view :userCookie="userCookie"></router-view>
      </div>
      <!-- 右边 -->
      <div class="right">
        <div v-show="!userCookie">
          <!-- 登录 -->
          <div class="right-item login" v-show="Login">
            <h1>登录</h1>
            <div class="warnInfo">
              {{loginWarnInfo}}
            </div>
            <div class="input-box">
              <p>用户名:</p>
              <input type="text" v-model="username">
            </div>
            <div class="input-box">
              <p>密码:</p>
              <input type="password" v-model="password">
            </div>
            <button type="button" @click="login">登录</button>
            <p>还没有账号，<span class="goLogin" @click="toggleRegisterLogin">去注册</span></p>
          </div>
          <!-- 注册 -->
          <div class="right-item register" v-show="Register">
            <h1>注册</h1>
            <div class="warnInfo">
              {{registerWarnInfo}}
            </div>
            <div class="input-box">
              <p>用户名:</p>
              <input type="text" v-model="username">
            </div>
            <div class="input-box">
              <p>密码:</p>
              <input type="password" v-model="password">
            </div>
            <div class="input-box">
              <p>确认密码:</p>
              <input type="password" v-model="password2">
            </div>
            <button type="button" @click="register">注册</button>
            <p>已有账号，<span class="goLogin" @click="toggleRegisterLogin">去登录</span></p>
          </div>
        </div>

        <!-- 登录后信息状态 -->
        <div class="right-item logined" v-show="userCookie">
          <!-- <div v-show="Logined"> -->
            <h1>你好，{{userCookie.username}}</h1>
            <p v-if="userCookie.isAdmin === true">
              你是管理员,可以进入 <router-link to="/admin"><span class="goAdmin">后台管理</span></router-link>
            </p>
            <p v-else>欢迎来到我的博客</p>
            <p class="goAdmin" @click="logout">退出</p>
          <!-- </div> -->
        </div>

      </div>
    </section>
    <!-- 底部 -->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import navHeader  from '../../components/navHeader'
import navFooter  from '../../components/navFooter'
export default {
  data(){
    return{
      Login: true,
      Register: false,
      userCookie:'',
      username: '',
      password: '',
      password2: '',
      loginWarnInfo: '',
      registerWarnInfo: ''
    }
  },
  components:{
    navHeader,
    navFooter
  },
  created(){
    // 检查是否登陆
    this.$http.get('/users/checkLogin').then((respond) => {
      if(respond.data.code == 200){
        this.userCookie = respond.data.message;
      }
    })
  },
  methods:{
    // 登陆注册显示隐藏
    toggleRegisterLogin(){
      this.Login = !this.Login;
      this.Register = !this.Register;
    },
    // 登陆
    login(){
      if(this.username == ''){
        if(this.loginWarnInfo = '用户名不能为空');
        return;
      }
      if(this.password == ''){
        if(this.loginWarnInfo = '密码不能为空');
        return;
      }
      this.$http.post('/users/login', {
        username: this.username,
        password: this.password
      }).then((res => {
        if(res.data.code == 1){
          console.log(res.data);
          this.loginWarnInfo = res.data.message;
          console.log(res.data);
          return;
        }else{
          console.log(res.data);
          this.userCookie = res.data.userInfo;
        }
      }))
    },
    // 注册
    register(){
      if(this.username == ''){
        this.registerWarnInfo = '用户名不能为空';
        return;
      }
      if(this.password == ''){
        this.registerWarnInfo = '密码不能为空';
        return;
      }
      if(this.password !== this.password2){
        this.registerWarnInfo = '两次密码不一样';
        return;
      }
      this.$http.post('/users/register',{
        username: this.username,
        password: this.password,
        password2: this.password2
      }).then((res => {
        if(res.data.code == 1){
          this.registerWarnInfo = res.data.message;
          return;
        }else{
          this.registerWarnInfo = '注册成功，请登录';
        }
      }))
    },
    // 退出
    logout(){
      this.$http.get('/users/logout').then((respond) => {
        if(respond.data.code == 200 ){
          this.userCookie = !this.userCookie;
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .index{
    .main{
      display: flex;
      margin-top: 50px;
      .left{
        flex: 1;
      }
      .right{
        flex: 0 0 300px;
        width: 300px;
        margin-left: 50px;
        margin-bottom: 150px;
        text-align: left;
        .right-item{
          padding: 20px;
          border-radius: 5px;
          background-color: #fff;
          transition: 0.5s;
          &:hover{
            transform: translateY(-6px);
            box-shadow: 0 15px 35px 0 rgba(24, 44, 79, 0.15);
          }
          &.logined{
            p{
              margin-top: 20px;
              cursor: pointer;
            }
            .goAdmin{
              color: #e96900;
            }
          }
          h1{
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #4fc08d;
          }
          .warnInfo{
            margin: 20px 0;
            color: #e96900;
          }
          .input-box{
            p{
              height: 35px;
              line-height: 35px;
            }
            input{
              height: 35px;
              width: 250px;
              margin: 10px 0;
              padding-left: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              outline: none;
              &:focus{
                border: 1px solid #00aaee;
              }
            }
          }
          button{
            display: inline-block;
            height: 35px;
            line-height: 35px;
            width: 260px;
            margin: 20px auto;
            border: 1px solid #ccc;
            border-radius: 5px;
            text-align: center;
            background-color: #4fc08d;
            color: #fff;
            outline: none;
          }
          p{
            cursor: pointer;
            .goLogin{
              color: #e96900;
            }
          }
        }
      }
    }
  }
</style>
