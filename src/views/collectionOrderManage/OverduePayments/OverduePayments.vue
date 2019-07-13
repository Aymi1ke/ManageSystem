<template>
    <div class="OverduePayments">
      <div class="select-box">
        <el-form ref="filterForm" :model="filterForm" size="mini" label="right"  :inline="true">
              <el-form-item label="姓名" label-width="50px">
                <el-input v-model="filterForm.idCardName" style="width: 105px"></el-input>
              </el-form-item>
              <el-form-item label="手机号" label-width="55px">
                <el-input v-model="filterForm.userPhone" style="width: 120px"></el-input>
              </el-form-item>
              <el-form-item label="订单号" label-width="55px">
                <el-input v-model="filterForm.borrowId" style="width: 195px"></el-input>
              </el-form-item>
              <el-form-item label="状态" label-width="40px" >
                <el-select v-model="filterForm.urgeConcatStatus" placeholder="请选择" style="width: 120px">
                  <el-option label="承诺还款" value="10"></el-option>
                  <el-option label="可联" value="20"></el-option>
                  <el-option label="失联" value="30"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="阶段" label-width="40px">
                <el-select v-model="filterForm.value" placeholder="请选择" style="width:120px">
                  <el-option label="1" value="shanghai"></el-option>
                  <el-option label="2" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="应还款日期" label-width="85px">
                <el-date-picker
                  v-model="filterForm.queryTime"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 260px">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="催收员" label-width="55px">
                <el-select v-model="filterForm.value" placeholder="请选择" style="width: 120px" @change="peopleInit()">
                  <el-option v-for="item in options" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-button size="mini"  type="danger" @click.native="getInitPage">搜索</el-button>


        </el-form>
      </div>
      <div class="table-box">
        <el-row>
          <el-col  style="float: left;margin-left: 20px">
            <el-button  @click.native="refresh" size="mini">刷新</el-button>
          </el-col>

        </el-row>
        <div class="line"></div>
        <el-table ref="InitDate" :data="InitDate"  stripe v-loading="loading"
                  :header-cell-style="getRowClass">
          <el-table-column prop="borrowId" label="订单号">
          </el-table-column>
          <el-table-column prop="userName" label="姓名">
          </el-table-column>
          <el-table-column prop="userPhone" label="手机号" >
          </el-table-column>
          <el-table-column prop="borrowAmount" label="借款金额" :formatter="amountFormat">
          </el-table-column>
          <el-table-column prop="overdueDays" label="逾期天数">
          </el-table-column>
          <el-table-column prop="truelyOverdueAmount" label="逾期滞纳金" :formatter="amountFormat">
            <template slot-scope="scope">
              {{(scope.row.overdueDayAmount*scope.row.overdueDays)/100}}
            </template>
          </el-table-column>
          <el-table-column prop="violateAmount" label="违约金" :formatter="amountFormat">
          </el-table-column>
          <el-table-column prop="truelyRepayAmount" label="累计欠款" :formatter="amountFormat">
          </el-table-column>
          <el-table-column prop="repayTime" label="应还款日期" :formatter="dateFormats">
          </el-table-column>
          <el-table-column prop="name" label="催收人	" >
          </el-table-column>
          <el-table-column prop="operate" label="操作" >
            <template slot-scope="scope">
              <el-button  size="mini" @click.native="handleDetail(scope.row)">查看</el-button>
              <el-button  size="mini" @click.native="handleAssign(scope.row)">分配</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="collectionReport" label="催收记录" >
            <template slot-scope="scope">
              <el-button  size="mini" @click.native="handleRecord(scope.row)">记录</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="分配催收员" :visible.sync="dialogFormVisible" width="600px">
          <el-divider></el-divider>
          <el-form ref="form" :model="form" :rules="rules" label-width="160px" size="medium">
            <el-form-item label="催收员" class="is-required">
              <el-select v-model="form.name" placeholder="请选择催收员">
                <el-option v-for="item in optionsName" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-divider></el-divider>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
            <el-button type="primary" @click.native="submitAllo" size="medium">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="催收跟进记录" :visible.sync="dialogTableVisible" width="800px">
          <el-table :data="gridData" border>
            <el-table-column property="urgeType" label="催收方式" >
              <template slot-scope="scope">
                {{scope.row.urgeType== '1'? '短信':
                (scope.row.urgeType== '2'? '电话':
                (scope.row.urgeType== '3'? '现场':''))}}
              </template>
            </el-table-column>
            <el-table-column property="urgeResult" label="催收结果" >
              <template slot-scope="scope">
                {{scope.row.urgeResult== '1'? '失联':
                (scope.row.urgeResult== '2'? '疑难':
                (scope.row.urgeResult== '3'? '承诺':
                (scope.row.urgeResult== '4'? '跳票':
                (scope.row.urgeResult== '5'? '无还款诚意':
                (scope.row.urgeResult== '6'? '家人代偿':
                (scope.row.urgeResult== '6'? '其他': ''))))))}}
              </template>
            </el-table-column>
            <el-table-column property="remarks" label="催收备注"></el-table-column>
            <el-table-column property="receiver" label="催收人员"></el-table-column>
            <el-table-column property="createTime" label="操作时间" :formatter="dateFormat"></el-table-column>
          </el-table>
          <el-divider></el-divider>
        </el-dialog>
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
        name: "OverduePayments",
      inject:["reload"],
      data() {
        return {
          filterForm: {
            idCardName: '',
            userPhone: '',
            borrowId:'',
            queryTime: '',
            urgeConcatStatus:''
          },
          loading:true,
          dialogFormVisible: false,
          dialogTableVisible:false,
          InitDate: [],
          gridData:[],
          optionsName:[],
          form:{
            name:'',
          },
          options:[],
          orderID:'',
          //需要给分页组件传的信息
          pages: {
            page_index: 1,  // 当前位于哪页
            total: 0,        // 总数
            page_size: 20,   // 1页显示多少条
            page_sizes: [10, 20, 30, 40],  //每页显示多少条
            layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
          },
          rules:{
            name:[
              { required: true, message: '请选择催收员', trigger: 'change' }
            ]
          }

        }
      },
      filters:{
        amount(value) {
          if(value){
            return (value = value/100)
          }else{
            return (value = '')
          }
        },
        formatDate(time){
          let date = new Date(time)
          return formatDate(date,'yyyy-MM-dd hh:mm:ss')
        },
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
        peopleInit(){
          this.$post('/collectionInit',this.filterForm).then(res=>{
            if(res.resultCode==="success"){
              this.options = res.resultData;
            }else {
              this.$message({
                message: res.resultMessage,
                type: 'error'
              });
            }
          }).catch(error=>{

          })
        },
        dialog_InitData(){
          this.$post('/collectionInit',{
            name: '',
            userName: '',
            userPhone: '',
            groupName:'',
            jobNumber:'',
            state:''
          }).then(res=>{
            if(res.resultCode==="success"){
              this.optionsName = res.resultData;
            }else {
              this.$message({
                message: res.resultMessage,
                type: 'error'
              });
            }
          }).catch(error=>{

          })
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
          this.$post('/overduePayments',{
            idCardName: this.filterForm.idCardName,
            userPhone: this.filterForm.userPhone,
            borrowId:this.filterForm.borrowId,
            queryTime: JSON.stringify(this.filterForm.queryTime),
            urgeConcatStatus:this.filterForm.urgeConcatStatus,
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
        handleDetail(row){
          this.$router.push({path:'/UserDetail',query:{id:row.userId}})
          this.$store.dispatch('SaveUserId',row.userId);
        },
        handleAssign(row){
          this.dialogFormVisible = true;
          this.dialog_InitData();
          this.orderID = row.borrowId
        },
        submitAllo(form) {
          this.$refs.form.validate((valid) => {
            if (valid) {
              this.$post('/distributionOrder',{
                borrowId:this.orderID,
                name:this.form.name
              }).then(res=>{
                if(res.resultCode==="success") {
                  this.$message({
                    message: res.resultMessage,
                    type: 'success'
                  });
                  this.reload();
                }else{
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
        handleRecord(row){
          this.dialogTableVisible = true;
          this.$post('/MyOrder/detailsOfCollection',{
            borrowId:row.borrowId,
          }).then(res=>{
            if (res.resultCode==="success"){
              this.gridData = res.resultData;
            }else{
              this.$message({
                message: res.resultMessage,
                type: 'error'
              })
            }
          }).catch(error=>{

          })

        },

      }
    }
</script>

<style scoped>

</style>
