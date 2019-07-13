<template>
  <div class="gprs">
    <el-row>
      <el-col :span="8">
      <el-table :data="markers.slice((currentPage-1)*pageSize,currentPage*pageSize)" border>
        <el-table-column label="日期" prop="date" :formatter="dateFormat">
        </el-table-column>
        <el-table-column  label="lat" prop="position[1]" :formatter="numsfilter">
        </el-table-column>
        <el-table-column  label="lng" prop="position[0]" :formatter="numfilter">
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
                :total="GPRStotal">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <div class="amap-page-container">
          <div :style="{width:'100%',height:'500px'}">
            <el-amap vid="amap" :zoom="zoom" class="amap-demo" :center="center">
              <el-amap-marker  v-for="marker in markers" :position="marker.position" ></el-amap-marker>
            </el-amap>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>

</template>
<script>
import '../../../AMap/index.js'
    export default {
        name: "GPRS",
      props: {
        "markers": {
          type: Array
        },
        "center": {
          type: Array
        },
        "GPRStotal":{
          type: Number,
          default:0
        }
      },
    data () {
        return {
          zoom: 14,
          currentPage:1,
          pageSize:9,
        }
      },
  methods: {
    //返回时间格式化
    dateFormat(row,column){
      var date = row[column.property];
      if(date === undefined){
        return ''
      }
      return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    numfilter(val){
      let item = val.position[0];
      return Math.floor(item*10000)/10000;
    },
    numsfilter(val){
      let items = val.position[1];
      return Math.floor(items*10000)/10000;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
      }

    }
</script>

<style scoped>

</style>
