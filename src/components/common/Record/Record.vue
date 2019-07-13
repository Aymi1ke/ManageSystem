<template>
  <div class="record">
    <div class="table-box">
      <el-table :data="Record.slice((currentPage-1)*pageSize,currentPage*pageSize)" width='100%'>
        <el-table-column property="borrowId" label="订单号" ></el-table-column>
        <el-table-column property="borrowAmount" label="借款金额(元)" :formatter="amountFormat"></el-table-column>
        <el-table-column property="borrowDays" label="借款期限"></el-table-column>
        <el-table-column property="createTime" label="申请时间" :formatter="dateFormat"></el-table-column>
        <el-table-column property="compreCost" label="综合费用(元)" :formatter="amountFormat"></el-table-column>
        <el-table-column property="makeMoney" label="到账金额(元)" :formatter="amountFormat"></el-table-column>
        <el-table-column property="repaymentAmount" label="还款金额(元)"  :formatter="amountFormat"> </el-table-column>
        <el-table-column property="overdueDays" label="逾期天数"></el-table-column>
        <el-table-column property="overdueAmount" label="逾期金额(元)" :formatter="amountFormat"></el-table-column>
        <el-table-column property="extendPeriodTimes" label="展期次数"></el-table-column>
        <el-table-column property="extendPeriodAmount" label="展期金额(元)" :formatter="amountFormat"></el-table-column>
        <el-table-column property="orderStart" label="状态">
          <template slot-scope="scope">
            {{scope.row.orderStart =="0" ? "待打款":
            ((scope.row.orderStart =="1")? "打款中":
            ((scope.row.orderStart =="2")? "已到账":
            ((scope.row.orderStart =="3")? "打款失败":
            ((scope.row.orderStart =="4")? "待打款":
            ((scope.row.orderStart =="5")? "已还款":
            ((scope.row.orderStart =="6")? "逾期未还款":
            ((scope.row.orderStart =="7")? "逾期已还款":"部分成功")))))))}}
          </template>

        </el-table-column>
        <el-table-column property="remarks" label="展期历史">
          <template slot-scope="scope">
            <el-button @click="handleHistroy(scope.row)"  size="mini">展期历史</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-dialog title="展期历史" :visible.sync="dialogTableVisible"  width="600px">
        <el-table :data="gridData"  border>
          <el-table-column property="createTime" label="创建日期" :formatter="dateFormat"></el-table-column>
          <el-table-column property="overdueDays" label="逾期天数" ></el-table-column>
          <el-table-column property="extendPeriodTotalAmount" label="展期总费用" :formatter="amountFormat"></el-table-column>
        </el-table>
        <el-divider></el-divider>
      </el-dialog>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="loantotal">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Record",
      props: {
        "Record": {
          type: Array
        },
        "loantotal":{
          type: Number,
          default:0
        }
      },
      data(){
        return{
          pageSize:20,
          currentPage:1,
          dialogTableVisible:false,
          gridData:[],
        }
      },
      methods:{
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.currentPage =1;
          this.pageSize = val;
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
        },
        amountFormat(row,column){
          var amount = row[column.property];
          if(amount === undefined){
            return ''
          }
          return amount/100;
        },
        //返回时间格式化
        dateFormat(row,column){
          var date = row[column.property];
          if(date === undefined){
            return ''
          }
          return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");

        },
        handleHistroy(row){
          this.dialogTableVisible = true;
          this.$post('/CqBorrow/extensionHistory',{
            borrowId:row.borrowId,
          }).then(res=>{
            if(res.resultCode==="success"){
              console.log(res.resultData);
              this.gridData = res.resultData;
            }
          }).catch(error =>{

          })
        },
      }
    }
</script>

<style scoped>

</style>
