<template>
  <div class="WaitingOrder">
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
        <el-table-column prop="borrowId" label="订单号">
        </el-table-column>
        <el-table-column prop="userName" label="姓名">
        </el-table-column>
        <el-table-column prop="userPhone" label="手机号">
        </el-table-column>
        <el-table-column prop="borrowAmount" label="借款金额(元)"  :formatter="amountFormat">
        </el-table-column>
        <el-table-column prop="overdueDays" label="逾期天数">
        </el-table-column>
        <el-table-column prop="overdueRate" label="逾期滞纳金(元)" :formatter="amountFormat">
          <template slot-scope="scope">
            {{(scope.row.overdueDays*scope.row.overdueDayAmount)/100}}
          </template>
        </el-table-column>
        <el-table-column prop="accountManageFee" label="违约金(元)" :formatter="amountFormat">
        </el-table-column>
        <el-table-column prop="amountDue" label="应还款金额(元)" :formatter="amountFormat">
        </el-table-column>
        <el-table-column prop="repayTime" label="应还款日期" :formatter="dateFormats">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click.native="handleOperate(scope.row)">添加</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="detail" label="详情">
          <template slot-scope="scope">
            <el-button size="mini" @click.native="handleDetail(scope.row)">资料</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="催收"
        :visible.sync="dialogVisible"
        width="600px">
        <el-divider></el-divider>
        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
          <el-form-item label="催收方式"  class="is-required" prop="way">
            <el-col :span="15">
              <el-radio v-model="form.way" label="1">短信</el-radio>
              <el-radio v-model="form.way" label="2">电话</el-radio>
              <el-radio v-model="form.way" label="3">现场</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item label="催收结果" class="is-required" prop="result">
            <el-col :span="18">
              <el-radio v-model="form.result" label="1">失联</el-radio>
              <el-radio v-model="form.result" label="2">疑难</el-radio>
              <el-radio v-model="form.result" label="3">承诺</el-radio>
              <el-radio v-model="form.result" label="4">跳票</el-radio>
              <el-radio v-model="form.result" label="5">无还款诚意</el-radio>
              <el-radio v-model="form.result" label="6">家人代偿</el-radio>
              <el-radio v-model="form.result" label="7">其他</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item label="备注" class="is-required" prop="desc">
            <el-col :span="15">
              <el-input type="textarea"  placeholder="" v-model="form.desc" :autosize="{ minRows: 2, maxRows: 4}" maxlength="50" show-word-limit></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
    <el-button type="primary" @click.native="handleAddCall" size="medium">确 定</el-button>
  </span>
      </el-dialog>
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
        name: "WatingOrder",
      inject:["reload"],
      data() {
        return {
          filterForm: {
            idCardName: '',
            userPhone: '',
            borrowId:''
          },
          InitDate: [],
          gridData:[],
          loading:true,
          dialogVisible:false,
          dialogTableVisible:false,
          form:{
            way:'',
            result:'',
            desc:''
          },
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
            way:[
              { required: true, message: '请选择催收方式', trigger: 'change' }
            ],
            result:[
              { required: true, message: '请选择催收结果', trigger: 'change' }
            ],
            desc:[
              { required: true, message: '请输入备注', trigger: 'change' }
            ]
          }
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
        //返回时间格式化
        dateFormat(row, column) {
          var date = row[column.property];
          if (date === undefined) {
            return ''
          }
          return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");

        },
        dateFormats(row, column) {
          var date = row[column.property];
          if (date === undefined) {
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
        getInitPage(){
          this.$post('/MyOrder/toBeCollectedInit',{
            idCardName:this.filterForm.idCardName,
            userPhone:this.filterForm.userPhone,
            borrowId:this.filterForm.borrowId,
            assessorName:sessionStorage.getItem('name'),
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
        handleSizeChange(val) {
          this.pages.page_size = val;
          this.getInitPage();
        },
        handleCurrentChange(curval) {
          this.pages.page_index = curval;
          this.getInitPage();
        },
        handleDetail(row) {
          this.$router.push({path: '/UserDetail', query: {id: row.userId}});
          this.$store.dispatch('SaveUserId', row.userId);
        },
        handleOperate(row){
          this.dialogVisible = true;
          this.orderID = row.borrowId;
        },
        handleAddCall(){
          this.$refs.form.validate((valid) => {
            if (valid) {
             this.$post('/MyOrder/addCollectionRecord',{
               borrowId:this.orderID,
               urgeType:this.form.way,
               urgeResult:this.form.result,
               remarks:this.form.desc,
               assessorName:sessionStorage.getItem('name')
             }).then(res=>{
               if (res.resultCode == 'success'){
                this.$message({
                  message: res.resultMessage,
                  type: 'success'
                })
                 this.reload();
               }else{
                 this.$message({
                   message: res.resultMessage,
                   type: 'error'
                 })
               }
             })
            } else {
              return false;
            }
          });
        },
      }
    }
</script>

<style scoped>

</style>
