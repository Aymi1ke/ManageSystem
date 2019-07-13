<template>
  <div class="index">
      <el-row>
        <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
          <div class="six">
            <p class="title_six">今日注册用户(人)</p>
            <div class="icon_six">
              <i class="el-icon-s-custom" style="color: #E37FA1"></i>
            </div>
             <p class="total_six">10</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
          <div class="six">
            <p class="title_six">今日登录人数(人)</p>
            <div class="icon_six">
               <i class="el-icon-s-platform" style="color: #959FD8"></i>
            </div>

            <p class="total_six">10</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
          <div class="six">
            <p class="title_six">今日审批单数(单)</p>
            <div class="icon_six">
               <i class="el-icon-s-check" style="color: #A87EFD"></i>
            </div>

            <p class="total_six">10</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
          <div class="six">
            <p class="title_six">今日放款总额(元)</p>
            <div class="icon_six">
                <i class="el-icon-s-help" style="color: #F9D36C"></i>
            </div>

            <p class="total_six">10</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
          <div class="six">
            <p class="title_six">今日到期已还总额(元)</p>
            <div class="icon_six">
               <i class="el-icon-coin" style="color: #F86C6D"></i>
            </div>

            <p class="total_six">10</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
          <div class="six">
            <p class="title_six">今日到期应还总额(元)</p>
            <div class="icon_six">
               <i class="el-icon-s-order" style="color: #76E1B5"></i>
            </div>

            <p class="total_six">10</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">累计数据</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="12">
                  <ul class="ul_two">
                    <li>历史放款总量(笔)</li>
                    <li>历史展期次数(次)</li>
                    <li>推广渠道总量(个)</li>
                    <li>逾期总笔数(笔)</li>
                  </ul>
                </el-col>
                <el-col :span="12">
                  <ul class="ul_two">
                    <li>历史还款总量(笔)</li>
                    <li>历史展期订单(笔)</li>
                    <li>渠道注册总量(个)</li>
                    <li>再借人数(人)</li>
                  </ul>
                </el-col>
              </el-row>


            </div>

          </el-card>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover"  class="card_two">
            <div slot="header" class="clearfix">
              <span>实时数据</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col :span="12">
                  <ul class="ul_two">
                    <li>待还款总余额(元)</li>
                    <li>累计放款总额(元)</li>
                    <li>展期费用总额(元)</li>
                    <li>头收服务费(元)</li>
                  </ul>
                </el-col>
                <el-col :span="12">
                  <ul class="ul_two">
                    <li>到期未还款总额(元)</li>
                    <li>累计还款总额(元)</li>
                    <li>逾期总金额(元)</li>
                    <li>渠道获客费(元)</li>
                  </ul>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">近15天申请趋势图</span>
            </div>
            <div class="text item">
              <div id="apply15" style="width: 100%;height: 300px;"></div>
            </div>

          </el-card>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">近七天用户统计图</span>
            </div>
            <div class="text item">
               <div id="statiS7" style="width: 100%;height: 300px;"></div>
            </div>

          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">认证通过率</span>
            </div>
            <div class="text item">
              <div id="authPass" style="width: 100%;height: 300px;"></div>
            </div>

          </el-card>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">认证通过率近7天统计</span>
            </div>
            <div class="text item">
              <div id="authRate7" style="width: 100%;height: 300px;"></div>
            </div>

          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">客户端统计</span>
            </div>
            <div class="text item">

            </div>

          </el-card>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">借款客户来自的城市前5</span>
            </div>
            <div class="text item">

            </div>

          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">借款客户来自的省份前5</span>
            </div>
            <div class="text item">

            </div>

          </el-card>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">逾期用户来自的城市前5</span>
            </div>
            <div class="text item">

            </div>

          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">风控</span>
            </div>
            <div class="text item">

            </div>

          </el-card>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">风控7天统计</span>
            </div>
            <div class="text item">

            </div>

          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">年龄</span>
            </div>
            <div class="text item">

            </div>

          </el-card>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">性别</span>
            </div>
            <div class="text item">

            </div>

          </el-card>
        </el-col>
      </el-row>
      <el-row class="jucenter">
        <el-col>
          <el-card shadow="hover" class="card_two">
            <div slot="header" class="clearfix">
              <span style="margin-left: 25px">认证通过率</span>
            </div>
            <div class="text item">
             <el-row>
               <el-col :span="4">
                 <p style="margin-bottom: 10px">身份证</p>
                 <div class="cir_card"></div>
               </el-col>
               <el-col :span="4">
                 <p style="margin-bottom: 10px">活体</p>
                 <div class="cir_card"></div>
               </el-col>
               <el-col :span="4">
                 <p style="margin-bottom: 10px">联系人</p>
                 <div class="cir_card"></div>
               </el-col>
               <el-col :span="4">
                 <p style="margin-bottom: 10px">运营商</p>
                 <div class="cir_card"></div>
               </el-col>
               <el-col :span="4">
                 <p style="margin-bottom: 10px">芝麻</p>
                 <div class="cir_card"></div>
               </el-col>
               <el-col :span="4">
                 <p style="margin-bottom: 10px">银行卡</p>
                 <div class="cir_card"></div>
               </el-col>


             </el-row>
            </div>

          </el-card>
        </el-col>

      </el-row>

  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {

      }
    },
    mounted() {
      this.drawLine();
    },
    methods:{
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let oneChart = this.$echarts.init(document.getElementById('apply15'));
        let twoChart = this.$echarts.init(document.getElementById('statiS7'));
        let threeChart = this.$echarts.init(document.getElementById('authPass'));
        let fourChart = this.$echarts.init(document.getElementById('authRate7'));
        // 绘制图表
        oneChart.setOption({
          title: {},
          tooltip: {},
          legend: {
            data:[
              {
                name:'借款金额',
                icon:'circle'
              },
              {
                name:'还款金额',
                icon:'circle'
              }
              ]
          },
          xAxis: {
            data: ["06-01","06-02","06-03","06-04","06-05","06-06","06-07","06-08","06-09","06-10","06-11","06-12","06-13","06-14","06-15"]
          },
          yAxis: {
          },
          series: [
            {
            name:'借款金额',
            type:'bar',
            data:[320, 332, 301, 334, 390, 330, 320,862, 1018, 964, 1026, 1679, 1600, 1570,1650],
            itemStyle:{
              color:" #FD6B6B",
              borderWidth:3
            }
           },
            {
              name:'还款金额',
              type:'bar',
              data:[1018, 964, 1026, 1679, 1600, 1570,1650 ,320, 732, 301, 634, 390, 930, 420,862],
              itemStyle:{
                color:"#788AEB",
                borderWidth:3
              }
            },
          ]
        });
        twoChart.setOption({
          legend: {
            data:[
              {
                name:'认证用户',
                icon:'circle'
              },
              {
                name:'注册用户',
                icon:'circle'
              }
            ]
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
              itemStyle:{
                color:" #FD6B6B",
              }
            },
            {
              data: [720, 632, 401, 634, 1990, 1030, 320],
              type: 'line',
              itemStyle:{
                color:"#788AEB",
              }
            },
          ]
        });
        threeChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'horizontal',
            },
            series: [
              {
                name:'',
                type:'pie',
                radius: ['50%', '70%'],    //饼图的半径，数组的第一项是内半径，第二项是外半径。
                avoidLabelOverlap: false,  //是否启用防止标签重叠策略
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
                ]
              }
            ]
        });
        fourChart.setOption({
          legend: {
            data:[
              {
                name:'通过率',
                icon:'circle'
              }
            ]
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [720, 632, 401, 634, 1990, 1030, 320],
              type: 'line',
              itemStyle:{
                color:"#788AEB",
              }
            }
          ]
        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row{
    margin-bottom:20px;
  }
.six{
  background: #fff;
  border-radius: 2px;
  margin:10px;
  padding: 15px 12px;
}
.six:hover{
  box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
}
  .icon_six{
    float: left;
    font-size: 26px;
    margin: 10px 5px 0 5px;
  }
  .title_six{
    color: #ADADAD;
    font-size: 0.8em;
    margin-left: 15px;
  }
  .total_six{
    font-size: 26px;
    margin-top: 10px;
  }
  .card_two{
    width: 95%;
    margin: 0 auto;
    border: none;
  }
  .ul_two{
    list-style: none;
    margin-left: 50px;
    margin-bottom: 20px;
  }
  .ul_two li{
    line-height: 40px;
    color: #9D9D9D;
    font-size: 0.8em;
  }
  .cir_card{
    border: 8px solid #758AF6;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    margin:0px auto;
  }
  .jucenter{
    text-align: center;
  }
</style>
