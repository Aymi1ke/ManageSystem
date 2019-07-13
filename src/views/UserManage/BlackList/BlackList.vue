<template>
   <div class="blacklist">
     <div class="select-box">
       <el-form ref="filterForm" :model="filterForm" size="mini" label="right" :inline="true">

             <el-form-item label="姓名" label-width="50px">
               <el-input v-model="filterForm.idCardName"></el-input>
             </el-form-item>

             <el-form-item label="手机号" label-width="65px">
               <el-input v-model="filterForm.userPhone"></el-input>
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
       <el-table ref="InitDate" :data="InitDate" stripe fit   v-loading="loading"
                 :header-cell-style="getRowClass">
         <el-table-column prop="userId" label="UID">
         </el-table-column>
         <el-table-column prop="idCardName" label="姓名">
         </el-table-column>
         <el-table-column prop="userPhone" label="手机号" >
         </el-table-column>
         <el-table-column prop="createTime" label="添加时间" :formatter="dateFormat">
         </el-table-column>
         <el-table-column prop="deleteTime" label="自动解除时间"  >
         </el-table-column>
         <el-table-column prop="operate" label="操作">
           <template slot-scope="scope">
               <span ref="remove">
                    <el-popover placement="top" trigger="click" >
                      <p class="sf-red">确定要将{{scope.row.idCardName}}移除黑名单吗?</p>
                      <div style="text-align: center;">
                        <el-button size="mini" @click.native.prevent="$refs.remove.click()">取消</el-button>
                        <el-button type="danger" size="mini" @click.native.prevent="handleDetach(scope.row)">确定</el-button>
                      </div>
                      <el-button slot="reference"  type="danger" size="mini">移除黑名单</el-button>
                    </el-popover>
               </span>

           </template>
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
        name: "BlackList",
       inject:["reload"],
      data() {
        return {
          filterForm: {
            idCardName: '',
            userPhone: '',
          },
          InitDate: [],
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
          this.$post('/sysBlacklist/sysBlacklistPageInit',{
            idCardName:this.filterForm.idCardName,
            userPhone:this.filterForm.userPhone,
            pageSize:this.pages.page_size,
            currentPage:this.pages.page_index,
          }).then(res=>{
            if(res.resultCode==="success"){
             this.loading = false;
              this.InitDate = res.resultData;
              this.pages.page_index =res.paging.currentPage;
              this.pages.total =res.paging.total;
              this.pages.page_size =res.paging.pageSize;
            }else {
              this.$message({
                message: res.resultMessage,
                type: 'error'
              });
            }
          }).catch(error=>{

          })
        },
        handleSizeChange(val) {
          this.pages.page_size = val;
          this.getInitPage();
        },
        handleCurrentChange(curval) {
          this.pages.page_index = curval;
          this.getInitPage();
        },
        handleDetach(row){
          this.$post('/sysBlacklist/deleteBlacklist',{
            userId:row.userId
          }).then(res=>{
            if(res.resultCode==="success") {
              this.$message({
                message: res.resultMessage,
                type: 'success'
              });
              this.reload();
              this.$refs.remove.click();
            }else {
              this.$message({
                message: res.resultMessage,
                type: 'error'
              });
            }
          }).catch(error=>{

            }
          )
        },
      }
    }
</script>

<style scoped>

</style>
