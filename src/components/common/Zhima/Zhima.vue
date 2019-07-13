<template>
   <div class="zhibg">
      <el-row>
        <p class="title">芝麻信用分</p>
        <el-col :span="24" class="point">{{zhima.grade}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">真实姓名:{{zhima.realName}}</el-col>
        <el-col :span="8">是否实名认证:{{zhima.realNameAuth =='-1'?'否':'是'}}</el-col>
        <el-col :span="8">芝麻分更新日期:{{zhima.evaluateDate | formatDate}}</el-col>
        <el-col :span="8">是否开通借呗:{{zhima.jiebeiIsClosed =='-1'?'否':'是'}}</el-col>
        <el-col :span="8">借呗额度(元):{{zhima.jiebeiAmount}}</el-col>
        <el-col :span="8">借呗可用额度(元):{{zhima.jiebeiAvailableAmount}}</el-col>
        <el-col :span="8">借呗日利率:{{zhima.jiebeiDayRate}}</el-col>
        <el-col :span="8">借呗是否逾期:{{zhima.jiebeiIsOverdue =='-1'?'否':'是'}}</el-col>
        <el-col :span="8">未还期数:{{zhima.jiebeiUnclearLoanCount =='-1'?'否':'是'}}</el-col>
        <el-col :span="8">抓取时间:{{zhima.dateTime | formatDate}}</el-col>
      </el-row>
     <p style="color: #A49797;margin-top: 55px">芝麻信用评分是一个人的信用状况进行评估的产品，评分范围从350到950，分值越高代表信用越好</p>
   </div>
</template>

<script>
   import {formatDate} from "../../../config/common.js";
    export default {
        name: "Zhima",
        props:{
        "zhima":{
          type:Object,
        }
      },
      data(){
          return{

          }
      },
      filters:{
        formatDate(){
          let date = new Date();
          return formatDate(date,'yyyy-MM-dd hh:mm:ss')
        },
      },

    }
</script>

<style scoped>
  .el-row{
    line-height: 40px;
  }
.zhibg{
  width: 100%;
  background: #F8FEFA;
  text-align: center;
  padding: 25px 0 50px;
  font-size: .9em;
}
.title{
  color: #91DFCC;
  font-size: 22px;
}
.point{
    text-align: center;
    font-size: 50px;
    color: #8CEED6;
    margin: 10px 0 25px;
  }

</style>
