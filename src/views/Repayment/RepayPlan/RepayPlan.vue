<template>
  <div class="PaymentRecord">
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
      <el-table ref="InitDate"
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
        <el-table-column prop="receiverBankcard" label="银行卡号">
        </el-table-column>
        <el-table-column prop="borrowAmount" label="借款金额(元)" :formatter="amountFormat">
        </el-table-column>
        <el-table-column prop="overdueRate" label="应还款金额(元)" :formatter="amountFormat">
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="repayTime" label="应还款日期" :formatter="dateFormats">
        </el-table-column>
        <el-table-column prop="truelyRepayTime" label="实还款日期" :formatter="dateFormat">
          <template slot-scope="scope">
            {{scope.row.truelyRepayTime == null?'-':scope.row.truelyRepayTime | formatDate}}
          </template>
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
            <el-button @click.native="handleRecord(scope.row)"  size="mini">代付记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="代扣记录" :visible.sync="dialogTableVisible"  width="600px">
        <el-table :data="gridData">
          <el-table-column property="date" label="代扣编号" ></el-table-column>
          <el-table-column property="name" label="代扣时间" ></el-table-column>
          <el-table-column property="address" label="结果编码"></el-table-column>
          <el-table-column property="address" label="结果消息"></el-table-column>
        </el-table>
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
  import {formatDate} from '../../../config/common.js'
  export default {
    name: "PaymentRecord",
    inject:["reload"],
    data() {
      return {
        filterForm: {
          borrowId: '',
          idCardName: '',
          userPhone: '',
          queryTime: ''
        },
        InitDate: [],
        orderID:'',
        loading:true,
        dialogTableVisible:false,
        gridData:[],
        //需要给分页组件传的信息
        pages: {
          page_index: 1,  // 当前位于哪页
          total: 0,        // 总数
          page_size: 20,   // 1页显示多少条
          page_sizes: [10, 20, 30, 40],  //每页显示多少条
          layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
        },
      }
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        if (date == 'Invalid Date'){
          return (date = '-')
        }
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
      dateFormats(row,column){
        var date = row[column.property];
        if(date === undefined){
          return ''
        }
        return this.$moment(date).format("YYYY-MM-DD");
      },
      getInitPage(){
        this.$post('/CqBorrow/repaymentManage',{
          idCardName: this.filterForm.idCardName,
          userPhone: this.filterForm.userPhone,
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
              type: 'warning'
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
      handleRecord(row){
        this.dialogTableVisible = true;
      },
    }
  }
</script>

<style scoped>

</style>
