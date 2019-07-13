<template>
  <div class="sms">
    <div class="table-box">
      <el-table :data="SMSList.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" border>
        <el-table-column prop="peer_number" label="对方号码">
        </el-table-column>
        <el-table-column prop="content" label="短信内容">
        </el-table-column>
        <el-table-column prop="sms_time" label="收发时间">
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
              :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>


  </div>
</template>

<script>
    export default {
        name: "SMSrecord",
      props:{
        'SMSList':{
          type:Array,
          required:true
        },
        'total':{
          type:Number,
          required:true
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
