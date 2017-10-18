<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
*{
  padding: 0;
  margin:0;
}
ul{
  list-style: none;
}
a{
  color: #333;
  text-decoration: none;
}
h1, h2, h3, h4, h5, h6 {
  font-size: 100%;
}
#app {
  background-color: #f5f5f5;
  color: #2c3e50;
}
.container{
  width: 1200px;
  margin: 0 auto;
}
// 表单
.form-group{
  display: flex;
  width: 500px;
  margin: 20px 0;
  p{
    flex: 0 0 100px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-weight: bold;
  }
  input{
    flex: 1;
    height: 40px;
    margin-left: 20px;
    padding-left: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
    &:focus{
      border-color: #66afe9;
      box-shadow:  0 0 8px rgba(102, 175, 233, .6);
    }
  }
  textarea{
    flex: 1;
    height: 100px;
    margin-left: 20px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
    &:focus{
      border-color: #66afe9;
      box-shadow:  0 0 8px rgba(102, 175, 233, .6);
    }
  }
  select{
    flex: 1;
    height: 40px;
    margin-left: 20px;
    padding-left: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
    &:focus{
      border-color: #66afe9;
      box-shadow:  0 0 8px rgba(102, 175, 233, .6);
    }
  }
  option{
    height: 40px;
    width: 100%;
    margin-left: 20px;
    padding-left: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
  }
}
// 表格
table{
  width: 1200px;
  margin: 0 auto;
  display: table;
  border-collapse: collapse;
}
tr{
  display: table-row;
  height: 40px;
}
th{
  display: table-cell;
  border: 1px solid #ccc;
  height: 40px;
  text-align: center;
  background-color: #f1f1f1;
}
td{
  display: table-cell;
  border: 1px solid #ccc;
  height: 40px;
  text-align: center;
}
button{
  width: 100px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background-color: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}
// 各种色彩按钮
.delButton{
  width: 50px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  background-color: #ea6f5a;
  border: 1px solid #ea6f5a;
}
.updateButton{
  width: 50px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  background-color: #00aaee;
  border: 1px solid #00aaee;
}
.commentButton{
  width: 70px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  background-color: #4fc08d;
  border: 1px solid #4fc08d;
}
// 分页
.page{
  height: 100px;
  line-height: 100px;
  text-align: center;
  button{
    height: 35px;
    line-height: 35px;
    border-radius: 20px;
    border: 1px solid #4fc08d;
    background-color: #fff;
    color: #4fc08d;
    &:hover{
      background-color: #4fc08d;
      color: #fff;
      border: 1px solid #4fc08d;
    }
  }
  span{
    margin: 0 10px;
    line-height: 35px;
    i{
      font-style: normal;
      color: #ea6f5a;
    }
  }
}
// 详情页面内容
.detailContent{
  h1,h2,h3,h4,h5,h6{
    margin: 20px 0;
    font-size: 20px;
  }
  p{
    margin: 20px 0;
    line-height: 30px;
  }
  li{
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
  }
  img{
    display: block;
    margin: 20px auto;
    max-width: 800px;
    height: auto;
  }
}
</style>
