<template>
  <div class="loancore">
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

            <el-form-item label="申请日期" label-width="70px">
              <el-date-picker
                v-model="filterForm.queryTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 260px">
              </el-date-picker>
            </el-form-item>

            <el-button size="mini"  type="danger" @click.native="getInitPage">搜索</el-button>

      </el-form>
    </div>
    <div class="table-box">
      <el-row>
        <el-col :span="5" style="float: left;margin-left: 20px">
          <el-button  @click.native="refresh" size="mini">刷新</el-button>
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
        <el-table-column prop="cardId" label="银行卡号" >
        </el-table-column>
        <el-table-column prop="borrowAmount" label="放款金额(元)" :formatter="amountFormat">
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="loansResult" label="电核状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.loansResult =='0'?'warning':scope.row.loansResult =='10'?'success':'danger'">
              {{scope.row.loansResult =='0'?'待审核':(scope.row.loansResult =='10')?'通过':'拒绝'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="borrowCount" label="借款次数">
        </el-table-column>
        <el-table-column prop="overdueDaycount" label="最近逾期天数">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
              <el-button @click="handleDetail(scope.row)"  size="mini">资料</el-button>
              <el-button @click.native.prevent="handleCore(scope.row)" size="mini">电审</el-button>
              <el-button @click.native.prevent="handleAudit(scope.row)" type="danger" size="mini">审核</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-dialog
        title="电核记录"
        :visible.sync="dialogVisible"
        width="1000px"
        >
        <el-divider></el-divider>
        <el-row :gutter="10">
          <el-col :span="14">
            <el-table  :data="tableData" border  :header-cell-style="getRowClass">
              <el-table-column prop="coreCount" label="次数">
              </el-table-column>
              <el-table-column prop="coreTime" label="日期"  :formatter="dateFormat">
              </el-table-column>
              <el-table-column  prop="situation" label="情况">
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="10">
            <el-form ref="form" :model="form" :rules="rule" label-width="100px">
              <el-form-item label="手机号码:" prop="userPhone">
               <span>{{form.userPhone}}</span>
              </el-form-item>
              <el-form-item label="增补号码:" prop="phone">
               {{form.phone}}
              </el-form-item>
              <el-form-item label="电审情况:" class="is-required" prop="detail">
                <el-input type="textarea" v-model="form.detail"  :autosize="{ minRows: 2, maxRows: 4}" maxlength="50" show-word-limit></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <span slot="footer" class="dialog-footer">
           <el-button  @click="dialogVisible = false" size="big">取消</el-button>
               <el-button type="primary" @click="submitForm" size="big">确 定</el-button>
              </span>
      </el-dialog>
      <el-dialog
        title="审核放款订单"
        :visible.sync="AuditdialogVisible"
        width="800px">
        <el-divider></el-divider>
        <el-form ref="auditForm" :model="auditForm" :rules="rules" label-width="100px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="姓名:" prop="userName">
              <span>{{auditForm.userName}}</span>
            </el-form-item>
            <el-form-item label="银行卡号:" prop="cardId">
              <span>{{auditForm.cardId}}</span>
            </el-form-item>
            <el-form-item label="放款金额:" prop="borrowAmount">
              <span>{{auditForm.borrowAmount | amount}}</span>
            </el-form-item>
            <el-form-item label="审核意见:" prop="auditStatus" class="is-required">
                <el-radio v-model="auditForm.auditStatus" label="10">审核通过</el-radio>
                <el-radio v-model="auditForm.auditStatus" label="20">审核不通过</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码:" >
              <span>{{auditForm.userPhone}}</span>
            </el-form-item>
            <el-form-item label="申请时间:" >
              <span>{{auditForm.createTime | formatDate}}</span>
            </el-form-item>
              <el-form-item label="订单号:" >
                <span>{{auditForm.borrowId}}</span>
              </el-form-item>
              <el-form-item label="审核备注:" prop="auditRemark">
                <el-input type="textarea" v-model="auditForm.auditRemark"  :autosize="{ minRows: 2, maxRows: 4}" maxlength="50" show-word-limit></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        </el-form>
        <el-divider></el-divider>
        <span slot="footer" class="dialog-footer">
           <el-button  @click="AuditdialogVisible = false" size="big">取消</el-button>
               <el-button type="primary"  size="big" @click.native="sumbitAuditlend">确 定</el-button>
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
    import {formatDate} from "../../../config/common";

    export default {
      name: "LoanCore",
      inject:["reload"],
      data() {
        return {
          filterForm: {
            idCardName: '',
            userPhone: '',
            borrowId:'',
            queryTime: '',
            value:''
          },
          loading:true,
          dialogVisible:false,
          AuditdialogVisible:false,
          InitDate: [],
          tableData:[],
          form:{
            userPhone:'',
            detail:'',
            phone:''
          },
          auditForm:{
            userName:'',
            cardId:'',
            userPhone:'',
            createTime:'',
           auditStatus:'10',
            borrowAmount:0,
          },
          orderID:'',
          //需要给分页组件传的信息
          pages: {
            page_index: 1,  // 当前位于哪页
            total: 0,        // 总数
            page_size: 20,   // 1页显示多少条
            page_sizes: [10, 20, 30, 40],  //每页显示多少条
            layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
          },
          rule:{
            detail:[
              {required: true, message: '请填写电审情况', trigger: 'blur'},
            ]

          },
          rules:{
            auditStatus:[
              { required: true, message: '请选择审核意见', trigger: 'change' }
            ]
          }

        }
      },
      filters:{
        amount(value) {
          if(value){
            return (value = value/100)
          }else{
            return (value = '')
          }
        },
        formatDate(time){
          let date = new Date(time)
          return formatDate(date,'yyyy-MM-dd hh:mm:ss')
        },
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
          return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");

        },
        getInitPage(){
          this.$post('/CqBorrow/loanCoreInit',{
            idCardName: this.filterForm.idCardName,
            userPhone: this.filterForm.userPhone,
            borrowId:this.filterForm.borrowId,
            queryTime: JSON.stringify(this.filterForm.queryTime),
            pid:'',
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
        handleDetail(row){
          this.$router.push({path:'/UserDetail',query:{id:row.userId}})
          this.$store.dispatch('SaveUserId',row.userId);
        },
        handleCore(row){
          this.dialogVisible = true;
          this.form = Object.assign({}, row);
          this.orderID = row.borrowId;
          this.coreDetail();
        },
        handleAudit(row){
          this.AuditdialogVisible = true;
          this.auditForm = Object.assign({},row);
        },
        coreDetail(){
          this.$post('/CqBorrow/createLoanCore',{
            borrowId:this.orderID,
            situation:this.form.detail,
          }).then(res=>{
            if(res.resultCode==="success") {
              this.tableData = res.resultData;
            }else{
              this.$message({
                message: res.resultMessage,
                type: 'error'
              });
            }
          }).catch(error=>{

          })
        },
        submitForm(form) {
          this.$refs.form.validate((valid) => {
            if (valid) {
             this.$post('/CqBorrow/createLoanCore',{
               borrowId:this.orderID,
               situation:this.form.detail
             }).then(res=>{
               if(res.resultCode==="success") {
                 this.tableData.push(res.resultData);
               }else{
                 this.$message({
                   message: res.resultMessage,
                   type: 'error'
                 });
               }
             }).catch(error=>{

             })
            } else {
              return false;
            }
          });
        },
        sumbitAuditlend(){
          this.$refs.auditForm.validate((valid) => {
            if (valid) {
              this.$post('/CqBorrow/auditLending',{
                borrowId:this.auditForm.borrowId,
                auditStatus:this.auditForm.auditStatus,
                auditRemark:this.auditForm.auditRemark,
                assessorName:sessionStorage.getItem('name'),
              }).then(res=>{
                if(res.resultCode==="success") {
                  this.$message({
                    message: res.resultMessage,
                    type: 'success'
                  });
                  this.reload();
                  this.AuditdialogVisible = false;
                }else{
                  this.$message({
                    message: res.resultMessage,
                    type: 'error'
                  });
                  this.reload();
                }
              }).catch(error=>{

              })
            } else {
              return false;
            }
          });

        },

      }
    }
</script>

<style scoped>

</style>
