<template>
	<div class="list">
		<div  class="select-box">
			<el-form ref="form">
       <el-row>
				<el-col :xs="10" :sm="8" :md="7" :lg="5" :xl="5">
					<el-form-item label="筛选条件"   label-width="80px">
						<el-select placeholder="归属分组" v-model="value">
							<el-option label="审核" value="审核"></el-option>
							<el-option label="财务" value="财务"></el-option>
              <el-option label="催收" value="催收"></el-option>
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="超级管理员" value="超级管理员"></el-option>
						</el-select>
					</el-form-item>
        </el-col>
				<el-col :xs="10" :sm="8" :md="7" :lg="6" :xl="5">
					 <el-form-item label-width="20px">
					 		    <el-input placeholder="请输入订单号或者手机号码、用户名查询"></el-input>
					 		</el-form-item>
         </el-col>
         <el-col :xs="4" :sm="6" :md="4" :lg="3" :xl="4">
           <el-button type="danger"  style="margin-left: 10px" @click.native="getInitPage">搜索</el-button>
         </el-col>
			</el-row>
			</el-form>
		</div>
		<div class="table-box">
      <el-row>
        <el-col :span="8" style="float: left;margin-left: 20px">
          <el-button  @click.native="refresh" size="mini">刷新</el-button>
          <el-button icon="el-icon-plus" @click.native="handleAddStaff"  type="danger">添加新员工</el-button>
        </el-col>
        <el-col :span="3" style="float: right;margin-right: 20px">
          <el-button  icon="el-icon-printer" >导出报表</el-button>
        </el-col>
      </el-row>
      <div class="line"></div>
      <el-table ref="InitDate" :data="InitDate" stripe  style="margin-bottom: 20px;" v-loading="loading"
                :header-cell-style="getRowClass" >
				<el-table-column prop="name" label="系统账号"  >
				</el-table-column>
				<el-table-column prop="userName" label="员工姓名" >
				</el-table-column>
				<el-table-column prop="userPhone" label="手机号" >
				</el-table-column>
        <el-table-column  prop="idNumber"  label="身份证号码" >
        </el-table-column>
				<el-table-column prop="rDesc" label="归属分组"  >
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" sortable  :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="deleteTag" label="操作"  >
					<template slot-scope="scope">
						<el-button  type="text" size="small"  :class="scope.row.deleteTag=='0'?'off':'on'"  @click="OnSwitch(scope.row)"  style="color: #6FE59E">
                &nbsp&nbsp开启
            </el-button>
            <el-button  type="text" size="small"  :class="scope.row.deleteTag=='0'?'on':'off'"  @click="OffSwitch(scope.row)"  style="color: #F54747">
              禁用
            </el-button>
						<el-button type="text" size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
      <!-- 编辑页面-->
      <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible"  :close-on-click-modal="false" width="600px">
        <el-divider></el-divider>
        <el-form ref="editForm" :model="editForm" :rules="rules" label-width="180px" label="right" size="small">
          <el-form-item label="员工姓名" prop="userName" class="is-required" >
            <el-col :span="15">
              <el-input v-model="editForm.userName"  :disabled="isEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="员工手机号" prop="userPhone" class="is-required" >
            <el-col :span="15">
            <el-input v-model="editForm.userPhone" :disabled="isEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="员工身份证号码" class="inline is-required" prop="idNumber" >
            <el-col :span="15">
            <el-input v-model="editForm.idNumber" :disabled="isEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="系统账号" prop="name"  class="is-required">
            <el-col :span="15">
            <el-input v-model="editForm.name" :disabled="isEdit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="系统密码" prop="password"  class="is-required">
            <el-col :span="15">
            <el-input v-model="editForm.password"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="归属分组" prop="rDesc"  class="is-required">
            <el-select v-model="editForm.rDesc" placeholder="请选择">
              <el-option v-for="item in options" :label="item.rdesc" :value="item.rdesc"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
          <el-divider></el-divider>
        <span slot="footer" class="dialog-footer">
            <el-button @click.native="dialogFormVisible=false" size="medium">取 消</el-button>
            <el-button type="primary" @click.native="submitData" size="medium">确 定</el-button>
       </span>
      </el-dialog>
		</div>

	</div>
