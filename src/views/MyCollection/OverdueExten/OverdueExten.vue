<template>
  <div class="ExpirationCollection">
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
            v-model="filterForm.repayTime"
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
        <el-table-column prop="borrowAmount" label="借款金额(元)" :formatter="amountFormat">
        </el-table-column>
        <el-table-column prop="borrowCreateTime" label="订单生成时间" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="auditTime" label="放款日期" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="repayTime" label="应还款日期" :formatter="dateFormats">
        </el-table-column>
        <el-table-column prop="createTime" label="展期时间" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="truelyRepayAmount" label="展期金额(元)" :formatter="amountFormat">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleHistroy(scope.row)"  size="mini">展期历史</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="展期历史" :visible.sync="dialogTableVisible"  width="600px">
        <el-table :data="gridData" border>
          <el-table-column property="createTime" label="创建日期" :formatter="dateFormat"></el-table-column>
          <el-table-column property="overdueDays" label="逾期天数" ></el-table-column>
          <el-table-column property="extendPeriodTotalAmount" label="展期总费用" :formatter="amountFormat"></el-table-column>
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
        name: "OverdueExten",
      inject:["reload"],
      data() {
        return {
          filterForm: {
            borrowId: '',
            idCardName: '',
            userPhone: '',
            repayTime: '',
            createTime:''
          },
          InitDate: [
            {
              borrowId:'BN2019061213565196324'
            }
          ],
          orderID:'',
          dialogTableVisible:false,
          gridData:[],
          gridtotal:0,
          loading:true,
          //需要给分页组件传的信息
          pages: {
            page_index: 1,  // 当前位于哪页
            total: 0,        // 总数
            page_size: 10,   // 1页显示多少条
            page_sizes: [5, 10, 15, 20],  //每页显示多少条
            layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
          },
          currentPage:1
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
          this.$post('/MyOrder/myOverdueRepaymentInit',{
            idCardName:this.filterForm.idCardName,
            userPhone:this.filterForm.userPhone,
            borrowId:this.filterForm.borrowId,
            queryTime:JSON.stringify(this.filterForm.queryTime),
            assessorName:sessionStorage.getItem('name'),
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
        handleCurrentChanges(val) {
          this.currentPage = val;
        },
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

      }
    }
</script>

<style scoped>

</style>
