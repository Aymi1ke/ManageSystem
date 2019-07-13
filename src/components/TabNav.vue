<template>
  <div class="tabnav">
    <el-button  style="width:99px;float: right;z-index: 999;" type="primary" size="small" plain @click.native="dbClose">关闭标签页</el-button>
    <div class="tab-nav box-shadow">
      <el-tabs
        v-model="activeIndex"
        type="card"
        closable
        @tab-click="tabClick"
        v-if="options.length"
        @tab-remove="tabRemove">
        <el-tab-pane
          :key="item.name"
          v-for="(item,index) in options"
          :label="item.name"
          :name="item.route">
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
      name: "TabNav",
      computed: {
        options() {
          return this.$store.state.options;
        },
        activeIndex: {
          get() {
            return this.$store.state.activeIndex;
          },
          set(val) {
            this.$store.commit('set_active_index', val);
          }
        }
      },
      mounted() {
        // 刷新时以当前路由做为tab加入tabs
        if (this.$route.path !== '/') {//&& this.$route.path !== '/index'
          if (this.activeIndex === '') {
            this.$store.commit('add_tabs', {route: this.$route.path, name: this.$route.name});
            this.$store.commit('set_active_index', this.$route.path);
          }
        } else if (this.activeIndex === this.$route.path) {
          this.$store.commit('delete_tabs', this.activeIndex)
        } else {
          this.$store.commit('add_tabs', {route: '/', name: '首页'});
          this.$store.commit('set_active_index', '/');
          this.$router.push('/');
        }

      },
      watch: {
        '$route'(to) {
          let flag = false;
          for (let option of this.options) {
            if (option.name === to.name) {
              flag = true;
              this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
              break
            }
          }
          if (!flag) {
            this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name});
            this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
          }
        }
      },
      methods: {

        // tab切换时，动态的切换路由
        tabClick(tab) {
          let path = this.activeIndex;
          this.$router.push({path: path});
        },
        tabRemove(targetName) {
          // 首页不可删除
          if (targetName == '/index') {
            return;
          }
          this.$store.commit('delete_tabs', targetName);
          if (this.activeIndex === targetName) {
            // 设置当前激活的路由
            if (this.options && this.options.length >= 1) {
              this.$store.commit('set_active_index', this.options[this.options.length - 1].route);
              this.$router.push({path: this.activeIndex});
            } else {
              this.$router.push({path: '/'});
            }
          }
        },
        dbClose(){
          let target = this.$store.state.options;
          target.splice(0,target.length-1);
        }
      },
    }
</script>

<style scoped>
.tab-nav{
  width: calc(100% - 100px);
  height: 32px;
  background-color: #fff;
  padding-left: .5em;
}
</style>
