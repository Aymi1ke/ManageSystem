<template>
  <div class="calllog">
    <div class="table-box">
    <el-table :data="callList.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" border >
      <el-table-column prop="peer_number" label="对方号码">
      </el-table-column>
      <el-table-column prop="call_time" label="通话时间">
      </el-table-column>
      <el-table-column prop="duration_time" label="通话时长(秒)">
      </el-table-column>
      <el-table-column prop="call_type" label="通话类型">
        <template slot-scope="scope">
          <el-tag>
            {{scope.row.call_type=='1'?'来电':(scope.row.call_type=='2'?'拨出':(scope.row.call_type=='3'?'未接':(scope.row.call_type=='4'?'语音邮件':'挂断')))}}
          </el-tag>
        </template>
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
            :total="calltotal">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>
<script>
    export default {
        name: "CollLog",
      props: {
        'callList': {
          type: Array
        },
        'calltotal':{
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
