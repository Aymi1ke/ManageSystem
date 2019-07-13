<template>
<div class="collectionPersonList">
  <div class="select-box">
    <el-form ref="filterForm" :model="filterForm" size="mini" label="right" :inline="true">

          <el-form-item label="系统账号名" label-width="85px">
            <el-input v-model="filterForm.name" style="width: 120px"></el-input>
          </el-form-item>

          <el-form-item label="真实姓名" label-width="70px">
            <el-input v-model="filterForm.userName" style="width: 120px"></el-input>
          </el-form-item>

          <el-form-item label="手机号" label-width="55px">
            <el-input v-model="filterForm.userPhone" style="width: 120px"></el-input>
          </el-form-item>

          <el-form-item label="分组" label-width="40px">
            <el-select v-model="filterForm.groupName" placeholder="请选择" style="width: 120px">
              <el-option label="xiaomin" value="shanghai"></el-option>
              <el-option label="芳神" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="工号" label-width="40px">
            <el-input v-model="filterForm.jobNumber" style="width: 120px"></el-input>
          </el-form-item>

          <el-form-item label="状态" label-width="40px">
            <el-select v-model="filterForm.state" placeholder="全部状态" style="width: 120px">
              <el-option label="在职" value="1"></el-option>
              <el-option label="离职" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-button size="mini" type="danger" @click.native="getInitPage">搜索</el-button>



    </el-form>
  </div>
  <div class="table-box">
    <el-row>
      <el-col  style="float: left;margin-left: 20px">
        <el-button  @click.native="refresh" size="mini">刷新</el-button>
        <el-button  icon="el-icon-plus" size="mini" @click.native="handleAddstaff" type="danger">添加</el-button>
      </el-col>

    </el-row>
    <div class="line"></div>
    <el-table ref="filterTable" :data="InitDate"  stripe style="margin-bottom: 20px"
              :header-cell-style="getRowClass">
      <el-table-column prop="name" label="用户名" >
      </el-table-column>
      <el-table-column prop="userName" label="真实姓名">
      </el-table-column>
      <el-table-column prop="userPhone" label="手机号" >
      </el-table-column>
      <el-table-column prop="groupName" label="分组" >
      </el-table-column>
      <el-table-column prop="jobNumber" label="工号" >
      </el-table-column>
      <el-table-column prop="borrowCount" label="订单数量">
      </el-table-column>
      <el-table-column prop="state" label="状态" >
        <template slot-scope="scope">
           <el-tag :type="scope.row.state=='1'?'success':'danger'">{{scope.row.state=='1'?'在职':'离职'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作" >
        <template slot-scope="scope">
          <el-button  size="mini" type="danger" @click.native="handleAllo(scope.row)">转移订单</el-button>
          <el-button  size="mini" @click.native="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialog_title"
      :visible.sync="dialogVisible"
      width="600px">
      <el-divider></el-divider>
      <el-form ref="form" :model="form" :rules="rules"  label-width="160px" size="small" :inline-message="true">
        <el-form-item label="绑定管理员" class="is-required" prop="name">
          <el-col :span="12">
            <el-select v-model="form.name" :disabled="isTrue">
              <el-option v-for="item in optionsName" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
         <el-col :span="24">
            <p class="marks">请先至员工管理中添加相关管理员。绑定后不支持修改.</p>
         </el-col>
        <el-form-item label="分组" class="is-required" prop="groupName">
          <el-col :span="12">
          <el-select v-model="form.groupName" placeholder="请选择分组">
            <el-option v-for="item in optionsGroup" :label="item.groupName" :value="item.groupName"></el-option>
          </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="工号" class="is-required" prop="jobNumber">
          <el-col :span="12">
          <el-input v-model="form.jobNumber"></el-input>
          </el-col>
        </el-form-item>
          <el-col :span="24">
            <p class="marks">工号唯一，不可重复</p>
          </el-col>
        <el-form-item label="状态" class="is-required" prop="state" v-if="isAdd">
          <el-col :span="24">
          <el-radio v-model="form.state" :label="1">在职</el-radio>
          <el-radio v-model="form.state" :label="0">离职</el-radio>
          </el-col>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click.native="submitForm" size="medium">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="转移订单" :visible.sync="dialogTableVisible" width="800px">
      <el-divider></el-divider>
      <el-table :data="gridData"  @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="borrowId" label="订单号" ></el-table-column>
        <el-table-column property="userName" label="姓名"></el-table-column>
        <el-table-column property="userPhone" label="电话号码"></el-table-column>
        <el-table-column property="orderStart" label="状态">
          <template slot-scope="scope">
            {{scope.row.orderStart =='0'?'待打款':
            (scope.row.orderStart =='1'?'打款中':
            (scope.row.orderStart =='2'?'已到账':
            (scope.row.orderStart =='3'?'打款失败':
            (scope.row.orderStart =='4'?'待还款':
            (scope.row.orderStart =='5'?'已还款':
            (scope.row.orderStart =='6'?'逾期未还款':
            (scope.row.orderStart =='7'?'逾期已还款':
            (scope.row.orderStart =='8'?' 部分成功':''))))))))}}
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              v-if='pages.total > 0'
              :current-page.sync="pages.page_index"
              :page-sizes="pages.page_sizes"
              :page-size="pages.page_size"
              :layout="pages.layout"
              :total="pages.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-form :model="alloFrom" size="medium" style="padding-bottom: 20px">
        <el-form-item >
          <el-col :span="7">
            <el-select v-model="alloFrom.name" placeholder="请选择催收员">
              <el-option v-for="item in options" :label="item.name" :value="item.pid"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
             <el-button type="primary" @click.native="handleSubmit">分配</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>


</div>
</template>

<script>
export default {
name: "collectionPersonList",
inject:["reload"],
data() {
  return {
    filterForm: {
      name: '',
      userName: '',
      userPhone: '',
      groupName:'',
      jobNumber:'',
      state:''
    },
    InitDate: [],
    dialogVisible:false,
    dialogTableVisible:false,
    options:[],
    optionsName:[],
    optionsGroup:[],
    orderID:'',
    form:{
      name:'',
      groupName:'',
      jobNumber:'',
      state:'',
    },
    alloFrom:{
      region:''
    },
    dialog_type:'',
    dialog_title:'',
    gridData:[],
    isTrue:false,
    isAdd:true,
    rules:{
      name:[
        {  required: true, message: '请选择管理员名称', trigger: 'change' }
      ],
      groupName:[
        {  required: true, message: '请选择分组', trigger: 'change' }
      ],
      jobNumber:[
        {  required: true, message: '请输入工号', trigger: 'blur' }
      ],
      state:[
        {  required: true, message: '请选择状态', trigger: 'change' }
      ]
    },
    //需要给分页组件传的信息
    pages: {
      page_index: 1,  // 当前位于哪页
      total: 0,        // 总数
      page_size: 10,   // 1页显示多少条
      page_sizes: [10, 20, 30, 40],  //每页显示多少条
      layout: "total, sizes, prev, pager, next"   // 翻页属性
    },
  }
},
computed: {

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
  handleSizeChange(val) {
    this.pages.page_size = val;
    this.handleAllo();
  },
  handleCurrentChange(curval) {
    this.pages.page_index = curval;
    this.handleAllo();
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
    this.$post('/collectionInit',this.filterForm).then(res=>{
      if(res.resultCode==="success"){
        this.InitDate = res.resultData;

      }else {
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
  handleEdit(row){
    this.dialog_type = 'Edit';
    this.dialog_title = '编辑催收人员';
    this.dialogVisible = true;
    this.form = Object.assign({},row)
    this.isAdd = true;
    if(this.form.name){
      this.isTrue = true;
    }
    this.dialog_InitData();
  },
  handleAddstaff(){
    this.dialog_type = 'ADD';
    this.dialog_title = '添加催收人员';
    this.dialogVisible = true;
    this.isAdd = false;
    this.dialog_InitData();
  },
  //打开转移订单,弹框初始化
  handleAllo(row){
    this.dialogTableVisible = true;
    this.selectInit();
    this.$post('/transferBorrow',{
      pid:row.pid,
      pageSize:this.pages.page_size,
      currentPage:this.pages.page_index,
    }).then(res=>{
      if(res.resultCode==="success") {
       this.gridData = res.resultData;
        this.pages.page_index =res.paging.currentPage;
        this.pages.total =res.paging.total;
        this.pages.page_size =res.paging.pageSize;
      }
    }).catch(error=>{

    })
  },
  //下拉框初始化
  selectInit(){
    this.$post('/transferOrders').then(res=>{
      if(res.resultCode==="success") {
        this.options = res.resultData;
      }
    }).catch(error=>{

    })
  },
  //点击转移订单分配按钮
  handleSubmit(){
    this.$post('/distributionOfOrders',{
      pid:this.alloFrom.name,
      borrowId: JSON.stringify(this.orderID),
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
  },
  handleSelectionChange(val) {
    if(val.length){
      const ids = [];
      for (var i=0;i<val.length;i++){
        ids.push(val[i].borrowId);
      }
      this.orderID = ids;
    }else{
      this.orderID = '';
    }
  },
  dialog_InitData(){
      this.$post('/clickAdd',{}).then(res=>{
        if(res.resultCode==="success") {
          this.optionsGroup = res.resultData.groupName;
          this.optionsName = res.resultData.peoples;
        }
      })
  },
  submitForm(){
    this.$refs.form.validate((valid) => {
      if (valid) {
       if(this.dialog_type == 'ADD'){
         this.$post('/addCollection',{
           name:this.form.name,
           groupName:this.form.groupName,
           jobNumber:this.form.jobNumber
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
             this.reload();
           }
         }).catch(error=>{

         })
       }else if(this.dialog_type == 'Edit'){
         this.$post('/updateCollection',this.form).then(res=>{
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
             this.reload();
           }
         }).catch(error=>{

         })

       }
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
