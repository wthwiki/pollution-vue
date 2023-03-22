<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="login-title" style="font-size:30px ; width:350px">用户登录</div>
      <el-form
        :model="user"
        :rules="rules"
        ref="user"
        label-width="0"
        class="main-content"
      >
        <el-form-item prop="username">
          <el-input class="input" v-model="user.username" style="font-size:23px ; width:350px" placeholder="请输入用户名">
            <template #prepend>
              <el-button icon="el-icon-user" style="color: black"></el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            class="input"
            style="font-size:25px ; width:350px"
            v-model="user.password"
            placeholder="请输入密码"
            type="password"
            @keyup.enter="submitForm()"
          >
            <template #prepend>
              <el-button icon="el-icon-lock" style="color: black"></el-button>
            </template>
          </el-input>
        </el-form-item>

        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
    <vue-particles />
  </div>
</template>

<script>
import { toRaw } from "@vue/reactivity";
import store from '@/store';
import storage from '@/utils/storage';
// import { login } from "@/api/login.js"

export default {
  data() {
    return {
      user: {
        username: "root",
        password: "123456",
      },
      rules: {
        deptName: [
          { required: true, message: "<div>用户名不能为空</div>", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "用户名的长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "<div style='font-size:50px'>密码的长度在 3 到 2 0 个字符</div>",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.$store.commit("clearTags");
  },
  methods: {
    submitForm() {
      console.log( this.$refs.user)
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.$store.dispatch("LOGIN", this.user).then((res) => {
            console.log(res.status)
            if (res.status === 200) {
            //   this.$store.dispatch("GET_INFO").then(() => {

            //     const crystal = toRaw(store.state);
            //     console.log(crystal.deptUser.roles);
            //     if (crystal.deptUser.roles[0] !== "admin") {
            //       this.$message.error("权限不够");
            //       this.$router.push("/403");
            //     }else{
            //       this.$message.success("登录成功");
                  this.$router.push("/");
            //     }

                
            //   });
            }
          });
        } else {
          this.$message.error("请输入账号和密码");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="postcss">
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  /* background: url(../assets/img/cafe.png) center center no-repeat; */
  background: url(../assets/img/sky.jpg) center center no-repeat;
  /* background: url(../assets/video/back.mp4) center center no-repeat; */
  background-size: cover;
  .login-content {
    position: absolute;
    right: 10%;
    top: 50%;
    border-radius: 5px;
    margin: -175px 0;
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(48, 52, 54, 0.1) !important;
    min-width: 350px;
    /* &:hover {
      border: 1px solid rgba(48, 52, 54, 0.9) !important;
    } */
    .login-title {
      line-height: 80px !important;
      font-size: 20px;
      /* color: #fff; */
      color: rgb(35, 21, 21);
      text-align: left;
      padding: 0 30px;
      border-bottom: 1px solid #eee;
    }
    .main-content {
      padding: 30px;
      .el-input-group__prepend,
      .el-input__inner {
        background-color: rgba(28, 31, 32, 0.2);
      }
      .login-btn {
        button {
          width: 100%;
          height: 36px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
.input::input-placeholder{color:  rgb(89, 2, 2) !important;} 
::-webkit-input-placeholder { /* WebKit browsers */ 
color: rgb(89, 2, 2) !important; 
font-size: 18px;
} 
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
color: rgb(89, 2, 2) !important; 
font-size: 18px;
} 
::-moz-placeholder { /* Mozilla Firefox 19  */ 
color: rgb(89, 2, 2) !important; 
font-size: 18px;
} 
:-ms-input-placeholder { /* Internet Explorer 10  */ 
color: rgb(89, 2, 2) !important; 
font-size: 18px;
}
</style>

