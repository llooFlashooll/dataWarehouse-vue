<template>
  <div class="page">

    <el-card class="box" shadow="always">
      <el-row class="title">
        <h2>注册</h2>
      </el-row>
      <el-form label-width="0">
        <el-form-item>
          <i class="el-icon-user"></i>
          <el-input class="form-input" v-model="username" placeholder="用户名">
          </el-input>
        </el-form-item>

        <el-form-item>
          <i class="el-icon-s-goods"></i>
          <el-input class="form-input" v-model="password" placeholder="密码" show-password>
          </el-input>
        </el-form-item>

        <el-form-item >
          <i class="el-icon-s-goods"></i>
          <el-input class="form-input" v-model="confirmPassword" placeholder="确认密码" show-password>
          </el-input>
        </el-form-item>

        <el-form-item >
          <i class="el-icon-message"></i>
          <el-input class="form-input" v-model="email" placeholder="邮箱">
          </el-input>
        </el-form-item>

        <el-form-item>
          <i class="el-icon-position"></i>
          <el-input class="form-input verifyCode" v-model="verifyCode" placeholder="验证码">
          </el-input>
          <el-button type="primary" class="form-button btnCode" v-on:click="getVerifyCode" round>获取验证码</el-button>
        </el-form-item>

        <el-form-item class="register">
          <el-button type="primary" class="form-button" v-on:click="register" round>注册</el-button>
          <el-button type="primary" class="form-button" v-on:click="toLogin" round>去登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      username:'',
      password:'',
      confirmPassword:'',
      email:'',
      verifyCode:'',
    }
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color: aliceblue')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  methods:{
    getVerifyCode:function() {

    },

    register:function() {
     
    },

    toLogin:function(){
      location="./login";
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page {
  width: 100%;
  /* height: 100%;
  background-color: aliceblue; */
}

.box {
  width: 30%;
  margin-top: 100px;
  margin-left: 35%;
}

.title {
  text-align: center;
}

.form-input {
  width: 80%;
}

.verifyCode {
  width: 55%;
}

#verifyCode {
  margin-right: 10%;
}

.el-icon-user {
  font-size: 25px;
  margin: 0 20px;
}

.el-icon-s-goods {
  font-size: 25px;
  margin: 0 20px;
}

.el-icon-message {
  font-size: 25px;
  margin: 0 20px;
}

.el-icon-position {
  font-size: 25px;
  margin: 0 20px;
}

.btnCode {
  margin-left: 15px;
  padding: 11px;
}

.register {
  text-align: center;
}
</style>