<template>
    <div class="audituser" v-loading="loading">
      <el-tabs v-model="activeName"  stretch>
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
      <div class="operate-box">
        <el-row>
          <p class="le-title">审核操作</p>
          <el-col :lg="6" :xs="24" :sm="12" :md="6"  :xl="6">
            <p class="xtitle">审核状态</p>
            <div style="width: 100%;margin-left: 15px">
              <i :class="auditState=='1'?'el-icon-warning':auditState=='0'?'el-icon-success':auditState=='3'?'el-icon-error':'el-icon-question'"
              :style="{color:auditState=='1'?'#F6D373':auditState=='0'?'#76E3B3':auditState=='3'?'#F54747':'#909399'}">
                {{auditState=='1'?'待审核':auditState=='0'?'通过':auditState=='3'?'拒绝':'未提交'}}</i>
            </div>

          </el-col>
          <el-col :lg="6" :xs="24" :sm="12" :md="6"  :xl="6">
            <p class="xtitle">处理人</p>
            <div style="width: 100%;margin-left: 15px">
              <p style="color: #563E3E">{{name}}</p>
              <p style="margin-top: 10px;font-size: 0.8em;color: #A49797">处理时间:{{currentDate| formatDate}}</p>
            </div>

          </el-col>
          <el-col :lg="6" :xs="24" :sm="12" :md="6"  :xl="6">
            <p class="xtitle">审核</p>
            <div style="width: 100%;margin-left: 15px">
              <el-button  class="audit" @click.native="auditOrder" >审核</el-button>
            </div>
          </el-col>
          <el-col :lg="6" :xs="24" :sm="12" :md="6"  :xl="6">
            <p class="xtitle">操作</p>
            <div style="width: 100%;margin-left: 15px">

                <el-button  size="mini" icon="el-icon-plus"  class="add white">加入白名单</el-button>
              <span ref="black" >
                    <el-popover placement="top" trigger="click" >
                      <p class="sf-red">确定执行加入黑名单吗?</p>
                      <div style="text-align: center;">
                        <el-button size="mini" @click.native.prevent="$refs.black.click()">取消</el-button>
                        <el-button type="primary" size="mini" @click.native.prevent="handleAddBlack">确定</el-button>
                      </div>
                      <el-button  slot="reference" size="mini" icon="el-icon-plus"  class="add black">加入黑名单</el-button>
                    </el-popover>
               </span>
            </div>
          </el-col>
        </el-row>
      </div>

    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import Info from '@/components/common/Info/Info'
  import Report from '@/components/common/Report/Report'
  import Addressbook from '@/components/common/Addressbook/Addressbook'
  import Record from '@/components/common/Record/Record'
  import Zhima from '@/components/common/Zhima/Zhima'
  import Risk from '@/components/common/Risk/Risk'
  import GPRS from '@/components/common/GPRS/GPRS'
  import {formatDate} from "@/config/common.js";
  import CollLog from "@/components/common/CollLog/CollLog";
  import SMSrecord from "@/components/common/SMSrecord/SMSrecord";
  import Call from '@/components/common/Call/Call'
    export default {
        name: "AuditUser",
      inject: ["reload"],
      components:{
        SMSrecord,
        CollLog,
        Info,
        Report,
        Addressbook,
        Record,
        Zhima,
        Risk,
        GPRS,
        Call
      },
      data(){
          return{
            center: [120.2492253184204, 30.23948908346903],
            activeName: 'first',
            radio:false,
            remarks:'',
            detail:[],
            auditState:2,
            bookList:[],
            call:[],
            callList:[],
            SMSList:[],
            Record:[],
            total:0,
            teltotal:0,
            calltotal:0,
            booktotal:0,
            GPRStotal:0,
            loantotal:0,
            url:"",
            zhima:{},
            Risk:{},
            RiskTitle:{},
            radio:'1',
            currentDate:'',
            userLogins:[],
            markers:[],
            name:'',
            loading:true,
          }
      },
      filters:{
        formatDate(){
          let date = new Date();
          return formatDate(date,'yyyy-MM-dd hh:mm:ss')
        },
      },
      mounted(){
        this.InitDetail();
        this.name = sessionStorage.getItem('name')
      },
      methods: {
        InitDetail() {
          let baseUrl = 'http://118.31.56.223:8080';
          this.$post('/CqUser/viewDetails', {
            userId: sessionStorage.getItem('targetUser'),
            userName: sessionStorage.getItem('name')
          }).then(res => {
            if (res.resultCode === "success") {
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
              });
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
              this.auditState = res.resultData.basicInfo[0].auditStatus;     //个人审核最终状态
            } else {
              this.$message({
                type: 'error',
                message: res.resultMessage
              })
            }
          }).catch(error => {

          })
        },
        rejectOrder() {
          this.$post('/CqUser/auditResult', {
            userId: this.$route.query.id,
            auditResult: "20",
            userName: sessionStorage.getItem('name'),
          }).then(res => {
            if (res.resultCode === "success") {
              this.$message({
                message: res.resultMessage,
                type: 'danger'
              });
              this.reload();
            } else {
              this.$message({
                type: 'error',
                message: res.resultMessage
              })
            }
          }).catch(error => {

          })
        },
        passOrder() {
          this.$post('/CqUser/auditResult', {
            userId: this.$route.query.id,
            auditResult: "10",
            userName: sessionStorage.getItem('name'),
          }).then(res => {
            if (res.resultCode === "success") {
              this.$message({
                message: res.resultMessage,
                type: 'success'
              });
              this.reload();
            } else {
              this.$message({
                type: 'error',
                message: res.resultMessage
              })
            }
          }).catch(error => {

          })
        },

        auditOrder() {
          this.$confirm('是否审核通过?', '审核', {
            distinguishCancelAndClose: true,
            closeOnClickModal: false,
            confirmButtonText: '通过',
            cancelButtonText: '拒绝',
            callback: (action, instance) => {
              if (action === 'confirm') {
                this.passOrder();
              } else if (action === 'cancel') {
                this.rejectOrder();
              } else {
               return false
              }
            }
          });
        },
        handleAddBlack(){
          this.$post('/CqUser/moveToBlacklist',{
            userId: sessionStorage.getItem('targetUser')
          }).then(res=>{
            if(res.resultCode==="success") {
              this.$message({
                message: res.resultMessage,
                type: 'success'
              });
              this.reload();
            }else {
              this.$message({
                message: res.resultMessage,
                type: 'error'
              });
            }
          }).catch(error=>{

          })
        }
      }

    }
</script>

<style scoped>
  .operate-box{
    background: #fff;
    padding: 15px;
    margin-top: 20px;
  }
  .audit{
    background: #6FE59E;
    color: #fff;
    width: 120px;
    height: 36px;
    font-size: 16px;
    outline: none;
  }
  .le-title{
    font-size:1.2em;
    color:#A49797;
    font-weight:bold;
    margin-bottom:20px;
    margin-left:20px;
  }
  .xtitle{
    color: #563E3E;
    fint-size:0.8em;
    line-height: 19px;
    margin: 0 0 15px 15px;
  }
  .add{
   width: 100px;
   margin-bottom: 10px;
   display: block;
  }
  .white{
    border: 1px solid #6B7DF1;
    color: #6B7DF1;
  }
  .black{
    border: 1px solid #FE6B6B;
    color: #FE6B6B;
  }
</style>
