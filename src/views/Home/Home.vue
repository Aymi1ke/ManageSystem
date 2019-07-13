<template>
  <div class="home">
    <el-container style="height: 100vh" v-loading="loading">

        <el-aside width="200px" :class="isCollapse===true?'menu-collapse-width':'menu-width'" >
          <el-scrollbar style="height: 100%;">
          <div class="headleft" >
            <blockquote v-show="!isCollapse">
              <img src="../../../static/img/logo.png" />
              <p>橙仟科技</p>
            </blockquote>
          </div>
          <!--导航菜单-->
            <el-menu :default-active="$route.path" class="el-menu-vertical" @open="handleOpen" @close="handleClose" @select="handleSelect"
                     unique-opened   :collapse="isCollapse"  active-text-color="#FB6262" text-color="#333" router >
              <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <template v-for="(item,index) in parent" v-if="!item.hidden">
                <el-submenu :index="index+''" v-if="!item.leaf">
                  <template slot="title"><i class="iconset" :class="item.icon"></i><span v-show="!isCollapse">{{item.title}}</span></template>
                  <el-menu-item  v-for="child in item.children"   :index="child.url" :key="child.url" v-if="!child.hidden">{{child.title}}</el-menu-item>
                </el-submenu>
              </template>
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <el-container>
          <el-header>
            <el-row >
              <el-col :span="4">
                <div class="tools">
                  <i class="el-icon-s-fold" v-show="!isCollapse"  @click.prevent="isCollapse=true"></i>
                  <i class="el-icon-s-unfold" v-show="isCollapse" @click.prevent="isCollapse=false"></i>
                </div>
              </el-col>
              <el-col :span="20" >
                <el-dropdown trigger="click" style="float: right;">
            <span class="el-dropdown-link">
              <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=480194109,2955193021&fm=26&gp=0.jpg" class="imge"/>
            {{rDesc}} : {{name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                  <el-dropdown-menu slot="dropdown" style="width: 100px;text-align: center">
<!--                    <el-dropdown-item>消息中心</el-dropdown-item>-->
<!--                    <el-dropdown-item>修改密码</el-dropdown-item>-->
                    <el-dropdown-item   @click.native="isLogout()">安全退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-header>

            <el-main>
              <el-scrollbar style="height: 100%">
               <tabNav/>

                <router-view v-if="isRouterAlive" class="main"></router-view>
              </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>

  </div>
</template>

<script>
  import TabNav from '../../components/TabNav'
  export default {
    name: 'Home',
    components: {
      TabNav,
    },
    provide(){
      return{
        reload:this.reload
      }
    },
    data() {
      return {
        isRouterAlive:true,
        isCollapse:false,
        loading:true,
        role:'',
        name:'',
        rDesc:'',
        parent:[],
        menu:[]
      }
    },
    mounted(){
     this.getInitPage();
    },
    methods: {
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      },
      getInitPage(){
        this.$post('/getUserPrivileges',{
          pid:sessionStorage.getItem('pid')
        }).then(res=>{
          if (res.resultCode =='success'){
            this.loading = false;
            this.parent = res.resultData.userPermission.sysMenus;
            this.menu = res.resultData.userPermission.parentMenu;
            this.parent.forEach((item)=>{
              this.$delete( item,'createTime');
              let children = [];
              for (let i = 0;i<this.menu.length;i++) {
                this.$delete(this.menu[i],'createTime')
                if(item.mid === this.menu[i].parentId){
                  children.push(this.menu[i]);
                  this.$set(item,'children',children)
                  this.$set(item,'level',item.title)
                  this.$set(this.menu[i],'level',item.title)
                }
              }

            });
            this.$store.dispatch('SET_MENU',this.parent)
            this.rDesc = res.resultData.userPermission.rDesc;
            this.name = res.resultData.userPermission.name;
            sessionStorage.setItem('name',this.name);
          }else{
            this.$message({
              message:res.resultMessage,
              type:'error'
            })
            this.loading = false;
          }
        }).catch(error=>{
          this.loading = false;
        })
      },

      isLogout() {
        this.$post('/Logout').then(res => {
          this.$confirm('您確定要退出嗎, 是否继续?', '退出', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.$store.commit("LOGOUT");
            this.$router.push("/login");
          }).catch(() => {

          });

        }).catch(error => {

        })
      },
      handleOpen(key, keyPath) {
       // console.log('打开' + key, keyPath);
      },
      handleClose(key, keyPath) {
       // console.log('关闭' + key, keyPath);
      },
      handleSelect(key, keyPath) {
       // console.log('选中' + key, keyPath);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    margin-top: .5em;
    margin-left: .5em;
  }
  .imge {
    width: 2.4em;
    height:2.4em;
    border-radius: 50%;
    vertical-align: middle;
  }
  .tools{
    font-size: 26px;
    cursor: pointer;
  }

  left {
    text-align: center;
  }
  .headleft{
    height: 72px;
    background:#FB6262;
    text-align:center;
    color:#fff;
    font-size:.75em;
  }
  .headleft img{
    margin: 12px 0 5px;
    width:2.18em;
    height:2.18em;
  }

  .iconset{
    font-size: 22px;
    margin-right: 8px;
  }

</style>
