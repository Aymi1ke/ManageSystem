<template>
	<div class="pendRepay">
    <div class="select-box">
      <el-form ref="filterForm" :model="filterForm" size="mini" label="right" :inline="true">
            <el-form-item label="姓名" label-width="50px">
              <el-input v-model="filterForm.idCardName" style="width: 105px"></el-input>
            </el-form-item>
            <el-form-item label="手机号" label-width="55px">
              <el-input v-model="filterForm.userPhone" style="width: 120px"></el-input>
            </el-form-item>

            <el-form-item label="订单号" label-width="55px">
              <el-input v-model="filterForm.borrowId" style="width: 195px"></el-input>
            </el-form-item>

            <el-form-item label="应还款日期" label-width="85px">
              <el-date-picker
                v-model="filterForm.queryTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 260px">
              </el-date-picker>
            </el-form-item>

            <el-button size="mini" type="danger" @click.native="getInitPage">搜索</el-button>


      </el-form>
    </div>
    <div class="table-box">
      <el-row>
        <el-col :span="5" style="float: left;margin-left: 20px">
          <el-button  @click="refresh" size="mini">刷新</el-button>
        </el-col>
        <el-col :span="3" style="float: right;margin-right: 20px">
          <el-button  icon="el-icon-printer" size="mini">导出报表</el-button>
        </el-col>
      </el-row>
      <div class="line"></div>
      <el-table ref="multipleTable"
                :data="InitDate"
                stripe
                tooltip-effect="dark"
                v-loading="loading"
                :header-cell-style="getRowClass">
        <el-table-column prop="borrowId" label="订单号" >
        </el-table-column>
        <el-table-column prop="userName" label="姓名">
        </el-table-column>
        <el-table-column prop="userPhone" label="手机号" >
        </el-table-column>
        <el-table-column prop="borrowAmount" label="借款金额(元)" :formatter="amountFormat">
        </el-table-column>
        <el-table-column prop="borrowDays" label="借款期限(天)" >
        </el-table-column>
        <el-table-column prop="overdueRate" label="应还款金额(元)" :formatter="amountFormat" >
        </el-table-column>
        <el-table-column prop="repayTime" label="应还款日期" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期(天)">
        </el-table-column>
        <el-table-column prop="extendPeriodTimes" label="展期次数">
        </el-table-column>
        <el-table-column prop="orderStart" label="订单状态">
          <template slot-scope="scope">
              {{scope.row.orderStart =='0'?'待打款':
              (scope.row.orderStart =='1'?'打款中':
              (scope.row.orderStart =='2'?'已到账':
              (scope.row.orderStart =='3'?'打款失败':
              (scope.row.orderStart =='4'?'待还款':
              (scope.row.orderStart =='5'?'已还款':
              (scope.row.orderStart =='6'?'逾期未还款':
              (scope.row.orderStart =='7'?'逾期已还款':
              (scope.row.orderStart =='8'?' 部分成功':''))))))))}}
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.extendPeriodTimes > 0"  @click="handleHistroy(scope.row)"  size="mini">展期历史</el-button>
            <el-button @click="handlePeriod(scope.row)" type="primary"  size="mini">立即展期</el-button>
            <el-button @click="handleRepayment(scope.row)" type="danger"  size="mini">确认还款</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col>
          <div class="total">本页应还款总计(元)：{{columnTotal/100}}</div>
        </el-col>
      </el-row>
      <el-dialog title="展期历史" :visible.sync="dialogTableVisible"  width="600px">

        <el-table :data="gridData" border>
          <el-table-column property="createTime" label="创建日期" :formatter="dateFormat"></el-table-column>
          <el-table-column property="overdueDays" label="逾期天数" ></el-table-column>
          <el-table-column property="extendPeriodTotalAmount" label="展期总费用(元)" :formatter="amountFormat"></el-table-column>
        </el-table>
        <el-row>
          <el-col :span="24">
            <div class="pagination">
              <el-pagination
                @current-change="handleCurrentChanges"
                :current-page.sync="currentPage"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="gridtotal">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog
        title="确认展期"
        :visible.sync="dialogVisible"
        width="600px">
        <el-divider></el-divider>
        <el-form :model="Form"  ref="Form" :rules="rules" label-width="180px" size="small">
          <el-form-item label="展期还款方式" prop="type" class="is-required">
            <el-col :span="16">
            <el-select v-model="Form.type" placeholder="请选择还款方式">
              <el-option label="快钱" value="10"></el-option>
              <el-option label="聚合支付" value="30"></el-option>
              <el-option label="银行卡" value="20"></el-option>
            </el-select>
            </el-col>
          </el-form-item>

          <el-form-item label="展期金额" prop="money" class="is-required">
            <el-col :span="14">
              <el-input v-model.number="Form.money" ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="展期后到期时间" prop="date" class="is-required">
            <el-col :span="16">
              <el-date-picker
                v-model="Form.date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
              </el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <span slot="footer" class="dialog-footer">
           <el-button  @click="dialogVisible = false" size="big">取消</el-button>
               <el-button type="primary" @click="submitPeriod" size="big">确 定</el-button>
              </span>
      </el-dialog>
      <el-dialog
        title="确认还款"
        :visible.sync="RepaydialogVisible"
        width="600px">
        <el-divider></el-divider>
        <el-form :model="Forms"  ref="Forms" :rules="isLower ? ruleRepay : ruleShould" label-width="180px" size="small">
          <el-form-item label="还款选择"  class="is-required" prop="type">
            <el-col :span="16">
              <el-radio v-model="Forms.type" label="0" @change="InitDialog">正常还款</el-radio>
              <el-radio v-model="Forms.type" label="1" @change="InitDialog">金额减免</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item label="还款方式" prop="Reway" class="is-required">
            <el-col :span="16">
              <el-select v-model="Forms.Reway">
                <el-option label="快钱" value="10"></el-option>
                <el-option label="聚合支付" value="30"></el-option>
                <el-option label="银行卡" value="20"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="还款账号" prop="Account" class="is-required">
            <el-col :span="16">
              <el-input v-model="Forms.Account" placeholder="请输入银行卡号或支付宝账号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="流水号">
            <el-col :span="16">
              <el-input v-model="Forms.pipelineNumber" placeholder="请输入流水号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="还款金额" prop="repayAmount" class="is-required" v-if="!isLower">
            <el-col :span="16">
              <el-input v-model.number="Forms.repayAmount"   placeholder="请输入还款金额" ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="还款金额" prop="repayAmount" class="is-required" v-if="isLower">
            <el-col :span="16">
              <el-input v-model.number="Forms.repayAmount"  placeholder="请输入实际还款金额"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="还款时间" prop="date" class="is-required">
            <el-col :span="16">
              <el-date-picker
                v-model="Forms.date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
                :picker-options="pickerToday">
              </el-date-picker>
            </el-col>
          </el-form-item>

        </el-form>
        <el-divider></el-divider>
        <span slot="footer" class="dialog-footer">
           <el-button  @click="RepaydialogVisible = false" size="big">取消</el-button>
               <el-button type="primary" @click="submitRepay" size="big">确 定</el-button>
              </span>
      </el-dialog>
      <!--分页-->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if='pages.total > 0'
              :page-sizes="pages.page_sizes"
              :page-size="pages.page_size"
              :layout="pages.layout"
              :total="pages.total"
              :current-page='pages.page_index'
              @current-change='handleCurrentChange'
              @size-change='handleSizeChange'
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
	</div>
