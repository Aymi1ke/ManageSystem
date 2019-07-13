<template>
  <div class="BankCard">
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

        <el-form-item label="扣款日期" label-width="70px" >
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
                :header-cell-style="getRowClass">
        <el-table-column prop="borrowId" label="订单号" >
        </el-table-column>
        <el-table-column prop="userName" label="姓名">
        </el-table-column>
        <el-table-column prop="userPhone" label="手机号" >
        </el-table-column>
        <el-table-column prop="amountPayable" label="应扣金额(元)" :formatter="amountFormat">
        </el-table-column>
        <el-table-column prop="truelyRepayAmount" label="实际还款(元)" :formatter="amountFormat">
        </el-table-column>
        <el-table-column prop="bankCardId" label="扣款银行卡" >
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="payableTime" label="扣款时间" :formatter="dateFormat">
        </el-table-column>
      </el-table>
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
    name: 'BankCard',
    inject:["reload"],
    data() {
      return {
        filterForm: {
          borrowId: '',
          idCardName: '',
          userPhone: '',
          bankCardId:'',
          queryTime: ''
        },
        InitDate: [],
        orderID:'',
        loading:true,
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
        this.$post('/CqBorrow/deductionMethodInit', {
          idCardName: this.filterForm.idCardName,
          userPhone: this.filterForm.userPhone,
          borrowId: this.filterForm.borrowId,
          queryTime: JSON.stringify(this.filterForm.queryTime),
          repayType: '20',
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
            this.loading = false;
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




</style>
