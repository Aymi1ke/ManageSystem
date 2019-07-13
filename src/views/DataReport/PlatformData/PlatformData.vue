<template>
  <div class="PlatformData"  id="Platform">
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
        <el-table
                  :data="InitDate"
                  height="500"
                  border
                  v-loading="loading"
                  :cell-style="getCellClass"
                  :header-cell-style="getRowClass">
          <el-table-column  prop="date" label="日期" fixed>
          </el-table-column>
          <el-table-column prop="name" label="注册客户">
          </el-table-column>
          <el-table-column prop="address" label="实名客户">
          </el-table-column>
          <el-table-column prop="address" label="申请客户">
          </el-table-column>
          <el-table-column prop="address" label="拒绝客户">
          </el-table-column>
          <el-table-column prop="address" label="通过客户">
          </el-table-column>
          <el-table-column prop="address" label="获客费">
          </el-table-column>
          <el-table-column prop="address" label="新客" >
            <el-table-column prop="address" label="放款单量">
            </el-table-column>
            <el-table-column prop="address" label="放款本金">
            </el-table-column>
            <el-table-column prop="address" label="新单转化率">
            </el-table-column>
            <el-table-column prop="address" label="到期新单">
            </el-table-column>
            <el-table-column prop="address" label="到期金额">
            </el-table-column>
            <el-table-column prop="address" label="收款笔数">
            </el-table-column>
            <el-table-column prop="address" label="收款金额">
            </el-table-column>
            <el-table-column prop="address" label="展期笔数">
            </el-table-column>
            <el-table-column prop="address" label="展期金额">
            </el-table-column>
            <el-table-column prop="address" label="展期率">
            </el-table-column>
            <el-table-column prop="address" label="逾期笔数">
            </el-table-column>
            <el-table-column prop="address" label="逾期金额">
            </el-table-column>
            <el-table-column prop="address" label="逾期率">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="address" label="老客">
            <el-table-column prop="address" label="到期笔数">
            </el-table-column>
            <el-table-column prop="address" label="到期金额">
            </el-table-column>
            <el-table-column prop="address" label="放款笔数">
            </el-table-column>
            <el-table-column prop="address" label="放款金额">
            </el-table-column>
            <el-table-column prop="address" label="逾期笔数">
            </el-table-column>
            <el-table-column prop="address" label="逾期金额">
            </el-table-column>
            <el-table-column prop="address" label="逾期率">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="address" label="展期">
            <el-table-column prop="address" label="展期到期笔数">
            </el-table-column>
            <el-table-column prop="address" label="展期笔数">
            </el-table-column>
            <el-table-column prop="address" label="展期到期金额">
            </el-table-column>
            <el-table-column prop="address" label="展期率">
            </el-table-column>
            <el-table-column prop="address" label="展期逾期笔数">
            </el-table-column>
            <el-table-column prop="address" label="逾期金额">
            </el-table-column>
            <el-table-column prop="address" label="展期逾期率">
            </el-table-column>
            <el-table-column prop="address" label="综合首逾">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="address" label="催收">
            <el-table-column prop="address" label="逾期总单量">
            </el-table-column>
            <el-table-column prop="address" label="总金额">
            </el-table-column>
            <el-table-column prop="address" label="催回单量">
            </el-table-column>
            <el-table-column prop="address" label="催回金额">
            </el-table-column>
            <el-table-column prop="address" label="金额催回率">
            </el-table-column>
            <el-table-column prop="address" label="单量催回率">
            </el-table-column>
            <el-table-column prop="address" label="当前金额逾期率">
            </el-table-column>
            <el-table-column prop="address" label="当前单量逾期率">
            </el-table-column>
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
        name: "PlatformData",
      inject:['reload'],
      data(){
        return{
          filterForm:{
            queryTime:''
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
        getCellClass({row, column, rowIndex, columnIndex}){
          if (columnIndex == 0){
            return 'background:#F7F7F7'
          }else{

          }
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

<style>
#Platform table,thead,tbody{
  width: 4000px !important;
}
  #Platform .el-table{
    width: 98%;
  }
</style>
