<template>
    <div class="RecoveryRate">
       <div class="select-box">
         <el-form ref="filterForm" :model="filterForm" :inline="true" size="mini" label="right">
           <el-form-item label="日期" label-width="80px">
             <el-date-picker
               v-model="filterForm.queryTime"
               type="daterange"
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 280px">
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
        <el-table stripe
          :data="InitDate"
           v-loading="loading"
           :header-cell-style="getRowClass">
          <el-table-column prop="createTime" label="日期" :formatter="dateFormats">
          </el-table-column>
          <el-table-column prop="urgeRepayCount" label="催回订单数" >
          </el-table-column>
          <el-table-column prop="urgeRepayAmount" label="催回金额(元)" :formatter="amountFormat">
          </el-table-column>
          <el-table-column prop="dayUrgeCount" label="当日新增">
          </el-table-column>
          <el-table-column prop="s1UrgeRepayCount" label="S1催回数量">
          </el-table-column>
          <el-table-column prop="s2UrgeRepayCount" label="S2催回数量">
          </el-table-column>
          <el-table-column prop="m1UrgeRepayCount" label="M1催回数量">
          </el-table-column>
          <el-table-column prop="m2UrgeRepayCount" label="M2催回数量">
          </el-table-column>
          <el-table-column prop="m2PlusUrgeRepayCount" label="M2+催回数量">
          </el-table-column>
        </el-table>
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
      name: "RecoveryRate",
      inject:['reload'],
      data(){
          return{
            filterForm:{
              queryTime:'',
            },
            loading:false,
            InitDate:[],
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
      mounted(){
        this.getInitPage();
      },
      methods:{
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
        getInitPage(){
          this.$post('/CqStatisticsUrge/collectionDataInit',{
            queryTime:JSON.stringify(this.filterForm.queryTime),
            pageSize:this.pages.page_size,
            currentPage:this.pages.page_index,
          }).then(res=>{
            if (res.resultCode==='success'){
              this.loading = false;
              this.InitDate = res.resultData;
              this.pages.page_index = res.paging.currentPage;
              this.pages.total = res.paging.total;
              this.pages.page_size = res.paging.pageSize;
            }else{
              this.$message({
                message: res.resultMessage,
                type: 'error'
              });
            }
          }).catch(error=>{

          })
        },
        //返回时间格式化
        dateFormats(row,column){
          var date = row[column.property];
          if(date === undefined){
            return ''
          }
          return this.$moment(date).format("YYYY-MM-DD");
        },
        amountFormat(row, column) {
          var amount = row[column.property];
          if (amount === undefined) {
            return ''
          }
          return amount / 100;
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

<style scoped>

</style>
