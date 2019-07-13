<template>
    <div class="detail" v-loading="loading">
        <el-tabs v-model="activeName" stretch  @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <Info :detail="detail"></Info>
          </el-tab-pane>
          <el-tab-pane label="通讯录" name="second">
            <Addressbook :bookList="bookList" :booktotal="booktotal"></Addressbook>
          </el-tab-pane>
          <el-tab-pane label="通话记录" name="third">
            <CollLog :callList="callList" :calltotal="calltotal"></CollLog>
          </el-tab-pane>
          <el-tab-pane label="短信记录" name="fourth">
            <SMSrecord :SMSList="SMSList" :total="total"></SMSrecord>
          </el-tab-pane>
          <el-tab-pane label="借款记录" name="fifth">
            <Record :Record='Record' :loantotal="loantotal"></Record>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import Info from '@/components/common/Info/Info'
  import Addressbook from '@/components/common/Addressbook/Addressbook'
  import CollLog from '@/components/common/CollLog/CollLog'
  import SMSrecord from '@/components/common/SMSrecord/SMSrecord'
  import Record from '@/components/common/Record/Record'
    export default {
        name: "DetailData",
      components:{
          Info, Addressbook, CollLog, SMSrecord, Record
      },
      data(){
          return{
            activeName: 'first',
            detail:[],
            bookList:[],
            callList:[],
            SMSList:[],
            Record:[],
            total:0,
            calltotal:0,
            booktotal:0,
            loantotal:0,
            loading:true,
          }
      },
      beforeRouteEnter(to,from,next){
        console.log(this, 'beforeRouteEnter'); // undefined
        console.log(to, '组件独享守卫beforeRouteEnter第一个参数');
        console.log(from, '组件独享守卫beforeRouteEnter第二个参数');
        console.log(next, '组件独享守卫beforeRouteEnter第三个参数');
        next(vm => {
          //因为当钩子执行前，组件实例还没被创建
          // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
          console.log(vm);//当前组件的实例
          vm.id = to.query.id;
          vm.$store.dispatch('SaveUserId',vm.id);
        });
      },
      mounted(){
        this.InitDetail();
        console.log(sessionStorage.getItem('targetUser'));
      },
      methods:{
        handleClick(tab, event) {
          console.log(tab, event);
        },
        InitDetail(){
          let baseUrl = 'http://192.168.101.101:8080';
          this.$post('/CqUser/viewDetails',{
            userId:sessionStorage.getItem('targetUser')
          }).then(res=>{
            if(res.resultCode==="success"){
              this.loading = false;
              this.detail = res.resultData.basicInfo;
              this.bookList = res.resultData.contact;
              this.booktotal = this.bookList.length;
              this.callList = res.resultData.callRecord;
              this.calltotal = this.callList.length;
              this.SMSList = res.resultData.sms;
              this.total = this.SMSList.length;
              this.Record = res.resultData.loanRecord;
              this.loantotal = this.Record.length;
            }else{
              this.$message({
                type: 'error',
                message: res.resultMessage
              })
            }
          }).catch(error=>{

          })
        },
      }
    }









</script>

<style scoped>

</style>
