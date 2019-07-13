<template>
    <div class="report">
        <iframe  frameborder="0" width="100%" :src="url" id="show-iframe" scrolling="auto"></iframe>
<!--      <el-collapse v-model="activeNames" >-->
<!--        <el-collapse-item title="用户基础信息" name="1">-->
<!--          <el-row v-for="item in jsonReport">-->
<!--            <el-form  label-width="130px" label-position="right">-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="用户姓名:">-->
<!--                {{item.userdata.real_name}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="身份证号:">-->
<!--                {{item.userdata.id_card}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="电话号码:">-->
<!--              {{item.userdata.phone}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="运营商省份:">-->
<!--              {{item.userdata.user_source}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="地址:">-->
<!--              {{item.userdata.addr}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="入网时间:">-->
<!--              {{item.userdata.reg_time}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="抓取时间:">-->
<!--              {{item.userdata.update_time}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="用户积分:">-->
<!--             {{item.userdata.score}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="其他联系人号码:">-->
<!--              {{item.userdata.contact_phone}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="用户星级:">-->
<!--              {{item.userdata.star_level}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="用户实名状态:">-->
<!--              {{item.userdata.authentication}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="客户状态:">-->
<!--              {{item.userdata.phone_status}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--              <el-form-item label="套餐名称:">-->
<!--              {{item.userdata.package_name}}-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            </el-form>-->
<!--          </el-row>-->

<!--        </el-collapse-item>-->
<!--        <el-collapse-item title="通话记录信息" name="2">-->
<!--          <div v-for="value in jsonReport">-->
<!--            <div v-for="item in value.teldata">-->
<!--              <p class="call-total">月份:{{item.month}}  总条数:{{item.total_size}}</p>-->
<!--          <el-table :data="item.items" style="width: 100%" >-->
<!--            <el-table-column prop="call_type" label="呼叫类型">-->
<!--              <template slot-scope="scope">-->
<!--                 <el-tag :type="scope.row.call_type=='1'?'success':scope.row.call_type=='2'?'warning':scope.row.call_type=='3'?'danger':'primary'">-->
<!--                   {{scope.row.call_type=='1'?'主叫':(scope.row.call_type=='2'?'被叫':((scope.row.call_type=='3'?'未识别状态':'转呼')))}}-->
<!--                 </el-tag>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="receive_phone" label="对方号码">-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="call_time" label="通话时间">-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="trade_time" label="通话时长(秒)">-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="trade_type" label="通信类型">-->
<!--              <template slot-scope="scope">-->
<!--                  {{scope.row.trade_type=='1'?'本地':(scope.row.trade_type=='2'?'漫游国内':'其他')}}-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item title="短信记录" name="3">-->
<!--          <div v-for="value in jsonReport">-->
<!--            <div v-for="item in value.msgdata">-->
<!--              <p class="call-total">月份:{{item.month}}  总条数:{{item.total_size}}</p>-->
<!--              <el-table :data="item.items" style="width: 100%" >-->
<!--                <el-table-column prop="receiver_phone" label="对方号码">-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="send_time" label="发送时间">-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="business_name" label="业务类型">-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="fee" label="费用">-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="trade_type" label="信息类型">-->
<!--                  <template slot-scope="scope">-->
<!--                    {{scope.row.trade_way=='1'?'短信':(scope.row.trade_way=='2'?'彩信':'其他')}}-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="trade_way" label="短信状态">-->
<!--                  <template slot-scope="scope">-->
<!--                    {{scope.row.trade_way=='1'?'发送':(scope.row.trade_way=='2'?'接收':'未识别状态')}}-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--              </el-table>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item title="月账单记录" name="4">-->
<!--          <div v-for="item in jsonReport">-->
<!--            <el-table :data="item.billdata" style="width: 100%" >-->
<!--              <el-table-column prop="month" label="月份">-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="call_pay" label="当月话费">-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="pay_fee" label="费用">-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="package_fee" label="套餐及固定费用">-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="tel_fee" label="额外套餐费-通话">-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="net_fee" label="额外套餐费-流量">-->
<!--              </el-table-column>-->
<!--            </el-table>-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item title="上网记录详单" name="5">-->
<!--          <div v-for="item in jsonReport">-->
<!--            <el-table :data="item.netlogdata" style="width: 100%" >-->
<!--              <el-table-column prop="month" label="月份">-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="total_size" label="总条数">-->
<!--              </el-table-column>-->
<!--            </el-table>-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item title="亲情网记录" name="6">-->
<!--          <div v-for="item in jsonReport">-->
<!--            <el-table :data="item.familydata" style="width: 100%" >-->
<!--              <el-table-column prop="num" label="编号">-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="phone" label="亲情网手机号码">-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="short_num" label="短号">-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="mobile_city" label="归属地">-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="member_type" label="成员类型">-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="join_time" label="加入日期">-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="expire_time" label="失效日期">-->
<!--              </el-table-column>-->
<!--            </el-table>-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--        <el-collapse-item title="月份汇总信息" name="7">-->
<!--          <div v-for="item in jsonReport">-->
<!--            <el-form label-width="160px" label-position="right">-->
<!--              <el-row>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="账单可抓取月份数">-->
<!--                    {{item.monthinfo.billdata.normal_cnt}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="账单抓取失败月份数">-->
<!--                    {{item.monthinfo.billdata.miss_cnt}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="账单为空月份数">-->
<!--                    {{item.monthinfo.billdata.empty_cnt}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--            </el-form>-->
<!--            <ul v-for="(value,name) in item.monthinfo.billdata.items">-->
<!--              <ol>{{name}}-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;{{value}}</ol>-->
<!--            </ul>-->
<!--            <el-form label-width="160px" label-position="right">-->
<!--              <el-row>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="通话可抓取月份数">-->
<!--                    {{item.monthinfo.teldata.normal_cnt}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="通话抓取失败月份数">-->
<!--                    {{item.monthinfo.teldata.miss_cnt}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="通话为空月份数">-->
<!--                    {{item.monthinfo.teldata.empty_cnt}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--            </el-form>-->
<!--            <ul v-for="(value,name) in item.monthinfo.teldata.items">-->
<!--              <ol>{{name}}-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;{{value}}</ol>-->
<!--            </ul>-->
<!--            <el-form label-width="160px" label-position="right">-->
<!--              <el-row>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="短信可抓取月份数">-->
<!--                    {{item.monthinfo.msgdata.normal_cnt}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="短信抓取失败月份数">-->
<!--                    {{item.monthinfo.msgdata.miss_cnt}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="短信为空月份数">-->
<!--                    {{item.monthinfo.msgdata.empty_cnt}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--            </el-form>-->
<!--            <ul v-for="(value,name) in item.monthinfo.msgdata.items">-->
<!--              <ol>{{name}}-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;{{value}}</ol>-->
<!--            </ul>-->
<!--            <el-form label-width="160px" label-position="right">-->
<!--              <el-row>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="流量可抓取月份数">-->
<!--                    {{item.monthinfo.netdata.normal_cnt}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="流量抓取失败月份数">-->
<!--                    {{item.monthinfo.netdata.miss_cnt}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-form-item label="流量为空月份数">-->
<!--                    {{item.monthinfo.netdata.empty_cnt}}-->
<!--                  </el-form-item>-->
<!--                </el-col>-->
<!--              </el-row>-->
<!--            </el-form>-->
<!--            <ul v-for="(value,name) in item.monthinfo.netdata.items">-->
<!--              <ol>{{name}}-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;{{value}}</ol>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </el-collapse-item>-->
<!--      </el-collapse>-->
    </div>
</template>

<script>
    export default {
        name: "Report",
       props:{
          // "jsonReport":{
          //   "type":Array,
          //   "required":true
          // },
         "url":{
           "type":String,
           "required":true
         }
       },
      data(){
          return{
            activeNames: ['1','2','3','4','5','7'],
          }
      },
      mounted(){
        const oIframe = document.getElementById('show-iframe');
        // const deviceWidth = document.documentElement.clientWidth;
        const deviceHeight = document.documentElement.clientHeight;
        // oIframe.style.width = deviceWidth + 'px';
        oIframe.style.height = deviceHeight + 'px';

      },
      methods:{

      }
    }
</script>

<style scoped>
  .call-total{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #dd6161;
  }
</style>
