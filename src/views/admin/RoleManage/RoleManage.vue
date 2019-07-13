<template>
  <div class="RoleManage">
    <div  class="table-box">
      <el-row>
        <el-col :span="5" style="float: left;margin-left: 20px">
          <el-button  @click.native="refresh" size="mini">刷新</el-button>
          <el-button  icon="el-icon-plus" size="mini" @click.native="handleADD">添加</el-button>
        </el-col>
      </el-row>
      <div class="line"></div>
      <el-table ref="InitDate" :data="InitDate" stripe  v-loading="loading" style="margin-bottom: 20px;"
                :header-cell-style="getRowClass">
        <el-table-column prop="rname" label="角色名称">
        </el-table-column>
        <el-table-column prop="rdesc" label="别名">
        </el-table-column>
        <!--        <el-table-column prop="userPhone" label="备注" >-->
        <!--        </el-table-column>-->
        <el-table-column prop="created" label="添加时间" :formatter="dateFormat">
        </el-table-column>
        <!--        <el-table-column prop="deleteTime" label="状态"  >-->
        <!--        </el-table-column>-->
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button  size="mini" @click.native="handleEdit(scope.row)">编辑</el-button>
            <span ref="delete">
               <el-popover placement="top" trigger="click">
                  <p>确定删除 &nbsp {{scope.row.rdesc}} &nbsp 吗?</p>
                  <div style="text-align:center">
                    <el-button size="mini"  @click.native.prevent="$refs.delete.click()">取消</el-button>
                    <el-button type="primary" size="mini" @click.native.prevent="$refs.delete.click()">确定</el-button>
                  </div>
                    <el-button  slot="reference" type="danger">删除</el-button>
               </el-popover>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible" width="650px">
        <el-divider></el-divider>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" :inline="true" size="mini">
          <el-form-item label="角色名称" class="is-required" prop="rname" >
            <el-input v-model="form.rname"  :disabled="isEdit"></el-input>
          </el-form-item>
          <el-form-item label="别名"  class="is-required" prop="rdesc">
            <el-input v-model="form.rdesc" :disabled="isEdit"></el-input>
          </el-form-item>
          <!--          <el-form-item label="备注" prop="name">-->
          <!--            <el-input v-model="form.name" ></el-input>-->
          <!--          </el-form-item >-->
          <!--          <el-form-item label="状态" class="is-required" prop="state">-->
          <!--            <el-radio v-model="form.state" label="1">可用</el-radio>-->
          <!--            <el-radio v-model="form.state" label="2">禁用</el-radio>-->
          <!--          </el-form-item>-->
        </el-form>
        <div style="height: 300px;padding-left: 100px;overflow: auto">
          <el-button @click.native="expandALL">全部展开</el-button>
          <el-button @click.native="expandNone">全部收缩</el-button>
          <el-button  @click.native="checkAll">全选</el-button>
          <el-button @click.native="checkNone">取消</el-button>
          <el-tree
            :data="data"
            show-checkbox
            node-key="mid"
            ref="navTree"
            :default-expand-all="isexpand"
            :default-checked-keys="[]"
            highlight-current
            :getCheckedKeys="true"
            :props="defaultProps">
          </el-tree>
        </div>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
          <el-button type="primary" @click.native="getChecked" size="medium">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'RoleManage',
    inject:["reload"],
    data() {
      return {
        dialogFormVisible:false,
        InitDate: [],
        form:{
          name:''
        },
        defaultProps:{
          children: 'children',
          label: 'title'
        },
        loading:true,
        isexpand: false,
        dialog_title:'',
        dialog_type:'',
        rules:{
          rname:[
            { required: true, message: '请输入角色名称', trigger: 'change' }
          ],
          rdesc:[
            { required: true, message: '请输入角色别名', trigger: 'change' }
          ]
        },
        isEdit:false
      }
    },
    computed:{
      data(){
        return this.$store.getters.MenuList
      }
    },
    mounted(){
      this.getInitPage();
    },
    methods: {
      refresh(){
        this.reload()
      },
      //返回时间格式化
      dateFormat(row,column){
        var date = row[column.property];
        if(date === undefined){
          return ''
        }
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      getRowClass({row, column, rowIndex, columnIndex}) {
        if (rowIndex == 0) {
          return 'background:#efefef'
        } else {
          return ''
        }
      },
      getInitPage(){
        this.$post('/admin/roleInit').then(res=>{
          if (res.resultCode == 'success'){
            this.loading = false;
            this.InitDate = res.resultData;
          }else{
            this.$message({
              message:res.resultMessage,
              type:'error'
            })
          }
        }).catch(error=>{

        })
      },
      handleEdit(row){
        this.dialog_title = '编辑角色';
        this.dialog_type = 'Edit';
        this.dialogFormVisible = true;
        this.form = Object.assign({},row);
        this.isEdit = true;
      },
      handleADD(){
        this.dialog_title = '添加角色';
        this.dialog_type = 'ADD';
        this.dialogFormVisible = true;
        this.isEdit = false;
      },
      //全部展开
      expandALL(){
        for(let i=0;i<this.$refs.navTree.store._getAllNodes().length;i++){
          this.$refs.navTree.store._getAllNodes()[i].expanded=!this.isexpand;
        }
      },
      //全部收缩
      expandNone(){
        for(let i=0;i<this.$refs.navTree.store._getAllNodes().length;i++){
          this.$refs.navTree.store._getAllNodes()[i].expanded=this.isexpand;
        }
      },
      // 全选
      checkAll() {
        this.$refs.navTree.setCheckedNodes(this.data)
      },
      //反选
      checkNone(){
        this.$refs.navTree.setCheckedNodes([])
      },
      getChecked(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.dialog_type === 'ADD'){
              this.$post('/admin/createRole',{
                rname:this.form.rname,
                rdesc:this.form.rdesc,
                menuId:JSON.stringify(this.$refs.navTree.getCheckedKeys()),
              }).then(res=>{
                if (res.resultCode == 'success'){
                  this.$message({
                    message:res.resultMessage,
                    type:'success'
                  })
                  this.reload();
                }else{
                  this.$message({
                    message:res.resultMessage,
                    type:'error'
                  })
                }
              }).catch(error=>{

              })
            }else if (this.dialog_type === 'Edit'){
              this.$post('/admin/updateRole',{
                rid:this.form.rid,
                rname:this.form.rname,
                rdesc:this.form.rdesc,
                menuId:JSON.stringify(this.$refs.navTree.getCheckedKeys()),
              }).then(res=>{
                if (res.resultCode == 'success'){
                  this.$message({
                    message:res.resultMessage,
                    type:'success'
                  })
                  this.reload();
                }else{
                  this.$message({
                    message:res.resultMessage,
                    type:'error'
                  })
                }
              }).catch(error=>{

              })
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .role_wrap{
    width: 80%;
    padding:0 10px 20px;
    border-radius:10px;
    border: 1px solid #dfdfdf;
    border-top:50px solid #dfdfdf;
    position: relative;
    margin: 0 auto 10px;
  }
  .role_title{
    margin-top: -50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-bottom: 5px;
  }
</style>