</template>

<script>
	export default {
		name: 'PendRepay',
    inject:["reload"],
    data() {
      var checkAmount = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入还款金额'));
        } else {
          if (value != this.repayMoney) {
            callback(new Error('还款金额必须与应还金额一致!'));
          }
          callback();
        }
      };
      return {
        filterForm: {
          borrowId: '',
          idCardName: '',
          userPhone: '',
          bankCardId:'',
          queryTime: ''
        },
        dialogTableVisible:false,
        dialogVisible:false,
        RepaydialogVisible:false,
        isLower:false,
        gridData:[],
        gridtotal:0,
        InitDate: [],
        currentPage:1,
        orderID:'',
        repayMoney:0,
        loading:true,
        Form:{
          type:'',
          date:'',
          money:'',
        },
        Forms:{
          type:'',
          Reway:'',            //还款方式
          date:'',            //还款时间
          Account:'',         //还款账号
          pipelineNumber:'', //流水号
          repayAmount:''     //还款金额
        },
        pickerOptions:{},
        pickerToday:{
          disabledDate(time) {
            return time.getTime() > Date.now() ;
          }
        },
        //需要给分页组件传的信息
        pages: {
          page_index: 1,  // 当前位于哪页
          total: 0,        // 总数
          page_size: 20,   // 1页显示多少条
          page_sizes: [10, 20, 30, 40],  //每页显示多少条
          layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
        },
        rules:{
          type:[
            {required: true, message: '请选择展期支付方式', trigger: 'blur'}
          ],
          date:[
            {required: true, message: '请选择展期时间', trigger: 'blur'}
          ],
          money:[
            {required: true, message: '请填写展期金额', trigger: 'blur'},
            { type: 'number', message: '输入值必须为数字', trigger: 'blur'}
          ]
        },
        ruleRepay:{
          type:[
            {required: true, message: '请选择还款方式', trigger: 'change'}
          ],
          Reway:[
            {required: true, message: '请选择还款方式', trigger: 'change'}
          ],
          date:[
            {required: true, message: '请选择还款时间', trigger: 'blur'}
          ],
          Account:[
            {required: true, message: '请填写账号', trigger: 'blur'}
          ],
          repayAmount:[
            {required: true, message: '请输入实际还款金额', trigger: 'blur'},
            { type: 'number', message: '输入值必须为数字', trigger: 'blur'}
          ]
        },
        ruleShould:{
          type:[
            {required: true, message: '请选择还款方式', trigger: 'change'}
          ],
          Reway:[
            {required: true, message: '请选择还款方式', trigger: 'change'}
          ],
          date:[
            {required: true, message: '请选择还款时间', trigger: 'blur'}
          ],
          Account:[
            {required: true, message: '请填写账号', trigger: 'blur'}
          ],
          repayAmount:[
            {required: true, message: '请输入还款金额', trigger: 'blur'},
            { type: 'number', message: '输入值必须为数字', trigger: 'blur'},
            { validator: checkAmount, trigger: 'blur' }
          ]
        },
      }
    },
    computed:{
		  columnTotal(){
		    return this.InitDate.map(row => parseInt(row.overdueRate)).reduce((a,b)=>(a+b),0)
      }
    },
    mounted() {
      this.getInitPage();

    },
    methods: {
      refresh(){
        this.reload();
      },
      getRowClass({row, column, rowIndex, columnIndex}) {
        if (rowIndex == 0) {
          return 'background:#efefef'
        } else {
          return ''
        }
      },
      //返回时间格式化
      dateFormat(row,column){
        var date = row[column.property];
        if(date === undefined){
          return ''
        }
        return this.$moment(date).format("YYYY-MM-DD");

      },
      //页面初始化以及搜索查询
      getInitPage(){
        this.$post('/CqBorrow/PaymentPendingInit',{
          idCardName:this.filterForm.idCardName,
          userPhone:this.filterForm.userPhone,
          borrowId:this.filterForm.borrowId,
          queryTime: JSON.stringify(this.filterForm.queryTime),
          pageSize:this.pages.page_size,
          currentPage:this.pages.page_index,
        }).then(res=>{
          if(res.resultCode==="success"){
            this.loading = false;
            this.InitDate = res.resultData;
            this.pages.page_index =res.paging.currentPage;
            this.pages.total =res.paging.total;
            this.pages.page_size =res.paging.pageSize;
          }else{
            this.$message({
              message: res.resultMessage,
              type: 'error'
            });
          }
        }).catch(error=>{

        })
      },
      //返回金额格式化
      amountFormat(row,column){
        var amount = row[column.property];
        if(amount === undefined){
          return ''
        }
        return amount/100;
      },
      handleSizeChange(val) {
        this.pages.page_size = val;
        this.getInitPage();
      },
      handleCurrentChange(curval) {
        this.pages.page_index = curval;
        this.getInitPage();
      },
      handleCurrentChanges(val) {
        this.currentPage = val;
      },
      // 打开<展期历史>按钮
      handleHistroy(row){
        this.dialogTableVisible = true;
        this.$post('/CqBorrow/extensionHistory',{
          borrowId:row.borrowId,
        }).then(res=>{
          if(res.resultCode==="success"){
            this.gridData = res.resultData;
            this.gridtotal = this.gridData.length;
          }
        }).catch(error =>{

        })
      },
      // 打开<立即展期>按钮
      handlePeriod(row){
       this.dialogVisible = true;
       this.orderID = row.borrowId;
        let expiration = row.repayTime;
        let oldTime = this.$moment(expiration).format("YYYY-MM-DD");
       this.pickerOptions =  {
        disabledDate:(time)=>{
          return time.getTime()< new Date(oldTime).getTime()
        }
      }
      },
      // 打开<确认还款>按钮
      handleRepayment(row){
        this.RepaydialogVisible = true;
        this.orderID = row.borrowId;
        this.repayMoney = row.overdueRate/100;
      },
      // <确认还款>弹框内还款方式切换以及还款金额输入显示
      InitDialog(){
        if (this.Forms.type === '1'){
          this.isLower = true;
        }else if (this.Forms.type === '0'){
          this.isLower = false;
        }
      },
      //提交<立即展期>弹框内的确认展期
      submitPeriod(){
        this.$refs.Form.validate((valid) => {
          if (valid) {
           this.$post('/CqBorrow/paymentExtension',{
             borrowId:this.orderID,
             repayType:this.Form.type,
             renewalAmount:this.Form.money,
             postExtTime:this.Form.date
           }).then(res=>{
             if(res.resultCode==="success"){
               this.$message({
                 message: res.resultMessage,
                 type: 'success'
               });
               this.reload();
             }else{
               this.$message({
                 message: res.resultMessage,
                 type: 'error'
               });
               this.reload();
             }
           }).catch(error =>{

           })

          } else {
            return false;
          }
        });
      },
      //提交<确认还款>弹框内的确认还款
      submitRepay(){
        this.$refs.Forms.validate((valid) => {
          if (valid) {
            this.$post('/CqBorrow/offlineRepayment',{
              borrowId:this.orderID,
              erm:this.Forms.type,
              paymentMethod:this.Forms.Reway,
              paymentAccount:this.Forms.Account,
              pipelineNumber:this.Forms.pipelineNumber,
              createTime:this.Forms.date,
              amountOfRepayment:this.Forms.repayAmount
            }).then(res=>{
              if(res.resultCode==="success"){
                this.$message({
                  message: res.resultMessage,
                  type: 'success'
                });
                this.reload();
              }else{
                this.$message({
                  message: res.resultMessage,
                  type: 'error'
                });
              }
            }).catch(error =>{

            })
          } else {
            return false;
          }
        });
      }
    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.total{
  height: 50px;
  background: #f7f7f7;
  margin-top: 5px;
  text-align: right;
  line-height: 50px;
  padding-right: 20px;
  color: #333;
  font-size: 16px;
}
</style>
