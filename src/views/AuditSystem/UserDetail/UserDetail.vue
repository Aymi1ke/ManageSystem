<template>
	<div class="UserDetail" v-loading="loading">
       <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
         <el-tab-pane label="用户信息" name="first">
           <Info :detail="detail"></Info>
         </el-tab-pane>
         <el-tab-pane label="运营商报告" name="second">
           <Report :url="url" ></Report>
         </el-tab-pane>
         <el-tab-pane label="运营商通话记录" name="third">
           <Call :call="call" :teltotal="teltotal"></Call>
         </el-tab-pane>
         <el-tab-pane label="通讯录" name="fourth">
           <Addressbook :bookList="bookList" :booktotal="booktotal"></Addressbook>
         </el-tab-pane>
         <el-tab-pane label="通话记录" name="fifth">
           <CollLog :callList="callList" :calltotal="calltotal"></CollLog>
         </el-tab-pane>
         <el-tab-pane label="短信记录" name="sixth">
           <SMSrecord :SMSList="SMSList" :total="total"></SMSrecord>
         </el-tab-pane>
         <el-tab-pane label="芝麻信用分" name="seventh">
           <Zhima :zhima="zhima"></Zhima>
         </el-tab-pane>
         <el-tab-pane label="借款记录" name="eighth">
           <Record :Record="Record" :loantotal="loantotal"></Record>
         </el-tab-pane>
         <el-tab-pane label="风控" name="ninth">
           <Risk :Risk="Risk" :RiskTitle="RiskTitle"></Risk>
         </el-tab-pane>
         <el-tab-pane label="GPS位置记录" name="tenth">
           <GPRS :markers="markers" :center="center" :GPRStotal="GPRStotal"></GPRS>
         </el-tab-pane>
       </el-tabs>
	</div>
</template>

<script>
  import Info from '@/components/common/Info/Info'
  import Report from '@/components/common/Report/Report'
  import Addressbook from '@/components/common/Addressbook/Addressbook'
  import Record from '@/components/common/Record/Record'
  import Zhima from '@/components/common/Zhima/Zhima'
  import Risk from '@/components/common/Risk/Risk'
  import GPRS from '@/components/common/GPRS/GPRS'
  import CollLog from "@/components/common/CollLog/CollLog";
  import SMSrecord from "@/components/common/SMSrecord/SMSrecord";
  import Call from '@/components/common/Call/Call'
	export default {
		name: 'UserDetail',
    inject:["reload"],
    components:{
		  Info,
      Report,
      Addressbook,
      Record,
      Zhima,
      Risk,
      GPRS,
      SMSrecord,
      CollLog,
      Call
    },
		data() {
			return {
        center: [120.2492253184204, 30.23948908346903],
        activeName: 'first',
        radio:false,
        remarks:'',
        detail:[],
        bookList:[],
        callList:[],
        SMSList:[],
        Record:[],
        call:[],
        teltotal:0,
        total:0,
        calltotal:0,
        booktotal:0,
        GPRStotal:0,
        loantotal:0,
        zhima:{},
        Risk:{},
        RiskTitle:{},
        url:"",
        radio:'1',
        currentDate:'',
        userLogins:[],
        markers:[],
        loading:true,
			}
		},
		filters:{
			showStatus(val){
			   if(val==="待审核"){
				   return val
			   }
			}
		},
    created(){


    },
    mounted(){
      this.InitDetail()
    },
		methods:{
      InitDetail(){
        let baseUrl = 'http://118.31.56.223:8080';
        this.$post('/CqUser/viewDetails',{
            userId:sessionStorage.getItem('targetUser')
        }).then(res=>{
          if(res.resultCode==="success"){
            this.loading = false;
            this.detail = res.resultData.basicInfo;  //个人基本信息
            let targetUrl = res.resultData.operatorHtml;
            let str = 'https://qz.xinyan.com/';
            if (targetUrl.indexOf(str)>=0){
              this.url= targetUrl;            //运营商报告H5页面
            }else{
              this.url= baseUrl+targetUrl;   //运营商报告H5页面
            }
            this.zhima = res.resultData.sesameSeed;          //芝麻分
            this.Risk = res.resultData.windControlReport;
            this.RiskTitle = this.Risk.title;
            this.userLogins = res.resultData.cqUserLogins;    //GPRS记录
            let markerGroup = [];
            for (let i = 0; i < this.userLogins.length; i++) {
              let location = {};
              location.lng = this.userLogins[i].lastLoginLng;
              location.lat = this.userLogins[i].lastLoginLat;
              location.date =this.userLogins[i].createTime;
              markerGroup.push(location);
            }
            markerGroup.forEach((item)=>{
              this.markers.push({
                position:[item.lng,item.lat],
                date:item.date
              })
            })
            this.GPRStotal = this.markers.length;
            this.center = this.markers[0].position;
            this.call = res.resultData.operatorRaw;
            this.teltotal = this.call.length;
            this.Record = res.resultData.loanRecord;          //借款记录
            this.loantotal = this.Record.length;
            this.bookList = res.resultData.contact;           //通话本
            this.booktotal = this.bookList.length;
            this.callList = res.resultData.callRecord;        //通话记录
            this.calltotal = this.callList.length;
            this.SMSList = res.resultData.sms;               //短信
            this.total = this.SMSList.length;
          }else{
            this.$message({
              type: 'error',
              message: res.resultMessage
            })
          }
        }).catch(error=>{

        })
      },
      handleClick(tab, event) {

      },

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row{
	margin-bottom:20px;
}


</style>
