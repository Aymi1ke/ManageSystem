<template>
   <div class="tobeaudited">
     <div class="select-box">
       <el-form ref="filterForm" :model="filterForm" size="mini" label="right" :inline="true">
         <el-form-item label="UID" label-width="40px">
           <el-input v-model="filterForm.UID" style="width: 100px"></el-input>
         </el-form-item>
         <el-form-item label="姓名" label-width="40px">
           <el-input v-model="filterForm.idCardName" style="width: 105px"></el-input>
         </el-form-item>
         <el-form-item label="手机号" label-width="55px">
           <el-input v-model="filterForm.userPhone" style="width: 110px"></el-input>
         </el-form-item>
         <el-form-item label="渠道" label-width="40px">
           <el-input style="width: 100px"></el-input>
         </el-form-item>
         <el-form-item label="申请日期" label-width="70px">
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
     <el-table ref="InitDate" :data="InitDate"  stripe v-loading="loading"
               :header-cell-style="getRowClass">
       <el-table-column prop="uid" label="UID">
       </el-table-column>
       <el-table-column prop="idCardName" label="姓名" >
       </el-table-column>
       <el-table-column prop="userPhone" label="手机号">
       </el-table-column>
       <el-table-column prop="idcardStatus" label="身份认证" >
         <template slot-scope="scope">
           <el-button type="text"  :icon="scope.row.idcardStatus=='1'?'el-icon-success':'el-icon-question'"
                      :class="[scope.row.idcardStatus=='1'?'sucIcon':'warnIcon']"></el-button>
         </template>
       </el-table-column>
       <el-table-column prop="livingbodyStatus" label="活体检测" >
         <template slot-scope="scope">
           <el-button type="text"  :icon="scope.row.livingbodyStatus=='1'?'el-icon-success':'el-icon-question'"
                      :class="[scope.row.livingbodyStatus=='1'?'sucIcon':'warnIcon']"></el-button>
         </template>
       </el-table-column>
       <el-table-column prop="emergencyStatus" label="紧急联系人" >
         <template slot-scope="scope">
           <el-button type="text"  :icon="scope.row.emergencyStatus=='1'?'el-icon-success':'el-icon-question'"
                      :class="[scope.row.emergencyStatus=='1'?'sucIcon':'warnIcon']"></el-button>
         </template>
       </el-table-column>
       <el-table-column prop="operatorStatus" label="运营商" >
         <template slot-scope="scope">
           <el-button type="text"  :icon="scope.row.operatorStatus=='1'?'el-icon-success':'el-icon-question'"
                      :class="[scope.row.operatorStatus=='1'?'sucIcon':'warnIcon']"></el-button>
         </template>
       </el-table-column>
       <el-table-column prop="sesameStatus" label="芝麻信用" >
         <template slot-scope="scope">
           <el-button type="text"  :icon="scope.row.sesameStatus=='1'?'el-icon-success':'el-icon-question'"
                      :class="[scope.row.sesameStatus=='1'?'sucIcon':'warnIcon']"></el-button>
         </template>
       </el-table-column>
       <el-table-column prop="bankcardStatus" label="银行卡" >
         <template slot-scope="scope">
           <el-button type="text"  :icon="scope.row.bankcardStatus=='1'?'el-icon-success':'el-icon-question'"
                      :class="[scope.row.bankcardStatus=='1'?'sucIcon':'warnIcon']"></el-button>
         </template>
       </el-table-column>
       <el-table-column prop="creditAmount" label="授信额度" :formatter="amountFormat">
       </el-table-column>
       <el-table-column prop="" label="渠道">
       </el-table-column>
       <el-table-column prop="createTime" label="申请时间"  :formatter="dateFormat">
       </el-table-column>
       <!-- 状态筛选-->
       <el-table-column prop="systemStatus" label="机审状态"  :filters="syStatus.filter.list"
                        :filter-method="filterSyState"
                        filter-placement="bottom-end">
         <template slot-scope="scope">
           <el-tag :type="scope.row.systemStatus =='0' ? 'warning':scope.row.systemStatus =='1' ?'success':scope.row.systemStatus =='2' ?'info':'danger'">
             {{scope.row.systemStatus =="0" ? "待机审":
             ((scope.row.systemStatus =="1")? "通过":
             ((scope.row.systemStatus =="2")? "待复审":
             ((scope.row.systemStatus =="3")? "拒绝":"")))}}
           </el-tag>
         </template>
       </el-table-column>
       <el-table-column prop="auditStatus" label="审核状态"  :filters="manStatus.filter.list"
                        :filter-method="filtermanState"
                        filter-placement="bottom-end">
         <template slot-scope="scope">
           <el-tag :type="scope.row.auditStatus =='0' ? 'success':scope.row.auditStatus =='1' ?'warning':scope.row.auditStatus =='2' ?'info':'danger'">
             {{scope.row.auditStatus =="0" ? "已通过":
             ((scope.row.auditStatus =="1")? "待审核":
             ((scope.row.auditStatus =="2")? "未提交":
             ((scope.row.auditStatus =="3")? "已拒绝": "")))}}
           </el-tag>
         </template>
       </el-table-column>
       <el-table-column prop="operation" label="操作" >
         <template slot-scope="scope">
           <el-button  @click="handleClaim(scope.row)" size="small">{{claim}}</el-button>
         </template>
       </el-table-column>
     </el-table>

     <!--分页-->
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
      name: "TobeAudited",
      inject:["reload"],
      data() {
        return {
          InitDate: [],
          shows:1,
          claimShow:false,
          claim:'认领',
          loading:true,
          filterForm: {
            UID: '',
            idCardName:'',
            userPhone: '',
            queryTime:'',
          },
          format_type_list:{
            0: '待机审',
            1: '通过',
            2: '待复审',
            3: '拒绝',
          },
          format_type_lists:{
            0: '已通过',
            1: '待审核',
            2: '未提交',
            3: '已拒绝'
          },
          //需要给分页组件传的信息
          pages: {
            page_index: 1,  // 当前位于哪页
            total: 0,        // 总数
            page_size: 20,   // 1页显示多少条
            page_sizes: [10, 20, 30, 40],  //每页显示多少条
            layout: "total, sizes, prev, pager, next, jumper"   // 翻页属性
          },
          syStatus:{
            filter:{
              list:[{
                text: '待机审',
                value: 0
              },{
                text: '通过',
                value: 1
              },{
                text: '待复审',
                value: 2
              },{
                text: '拒绝',
                value: 3
              }],
              multiple: true
            }
          },
          manStatus:{
            filter:{
              list:[{
                text: '已通过',
                value: 0
              },{
                text: '待审核',
                value: 1
              },{
                text: '未提交',
                value: 2
              },{
                text: '已拒绝',
                value: 3
              }],
              multiple: true
            }
          },
        }
      },
      computed:{

      },
      created(){

      },
      mounted(){
        this.getInitPage();
      },
      methods: {
        getRowClass({ row, column, rowIndex, columnIndex }){
          if(rowIndex == 0){
            return 'background:#efefef'
          }else{
            return ''
          }
        },
        refresh(){
          this.reload();
        },
        //页面初始化
        getInitPage(){
          this.$post('/CqUser/queryAllLoansAudit',{
            UID:this.filterForm.UID,
            idCardName:this.filterForm.idCardName,
            userPhone:this.filterForm.userPhone,
            queryTime: JSON.stringify(this.filterForm.queryTime),
            assessorName:'',
            toBeAudited:'toBeAudited',
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
                type: 'warning'
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
        filterSyState(value,item){
          const type = parseInt(item.systemStatus);
          return this.format_type_list[value] == this.format_type_list[type];
        },
        filtermanState(value,item){
          const type = parseInt(item.auditStatus);
          return this.format_type_lists[value] == this.format_type_lists[type];
        },
        //返回时间格式化
        dateFormat(row,column){
          var date = row[column.property];
          if(date === undefined){
            return ''
          }
          return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        //认领订单
        handleClaim(row,){
          let UID = row.uid;
          let name = sessionStorage.getItem('name');
          this.$post('/CqUser/claimAudit',{
            userId: UID,
            userName:name
          }).then(res=>{
            if(res.resultCode==="success"){
              this.$message({
                type: 'success',
                message: res.resultMessage
              })
              this.reload();
            }else{
              this.$message({
                type: 'error',
                message: res.resultMessage
              })
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
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
          this.$router.push({path:'/UserDetail/',query:{id:row.userId}})
          this.$store.dispatch('SaveUserId',row.userId);
        }
      }
    }
</script>

<style scoped>

</style>
