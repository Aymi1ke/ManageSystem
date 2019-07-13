<template>
   <div class="addressbook">
     <div class="table-box">
       <el-table ref="bookList" :data="bookList.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" border>
         <el-table-column prop="contact_name" label="备注名称">
         </el-table-column>
         <el-table-column prop="contact_phone" label="手机号码">
         </el-table-column>
       </el-table>
       <el-row>
         <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
           <div class="pagination">
             <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page.sync="currentPage"
               :page-size="pageSize"
               layout="total, prev, pager, next"
               :total="booktotal">
             </el-pagination>
           </div>
         </el-col>
       </el-row>
     </div>

   </div>
</template>
<script>
    export default {
        name: "Addressbook",
      props:{
        bookList:{
          type:Array,
        },
        booktotal:{
          type:Number,
          default:0
        }
      },
      data(){
        return{
          currentPage:1,
          pageSize:20,
        }
      },
      methods: {
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.currentPage =1;
          this.pageSize = val;
          console.log(this.pageSize+'------------')
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
        }
      },
    }
</script>

<style scoped>

</style>
