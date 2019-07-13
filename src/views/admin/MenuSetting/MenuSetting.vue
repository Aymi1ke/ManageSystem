<template>
	<div class="MenuSetting">
    <div class="table-box">
      <el-row>
        <el-col  style="float: left;margin-left: 20px">
          <el-button  @click.native="expandAll">全部展开</el-button>
          <el-button  @click.native="refresh" size="mini">刷新</el-button>
          <el-button  @click.native="handleMenuAdd" size="mini">添加</el-button>
        </el-col>
      </el-row>
      <div class="line"></div>
      <el-table
        :data="tableData"
        style="margin-bottom: 20px;"
        row-key="mid"
        :header-cell-style="getRowClass"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="title"  label="菜单名称"></el-table-column>
        <el-table-column prop="icon" label="图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon" style="font-size: 16px"></i>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
              <el-button type="primary" @click.native="handleMenuAdd(scope.row)">添加</el-button>
            <el-button @click.native="handleMenuEdit(scope.row)">编辑</el-button>
            <span ref="delete">
               <el-popover placement="top" trigger="click">
                  <p>确定删除 &nbsp {{scope.row.title}} &nbsp 吗?</p>
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
      <el-dialog
        :title="dialog_title"
        :visible.sync="dialogVisible"
        width="650px">
        <el-divider></el-divider>
        <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" class="is-required" prop="title">
                <el-input v-model="form.title" ></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-input v-model="form.icon" ></el-input>
              </el-form-item>
<!--              <el-form-item label="类型" class="is-required" prop="type">-->
<!--                <el-radio v-model="form.type" label="1">菜单</el-radio>-->
<!--                <el-radio v-model="form.type" label="2">动作</el-radio>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="状态" class="is-required" prop="state">-->
<!--                <el-radio v-model="form.state" label="1">可用</el-radio>-->
<!--                <el-radio v-model="form.state" label="2">禁用</el-radio>-->
<!--              </el-form-item>-->
            </el-col>
            <el-col :span="12">
<!--              <el-form-item label="标识">-->
<!--                <el-input></el-input>-->
<!--              </el-form-item>-->
              <el-form-item label="父级" >
                <el-select v-model="form.value" placeholder="父级菜单"  style="width: 180px;">
                  <el-option
                    v-for="item in options"
                    :key="item.level"
                    :label="item.title"
                    :value="item.level">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="排序" class="is-required" prop="sort">
                <el-input v-model="form.sort" ></el-input>
              </el-form-item>

              <el-form-item label="客户端路径" class="is-required" prop="url">
                <el-input v-model="form.url" ></el-input>
              </el-form-item>

            </el-col>
          </el-row>
        </el-form>

        <el-divider></el-divider>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
    <el-button type="primary" size="medium" @click="handleSubmit">确 定</el-button>
  </span>
      </el-dialog>
    </div>

	</div>
</template>

<script>
  export default {
		name: 'MenuSetting',
     inject:['reload'],
    data() {
      return {
        dialog_title:'',
        dialog_type:'',
        dialogVisible:false,
        form:{},
        rules: {
          title: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
          ],
          type: [
            {  required: true, message: '请选择类型', trigger: 'change' }
          ],
          state: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ],
          sort: [
            { required: true, message: '请输入排序', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请输入客户端路径', trigger: 'change' }
          ]
        },
      }
    },
    computed:{
       tableData(){
         return this.$store.getters.MenuList;
       },
       options(){
        let Menu = this.$store.getters.MenuList;
        // this.$set(Menu,0,{title: '顶级菜单',mid:''});
         return Menu
      }
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
      handleMenuAdd(row){
        this.dialogVisible = true;
        this.dialog_title = '添加菜单';
        this.dialog_type = 'ADD';
        console.log(this.options)
      },
      handleMenuEdit(row){
        this.dialogVisible = true;
        this.dialog_title = '编辑菜单';
        this.dialog_type = 'Edit';
        this.form = Object.assign({},row)
      },
      handleSubmit(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            alert(this.form.value);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      expandAll(){
        const els = this.$el.getElementsByClassName('el-table__expand-icon');
        for (let i = 0; i < els.length; i++) {
          els[i].click()
        }
      },
    }

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
