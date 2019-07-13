<template>
    <div class="userinfo">
        <div class="select-box">
          <el-form ref="filterForm" :model="filterForm" size="mini" label="right" :inline="true">
                <el-form-item label="UID" label-width="40px">
                  <el-input v-model="filterForm.UID" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="40px">
                  <el-input v-model="filterForm.idCardName" style="width: 105px"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="55px">
                  <el-input v-model="filterForm.userPhone" style="width: 120px"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" label-width="70px">
                  <el-input v-model="filterForm.bankCardId" style="width: 160px"></el-input>
                </el-form-item>
                <el-form-item label="渠道" label-width="40px">
                  <el-input style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item label="注册日期" label-width="70px">
                  <el-date-picker
                    v-model="filterForm.queryTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 260px">
                  </el-date-picker>
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
          <el-table-column prop="idCardName" label="姓名">
          </el-table-column>
          <el-table-column prop="userPhone" label="手机号" >
          </el-table-column>
          <el-table-column prop="bankCardId" label="身份证" >
          </el-table-column>
          <el-table-column prop="createTime" label="注册时间" :formatter="dateFormat">
          </el-table-column>
          <el-table-column prop="registerPhone" label="注册设备">
          </el-table-column>
          <el-table-column prop="lastLoginTime" label="最后登录" :formatter="dateFormat">
          </el-table-column>
          <el-table-column prop="loginPhone" label="登录设备">
          </el-table-column>
          <el-table-column prop="creditAmount" label="授信额度" :formatter="amountFormat">
          </el-table-column>
          <el-table-column prop="channel" label="渠道">
          </el-table-column>
          <el-table-column prop="operate" label="操作" >
             <template slot-scope="scope">
                 <el-button @click="handleDetail(scope.row)" size="mini">资料</el-button>
                 <span ref="black" >
                    <el-popover placement="top" trigger="click" >
                      <p class="sf-red">确定要将{{scope.row.idCardName}}加入黑名单吗?</p>
                      <div style="text-align: center;">
                        <el-button size="mini" @click.native.prevent="$refs.black.click()">取消</el-button>
                        <el-button type="danger" size="mini" @click.native.prevent="handleAddBlack(scope.row)">确定</el-button>
                      </div>
                      <el-button slot="reference" icon="el-icon-plus" type="danger" size="mini" plain>黑名单</el-button>
                    </el-popover>
               </span>

                 <span ref="page">
                    <el-popover placement="top" trigger="click" >
                      <p class="sf-red">确定要删除{{scope.row.idCardName}}吗?</p>
                      <div style="text-align: center;">
                        <el-button size="mini" @click.native.prevent="$refs.page.click()">取消</el-button>
                        <el-button type="danger" size="mini" @click.native.prevent="handleDelete(scope.row)">确定</el-button>
                      </div>
                      <el-button  slot="reference"  type="danger" size="mini">删除</el-button>
                    </el-popover>
               </span>

             </template>

          </el-table-column>
        </el-table>
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
      name: "UserInfo",
      inject: ["reload"],
      data() {
        return {
          filterForm: {
            UID: '',
            idCardName: '',
            userPhone: '',
            bankCardId: '',
            queryTime: ''
          },
          InitDate: [],
          visible2: false,
          loading:true,
          //需要给分页组件传的信息
          pages: {
            page_index: 1,  // 当前位于哪页
            total: 0,        // 总数
            page_size: 20,   // 1页显示多少条
            page_sizes: [10, 20, 30, 40],  //每页显示多少条
            layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
          },
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
        getInitPage() {
          this.$post('/CqUser/userManagementPageInit', {
            UID: this.filterForm.UID,
            idCardName: this.filterForm.idCardName,
            userPhone: this.filterForm.userPhone,
            bankCardId: this.filterForm.bankCardId,
            queryTime: JSON.stringify(this.filterForm.queryTime),
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
        handleDetail(row) {
          console.log(row.uid)
          this.$router.push({path: '/DetailData', query: {id: row.uid}});
          this.$store.dispatch('SaveUserId', row.uid);
        },
        handleAddBlack(row) {
          this.$post('/CqUser/moveToBlacklist', {
            userId: row.uid
          }).then(res => {
            if (res.resultCode === "success") {
              this.$message({
                message: res.resultMessage,
                type: 'success'
              });
              this.reload();
              this.$refs.black.click()
            } else {
              this.$message({
                message: res.resultMessage,
                type: 'error'
              });
            }
          }).catch(error => {

          })
        },
        handleDelete(row){
          this.$post('/CqUser/deleteUser',{
            userId:row.uid
          }).then(res => {
            if (res.resultCode === "success") {
              this.$message({
                message: res.resultMessage,
                type: 'success'
              });
              this.reload();
              this.$refs.black.click()
            } else {
              this.$message({
                message: res.resultMessage,
                type: 'error'
              });
            }
          }).catch(error =>{

          })
        }
      },

    }
</script>

<style scoped>

</style>
