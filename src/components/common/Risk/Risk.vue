<template>
    <div class="risk">
       <div style="background:#F8FEFA;padding: 20px 30px 50px;text-align: center">
         <el-row>
           <el-col class="deline"><p class="num">风控分</p><p class="point">{{Risk.systemStatus}}</p></el-col>
         </el-row>
         <el-row class="border" >
           <el-col :span="24">

           <p class="title" >相同手机号调用次数(次)</p>
             <el-col :span="8">过去1小时内调用次数:<span class="cnt">{{RiskTitle.mobile_1h_cnt}}</span></el-col>
             <el-col :span="8">过去3小时内调用次数:<span class="cnt">{{RiskTitle.mobile_3h_cnt}}</span></el-col>
             <el-col :span="8">过去12小时内调用次数:<span class="cnt">{{RiskTitle.mobile_12h_cnt}}</span></el-col>
             <el-col :span="8">过去1天内调用次数:<span class="cnt">{{RiskTitle.mobile_1d_cnt}}</span></el-col>
             <el-col :span="8">过去3天内调用次数:<span class="cnt">{{RiskTitle.mobile_3d_cnt}}</span></el-col>
             <el-col :span="8">过去7天内调用次数:<span class="cnt">{{RiskTitle.mobile_7d_cnt}}</span></el-col>
             <el-col :span="8">过去14天内调用次数:<span class="cnt">{{RiskTitle.mobile_14d_cnt}}</span></el-col>
             <el-col :span="8">过去30天内调用次数:<span class="cnt">{{RiskTitle.mobile_30d_cnt}}</span></el-col>
             <el-col :span="8">过去60天内调用次数:<span class="cnt">{{RiskTitle.mobile_60d_cnt}}</span></el-col>
           </el-col>

           <el-col :span="24" style="margin-top: 20px">
           <p class="title">相同身份证调用次数(次)</p>
             <el-col :span="8">过去1小时内调用次数:<span class="cnt">{{RiskTitle.idcard_1h_cnt}}</span></el-col>
             <el-col :span="8">过去3小时内调用次数:<span class="cnt">{{RiskTitle.idcard_3h_cnt}}</span></el-col>
             <el-col :span="8">过去12小时内调用次数:<span class="cnt">{{RiskTitle.idcard_12h_cnt}}</span></el-col>
             <el-col :span="8">过去1天内调用次数:<span class="cnt">{{RiskTitle.idcard_1d_cnt}}</span></el-col>
             <el-col :span="8">过去3天内调用次数:<span class="cnt">{{RiskTitle.idcard_3d_cnt}}</span></el-col>
             <el-col :span="8">过去7天内调用次数:<span class="cnt">{{RiskTitle.idcard_7d_cnt}}</span></el-col>
             <el-col :span="8">过去14天内调用次数:<span class="cnt">{{RiskTitle.idcard_14d_cnt}}</span></el-col>
             <el-col :span="8">过去30天内调用次数:<span class="cnt">{{RiskTitle.idcard_30d_cnt}}</span></el-col>
             <el-col :span="8">过去60天内调用次数:<span class="cnt">{{RiskTitle.idcard_60d_cnt}}</span></el-col>
           </el-col>
         </el-row>
       </div>
    </div>
</template>

<script>
    export default {
        name: "Risk",
      props:{
        Risk:{
          "type":Object
        },
        RiskTitle:{
          type:Object
        }
      },
    }
</script>

<style scoped>
  .el-row{
    line-height: 40px;
  }
  .num{
    color: #999;
    font-size: 22px;
    text-align: left;
    float: left;
    margin-left: 50px;
  }
  .title:before{
    content: "●";
    vertical-align: top;
    margin-right: 5px;
  }
  .deline{
    border-bottom: 1px solid #A49797;
    width: 80%;
    margin: 0 auto 30px;
    height: 50px;
    line-height: 50px;
    float: left;
    vertical-align: top;
    display: inline-block;
  }
  .title{
    color: #666;
    font-size: 18px;
    text-align: left;
    vertical-align: top;
    margin-right: 26px;
    margin-left: 30px;
  }

  .point{
    text-align: right;
    font-size: 60px;
    color: #666;
  }
  .border .el-col{
    border-radius: 5px;
    font-size: 16px;
    color: #AAAAAA;
  }
  .cnt{
    font-size: large;
    color: #666;
    margin-left: 5px;
  }
</style>
