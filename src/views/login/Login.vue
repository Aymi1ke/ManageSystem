<template>
  <div class="login">
     <div class="LOGIN-BG">
		   <div class="login-mancl">
				  <div class="half">
						<img src="../../../static/img/logo-v.png"/>
					</div>
					<div class="loginbox box-shadow">
						<p class="P1">橙仟科技-小花口袋管理系统</p>
						<p class="p2">请登录</p>
						<el-form :model="form" status-icon ref="form" class="demo-ruleForm" style="width: 85%;margin: 0 auto;">
								<el-form-item prop="name" >
									<input type="text" v-model="form.name"  placeholder="请输入账号"  class='userbox'/>
								</el-form-item>
								<el-form-item prop="password">
									<input type="password" v-model="form.password"  placeholder="请输入密码"  @keyup.enter="onSubmit" class="pwdbox" />
								</el-form-item>
								<el-form-item>
									<el-button  @click.native="onSubmit" @keyup.enter.native="onSubmit" class="subtn box-shadow" >登录</el-button>
								</el-form-item>
						</el-form>
					</div>

			 </div>


	 </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        form:{
          name:'',
          password:''
        }
      }
    },
    methods: {
      //登录
      onSubmit() {
        if (this.form.name.length == 0) {
          this.$message({
            message: '帐号不为空',
            type: 'warning',
            duration: 1000
          });
          return false;
        } else if (this.form.password.length == 0) {
          this.$message({
            message: '密码不为空',
            type: 'warning',
            duration: 1000
          });
          return false;
        } else {
          this.$post('/Login', this.form).then(res => {
            if (res.resultCode === "success") {
              this.$message({
                message: res.resultMessage,
                type: 'success',
                duration: 1000,
                onClose: () => {
                  //跳转首页
                  this.$router.push("/");
                }
              });
              sessionStorage.setItem('pid',res.resultData.pid);
            } else {
              this.$message({
                message: res.resultMessage,
                type: 'error',
              })
            }
          }).catch(error => {

          })
        }
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.LOGIN-BG{
	width: 100vw;
	height: 100vh;
	background: url(../../../static/img/login_bg.png) no-repeat;
	background-size: cover;
	position: relative;
}
.login-mancl{
	width: 25em;
	height: 32em;
	position: absolute;
	top: 12%;
	left: 63%;
	z-index: 99;
}
.half{
	width: 4em;
	height: 4em;
	border-radius: 50%;
	background: #fff;
	position: absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%);
	z-index: 101;
}
.half img{
	width: 70%;
	height: 70%;
	margin: .6em;
}
.loginbox{
	width: 25em;
	height: 30em;
	background: #fff;
	text-align: center;
	position: absolute;
	top: 2em;
	left: 0;
	border-radius: 10px;
}
.P1{
	font-family: Microsoft YaHei;
	margin-top: 4em;
	color: #FB5E5E;
	font-weight: bold;
	font-size: 1.05em;
}
.p2{
	margin: .8em 0 2.3em;
	color: #D8D3D3;
}
input[type="text"],
	[type="password"] {
		width: 100%;
		height: 45px;
		outline-color: #67C23A;
		border: 1px solid #ebedef;
		font-size: 16px;
		border-radius: 7px;
		text-indent: 15px;
		margin-bottom: 8px;
		position: relative;
		 outline: none;

	}
	.subtn {
		width: 100%;
		height: 45px;
		font-size: 18px;
		letter-spacing: 1px;
		margin-top: 30px;
		background: #F54747;
		color: #fff;
		border-radius: 20px;
	}
	.userbox{
		background: url(../../../static/img/m.png) no-repeat 96% 50%;
		background-size:6%;
	}
	.pwdbox{
		background: url(../../../static/img/s.png) no-repeat 96% 50%;
		background-size:6%;
	}
</style>
