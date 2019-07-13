<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
html,body{
  font: normal 100% "微软雅黑";
  background-color:#F6F8FB;
  width:100%;
  height:100%;
}

.el-dialog__title {
  line-height: 20px;
  font-size: 1em;
  font-weight: bold;
  color: #303133;
}
.el-dialog__body{
  padding:0px 20px;

}
.el-divider--horizontal {
  margin: 15px 0;
}
.el-table td,.el-table th{
  text-align:center !important;
}

.el-tabs__active-bar{
  position: absolute;
  bottom: 0;
  width:100%;
  height:2px;
  font-size:1em;
  color:#563E3E;
  background-color:#F54747;
}

.el-collapse-item__header{
  color:#563E3E;
  height: 40px;
  line-height: 40px;
  font-size:1.05em;
  margin-bottom:10px;
  text-align: center;
  background: #e4e7ed;
}
.el-collapse-item__header.is-active{
  border-bottom:1px solid rgba(0,0,0,.1);
}
.el-collapse-item__header:before{
  content:'▍';
  color:#F54747;
  margin-right:3px;
  margin-left:15px;
}
.el-collapse-item__wrap{
  background-color:#f9f9f9;
  border-bottom:none;
}
.el-menu-item.is-active {
  background-color: transparent !important;
}
.el-button--mini, .el-button--mini.is-round {
  padding: 7px 8px;
}
.el-button+.el-button {
  margin-left: 0px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
  height: 32px;
  line-height: 32px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  color: #fff;
  background:#FB6262;
  border-bottom-color: transparent;
  height: 32px;
  line-height: 32px;
}
a {
  color: #DFDFDF;
  text-decoration: none;
}
.box-shadow{
  box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
}
.select-box{
  background:#fff;
  padding: 10px 5px 5px;
  margin-bottom: 10px;
  border-radius:5px;
  border: 1px solid #efefef;
}
.select-box:hover{
  box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
}
.table-box{
  height:100%;
  border: 1px solid #efefef;
  border-radius:5px;
  padding:10px;
  background:#fff;
  padding-bottom:20px;
}
.table-box:hover{
  box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
}
.line{
  background-color: #efefef;
  height: 1px;
  margin:5px 0 10px;
}
  .sf-red{
    margin-bottom: 5px;
    color: #909399;
    letter-spacing: 1px;
    font-weight: bold;
  }
.el-row {
  margin-bottom: 0px;
}
.el-tabs__item.is-active {
  color: #FB6262;
}
.btnset{
  width: 10em;
  height: 3em;
  font-size: 1.2em;
  letter-spacing: 1px;
}
.pagination{
  float: right;
  margin: 13px 7px;
}
.el-tabs__item{
  height: 40px;
  line-height: 40px;
  padding-right: 10px !important;
  padding-left: 12px  !important;
  font-size: .8em;
}
.meun-width{
  width: 200px !important;
  overflow-x: hidden !important;
}
.menu-collapse-width{
  min-width: 50px !important;
  width:50px !important;
  overflow-x: hidden !important;
}
.el-table__header tr,
.el-table__header th{
  padding: 0;
  height: 40px;
}
.el-table__body tr,
.el-table__body td{
  padding: 0;
  height: 34px;
}
table,tbody,thead{
  width: 100% !important;
}
colgroup{
  position: absolute;
  width: 100% !important;
  display: flex;
}
col{
  flex: 1;
  text-align: center;
}

.el-aside{
  min-height:100vh;
  background-color: #fff;
  overflow-x: hidden !important;
}

.el-submenu__title{
  font-size: .8em;
  height: 46px;
  line-height: 46px;
}
.el-submenu .el-menu-item {
  height: 46px;
  line-height: 46px;
  padding: 0 45px;
  min-width: 200px;
}
.el-submenu .el-menu-item{
  font-size: .8em;
}
.el-header {
  border-bottom:1px solid rgba(0,0,0,.06);
  background:#fff;
  color: #333;
  height: 40px !important;
  line-height: 40px;
  cursor: pointer;
}
.el-menu{
  border-right: none;
}
.el-menu:hover{
  background-color: #fff !important;
}
.el-main {
  color: #333;
  padding: 0;
}
.errIcon {
  color: #FB6262;
}
.actived{
  color: #FB6262 !important;
  background-color: #FEF0F0 !important;
}
.color33{
  color: #333;
}
.sucIcon{
  color:#67C23A;
}
.warnIcon{
  color:#909399;
}
.marks{
  font-size: 20%;
  color: #999;
  margin-left: 160px;
  height: 20px;
  line-height: 20px;
  margin-top: -20px;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb{
  background-color: #D9D9DB;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
}
::-webkit-scrollbar-thumb:vertical:hover{
  background-color: #D9D9DB;
}
::-webkit-scrollbar-thumb:vertical:active{
  background-color: #D9D9DB;
}
::-webkit-scrollbar-button{
  display: none;
}
::-webkit-scrollbar-track{
  background-color: #F1F0F2;
}
</style>