</template>

<script>
	export default {
    name: 'EmployeeList',
    inject:["reload"],
    data() {
      return {
        InitDate: [],
        btnControl: true,
        value: '',
        loading:true,
        dialogFormVisible: false,
        isEdit:false,
        dialog_title:'',
        dialog_type:'',
        editForm: {
          userName: '',
          userPhone: '',
          idNumber: '',
          rDesc: '',
          name: '',
          password: '',
        },
        options:[],
        rules: {
          userName: [
            {required: true, message: '请输入员工姓名', trigger: 'change'},
          ],
          userPhone: [
            {required: true, message: '请输入员工手机号', trigger: 'change'}
          ],
          idNumber: [
            {required: true, message: '请输入员工身份证号', trigger: 'change'}
          ],
          rDesc: [
            {required: true, message: '请选择归属分组', trigger: 'change'}
          ],
          name: [
            {required: true, message: '请输入系统账号', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请输入系统密码', trigger: 'change'}
          ],
        },
      }
    },
    computed: {},
    mounted() {
      this.getInitPage()
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
      getInitPage() {
        this.$post('/admin/queryAllPerson').then(res => {
          if (res.resultCode === "success") {
            this.loading = false;
            this.InitDate = res.resultData;
          }
        }).catch(error => {

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
      dialog_InitData(){
        this.$post('/admin/roleInit').then(res=>{
          if (res.resultCode == 'success'){
             this.options = res.resultData;
          }else{
            this.$message({
              message:res.resultMessage,
              type:'error'
            })
          }
        }).catch(error=>{

        })
      },
      OnSwitch(row) {
        let idx = row.name;
        console.log(idx);
        this.$confirm('您确定开启此员工权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$post('/admin/openPerson',{
              name: idx
          }).then(res => {
            if (res.resultCode === "success") {
              console.log(res)
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

        }).catch(error => {
        })
      },
      OffSwitch(row){
        let idx = row.name;
        this.$confirm('您确定禁用此员工权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$post('/admin/deletePerson',{
              name: idx
          }).then(res => {
            if (res.resultCode === "success") {
              console.log(res)
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

        }).catch(error => {
        })
      },
      handleAddStaff(){
        this.dialogFormVisible = true;
        this.dialog_type = 'ADD';
        this.dialog_title = '添加员工';
        this.isEdit = false;
        this.dialog_InitData();
      },
      //点击打开当前行编辑框
      handleEdit(index,row){
        this.dialogFormVisible = true;
        this.dialog_type = 'Edit';
        this.dialog_title = 'Edit';
        this.editForm = Object.assign({}, row);
        this.isEdit = true;
        this.dialog_InitData();
      },
      //编辑
      submitData(){
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            if(this.dialog_type=='Edit') {
              this.$post('/admin/updatePerson',{
                name:this.editForm.name,
                password:this.editForm.password,
                rDesc:this.editForm.rDesc
              }).then(res=>{
                if(res.resultCode==="success"){
                  console.log(res)
                  this.$message({
                    message: res.resultMessage,
                    type: 'success'
                  });
                  this.dialogFormVisible=false;
                  this.reload();
                }else{
                  this.$message({
                    message: res.resultMessage,
                    type: 'error'
                  });
                }
              }).catch(error=>{

              })
            }else if(this.dialog_type=='ADD'){
              this.$post('/admin/createPerson',{
                name:this.editForm.name,
                password:this.editForm.password,
                rname:this.editForm.rDesc,
                userPhone:this.editForm.userPhone,
                userName:this.editForm.userName,
                idNumber:this.editForm.idNumber
              }).then(res=>{
                if(res.resultCode==="success"){
                  console.log(res)
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
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      }
    }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .on{
    display: inline-block;
  }
  .off{
    display: none;
  }
</style>
