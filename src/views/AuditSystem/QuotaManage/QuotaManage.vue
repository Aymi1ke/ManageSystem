<template>
  <div class="quota">
    <div class="select-box">
      <el-form ref="form" :model="filterForm" size="mini" label="right" :inline="true">
        <el-form-item label="UID" label-width="40px">
          <el-input v-model="filterForm.UID" style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="40px">
          <el-input v-model="filterForm.idCardName" style="width: 105px"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="55px">
          <el-input v-model="filterForm.userPhone" style="width: 110px"></el-input>
        </el-form-item>
        <el-form-item label="身份证" label-width="70px">
          <el-input v-model="filterForm.userCardId" style="width: 160px"></el-input>
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
      <el-table ref="InitDate" :data="InitDate" stripe v-loading="loading"
                :header-cell-style="getRowClass">
        <el-table-column prop="uid" label="UID" >
        </el-table-column>
        <el-table-column prop="userName" label="姓名">
        </el-table-column>
        <el-table-column prop="userPhone" label="手机号" >
        </el-table-column>
        <el-table-column prop="userIdCard" label="身份证" >
        </el-table-column>
        <el-table-column prop="borrowCount" label="借款次数" >
        </el-table-column>
        <el-table-column prop="overdueDaycount" label="最近一次逾期天数">
        </el-table-column>
        <el-table-column prop="creditAmount" label="当前额度" :formatter="amountFormat">
        </el-table-column>
        <el-table-column prop="operate" label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleRecord(scope.row)">记录</el-button>
            <el-button type="danger" size="mini" @click="handleQuotaSet(scope.row)">设置额度</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="额度设置记录" :visible.sync="dialogTableVisible" width="600px">
        <el-table :data="gridData">
          <el-table-column property="liftingCreditFront" label="额度" :formatter="amountFormat"></el-table-column>
          <el-table-column property="name" label="类型" ></el-table-column>
          <el-table-column property="liftingDateime" label="处理时间" :formatter="dateFormat"></el-table-column>
          <el-table-column property="pid" label="处理人">
            <template slot-scope="scope">
              {{scope.row.pid == '0'?'自动提额':scope.row.pid}}
            </template>
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
      </el-dialog>
      <el-dialog title="设置额度" :visible.sync="dialogFormVisible" width="600px" >
        <el-divider></el-divider>
        <el-form ref="form" :model="form" label-width="160px" size="medium" :rules="rules">
          <el-form-item label="调整额度" class="is-required" prop="quota">
            <el-select v-model="form.quota" placeholder="请选择额度">
              <el-option v-for="item in options"  :label="item.borrowAmount/100" :value="item.borrowProductId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="handleUpQuota">确 定</el-button>
        </div>
      </el-dialog>
      <!--分页-->
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
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
        name: "QuotaManage",
      inject: ["reload"],
      data() {
        return {
          filterForm: {
            UID: '',
            idCardName: '',
            userPhone: '',
            userCardId: '',
          },
          InitDate: [],
          gridData:[],
          options:[],
          dialogTableVisible:false,
          dialogFormVisible: false,
          loading:true,
          form:{},
          userId:0,
          //需要给分页组件传的信息
          pages: {
            page_index: 1,  // 当前位于哪页
            total: 0,        // 总数
            page_size: 20,   // 1页显示多少条
            page_sizes: [10, 20, 30, 40],  //每页显示多少条
            layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
          },
          rules:{
            quota:[
              { required: true, message: '请选择额度', trigger: 'change' }
            ]
          }
        }
      },
      computed: {},
      mounted() {
        this.getInitPage();
      },
      methods: {
        refresh() {
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
        dateFormat(row, column) {
          var date = row[column.property];
          if (date === undefined) {
            return ''
          }
          return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");

        },
        //页面初始化
        getInitPage() {
          this.$post('/CqUser/quotaManagement', {
            UID: this.filterForm.UID,
            idCardName: this.filterForm.idCardName,
            userPhone: this.filterForm.userPhone,
            userCardId: this.filterForm.userCardId,
            pageSize: this.pages.page_size,
            currentPage: this.pages.page_index,
          }).then(res => {
            if (res.resultCode === "success") {
              this.loading = false;
              this.InitDate = res.resultData;
              this.pages.page_index = res.paging.currentPage;
              this.pages.total = res.paging.total;
              this.pages.page_size = res.paging.pageSize;
            } else {
              this.$message({
                message: res.resultMessage,
                type: 'error'
              });
            }
          }).catch(error => {

          })
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
        //选择额度下拉框初始化
        dialog_Init(){
          this.$post('/CqUser/liftingAmountInit').then(res =>{
            if (res.resultCode === "success") {
              this.options = res.resultData;
            } else {
              this.$message({
                message: res.resultMessage,
                type: 'error'
              });
            }
          }).catch(error => {

          })
        },
       //打开记录按钮
        handleRecord(row) {
          this.dialogTableVisible = true;
          this.$post('/CqUser/drawingRecord',{
            userId:row.uid,
          }).then(res=>{
            if (res.resultCode === "success") {
              this.gridData = res.resultData;
            } else {
              this.$message({
                message: res.resultMessage,
                type: 'error'
              });
            }
          }).catch(error=>{

          })
        },
        //打开设置额度按钮
        handleQuotaSet(row) {
          this.userId = row.uid;
          this.dialogFormVisible = true;
          this.dialog_Init();
        },
        //确定提额按钮
        handleUpQuota(){
          this.$refs.form.validate((valid) => {
            if (valid) {
              this.$post("/CqUser/userLiftingAmount",{
                userId:this.userId,
                borrowProductId:this.form.quota,
                pid:sessionStorage.getItem('pid')
              }).then(res =>{
                if (res.resultCode === "success") {
                  this.$message({
                    message: res.resultMessage,
                    type: 'success'
                  });
                  this.reload();
                } else {
                  this.$message({
                    message: res.resultMessage,
                    type: 'error'
                  });
                }
              }).catch(error=>{

              })
            } else {
              return false;
            }
          });
      },

      },

    }

</script>

<style scoped>

</style>
