<template>
  <div class="collectionGroup">
    <div class="table-box">
      <el-row>
        <el-col  style="float: left;margin-left: 20px">
          <el-button  @click.native="refresh" size="mini">刷新</el-button>
          <el-button  icon="el-icon-plus" size="mini" @click.native="handleAddgroup" type="danger">添加</el-button>
        </el-col>

      </el-row>
      <div class="line"></div>
      <el-table ref="InitDate" :data="InitDate" stripe style="margin-bottom: 20px"
                :header-cell-style="getRowClass" >
        <el-table-column prop="urgeGroupId" label="分组ID" >
        </el-table-column>
        <el-table-column prop="groupName" label="分组" >
        </el-table-column>
        <el-table-column prop="resetDays" label="返回公海天数阀值">
        </el-table-column>
        <el-table-column prop="status" label="状态" >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status=='1'?'success':'danger'">{{scope.row.status=='1'?'启用':'禁用'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" >
          <template slot-scope="scope">
            <el-button  size="mini" @click.native="handleEdit(scope.row)">编辑</el-button>
          </template>

        </el-table-column>
      </el-table>
      <el-dialog
        :title="dialog_title"
        :visible.sync="dialogVisible"
        width="600px">
        <el-divider></el-divider>
        <el-form ref="form" :model="form" :rules="rules"  label-width="160px" size="mini" :inline-message="true">
          <el-form-item label="分组" class="is-required" prop="groupName">
            <el-col :span="14">
              <el-input v-model="form.groupName"></el-input>
            </el-col>
          </el-form-item>
          <el-col :span="24">
            <p class="marks">名称唯一，不可重复</p>
          </el-col>
          <el-form-item label="返回公海天数" class="is-required" prop="resetDays">
            <el-col :span="14">
              <el-input v-model="form.resetDays"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="分组说明" class="is-required" prop="comments">
            <el-col :span="14">
              <el-input type="textarea" v-model="form.comments"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="状态" class="is-required" v-if="isAdd" prop="status">
            <el-col :span="24">
              <el-radio v-model="form.status" :label='1'>启用</el-radio>
              <el-radio v-model="form.status" :label='0'>禁用</el-radio>
            </el-col>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click.native="submitForm" size="medium">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
    export default {
        name: "collectionGroup",
      inject:["reload"],
      data() {
        return {
          InitDate: [],
          form:{
            groupName:'',
            resetDays:'',
            comments:'',
            status:'',
          },
          ID:'',
          dialogVisible:false,
          dialog_type:'',
          dialog_title:'',
          isAdd:true,
          rules:{
            groupname:[
              {  required: true, message: '请输入分组名称', trigger: 'change' }
            ],
            resetDays:[
              {  required: true, message: '请输入公海天数', trigger: 'change' }
            ],
            comments:[
              {  required: true, message: '请输入备注说明', trigger: 'change' }
            ],
            status:[
              {  required: true, message: '请选择状态', trigger: 'change' }

            ]
          }
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
        //返回时间格式化
        dateFormat(row,column){
          var date = row[column.property];
          if(date === undefined){
            return ''
          }
          return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");

        },
        getInitPage(){
          this.$post('/collectionGroupInit',{}).then(res=>{
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
          this.dialogVisible = true;
          this.isAdd = true;
          this.dialog_title = '编辑催收分组';
          this.form = Object.assign({},row);
          this.ID = row.urgeGroupId;
        },
        handleAddgroup(){
          this.dialog_type = 'ADD';
          this.dialogVisible = true;
          this.dialog_title = '添加催收分组';
          this.isAdd = false;
        },
        submitForm(){
          this.$refs.form.validate((valid) => {
            if (valid) {
              if( this.dialog_type == 'ADD'){
                this.$post('/createCollection',{
                  groupName:this.form.groupName,
                  commonSea:this.form.resetDays,
                  explain:this.form.comments
                }).then(res=>{
                  if(res.resultCode == 'success'){
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
                this.$post('/updateCqUrgeGroup',{
                  urgeGroupId:this.ID,
                  groupName:this.form.groupName,
                  commonSea:this.form.resetDays,
                  explain:this.form.comments,
                  status:this.form.status
                }).then(res=>{
                  if(res.resultCode == 'success'){
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
        }
      }
    }
</script>

<style scoped>

</style>
