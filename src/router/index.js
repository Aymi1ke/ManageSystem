import Vue from 'vue'
import Router from "vue-router";
import Login from '@/views/login/Login'
import index from '@/views/Index/index'
import Home from '@/views/Home/Home'
import Error from '@/components/error/404'
import timeout from '@/components/error/timeout'
import limit from '@/components/error/limit'
Vue.use(Router)


const router = new Router({
   routes:[
    {
      path:"/Login",
      name:"登录",
      component:Login,
      hidden:true
    },
     {
       path:"/",
       name:"首页",
       icon:'el-icon-menu',
       component:Home,
       redirect: 'index',
       leaf:true, //只有一个节点
       children: [
         {path:'/index',component:index,name:"首页",}
       ]
     },
     {
       path:"/",
       name:"404",
       component:Home,
       redirect: '404',
       leaf:true, //只有一个节点
       hidden:true,
       children: [
         {path:'/404',component:Error,name:"404",}
       ]
     },
     {
       path:"/",
       name:"timeout",
       component:Home,
       redirect: 'timeout',
       leaf:true, //只有一个节点
       hidden:true,
       children: [
         {path:'/timeout',component:timeout,name:"请求超时",}
       ]
     },
     {
       path:"/",
       name:"limit",
       component:Home,
       redirect: 'limit',
       leaf:true, //只有一个节点
       hidden:true,
       children: [
         {path:'/limit',component:limit,name:"没有权限",}
       ]
     },
     {
       path:'/',
       name:"用户管理",
       component:Home,
       icon:'el-icon-user-solid',
       children:[
         {
           path:"UserInfo",
           name:"用户信息",
           component: ()=>import('../views/UserManage/UserInfo/UserInfo')
         },
         {
           path:"BlackList",
           name:"黑名单",
           component: ()=>import('../views/UserManage/BlackList/BlackList')
         },
         {
           path:"DetailData",
           name:"用户资料",
           component:()=>import('../views/UserManage/DetailData/DetailData'),
           hidden:true,
         },
       ]

     },
     {
       path:'/',
       name:"审核系统",
       component:Home,
       icon:'el-icon-s-data',
       children:[
         {
           path:"TobeAudited",
           name:"待审核",
           component:()=>import('../views/AuditSystem/TobeAudited/TobeAudited')
         },
         {
           path:"My_audit",
           name:"我的审核",
           component:()=>import('../views/AuditSystem/My_audit/My_audit')
          },
         {
           path:"All_audits",
           name:"所有审核",
           component:()=>import('../views/AuditSystem/All_audits/All_audits')
         },
         {
           path:"QuotaManage",
           name:"额度管理",
           component:()=>import('../views/AuditSystem/QuotaManage/QuotaManage')
         },
         {
           path:"AuditUser",
           name:"用户审核",
           component:()=>import('../views/AuditSystem/AuditUser/AuditUser'),
           hidden:true,
           meta: {
             keepAlive: true // 需要被缓存
           }
             },
         {
           path:"UserDetail",
           name:"用户资料",
           component:()=>import('../views/AuditSystem/UserDetail/UserDetail'),
           hidden:true,
           meta: {
             keepAlive: true // 需要被缓存
           }
             },
       ]

     },
     {
       path:'/',
       name:"放款管理",
       component:Home,
       icon:'el-icon-coin',
       children:[
         {
           path:"LoanCore",
           name:"放款电核",
           component:()=>import('../views/LoanManage/LoanCore/LoanCore')
         },
         {
           path:"CoreReject",
           name:"电核拒绝",
           component: ()=>import('../views/LoanManage/CoreReject/CoreReject')
         },
         {
           path:"PendLoan",
           name:"待打款订单",
           component: ()=>import('../views/LoanManage/PendLoan/PendLoan')
         },
         {
           path:"PaymentRecord",
           name:"已打款记录",
           component: ()=>import('../views/LoanManage/PaymentRecord/PaymentRecord')
         },
       ]

     },
     {
       path:'/',
       name:"还款管理",
       component:Home,
       icon:'el-icon-present',
       children:[
         {
           path:"RepayPlan",
           name:"还款计划",
           component: ()=>import('../views/Repayment/RepayPlan/RepayPlan')
         },
         {
           path:"PendRepay",
           name:"待还款",
           component: ()=>import('../views/Repayment/PendRepay/PendRepay')
         },
         {
           path:"Repaid",
           name:"已还款",
           component: ()=>import('../views/Repayment/Repaid/Repaid')

         },
         {
           path:"HoldMoney",
           name:"快钱还款",
           component: ()=>import('../views/Repayment/HoldMoney/HoldMoney')
         },
         {
           path:"PolyMerize",
           name:"聚合还款",
           component: ()=>import('../views/Repayment/PolyMerize/PolyMerize')
         },
         {
           path:"BankCard",
           name:"银行卡还款",
           component: ()=>import('../views/Repayment/BankCard/BankCard')
         },
         {
           path:"Extension",
           name:"展期记录",
           component: ()=>import('../views/Repayment/Extension/Extension')
         }
       ]

     },
     {
       path:'/',
       name:"催收人员管理",
       component:Home,
       icon:'el-icon-s-help',
       children:[
         {
           path:"collectionPersonList",
           name:"催收人员列表",
           component: ()=>import('../views/collectionPersonManage/collectionPersonList/collectionPersonList')
         },
         {
           path:"collectionGroup",
           name:"催收分组",
           component: ()=>import('../views/collectionPersonManage/collectionGroup/collectionGroup')
         }
       ]
     },
     {
       path:'/',
       name:"催收订单管理",
       component:Home,
       icon:'el-icon-s-order',
       children:[
         {
           path:"OverduePayments",
           name:"逾期未还款订单",
           component: ()=>import('../views/collectionOrderManage/OverduePayments/OverduePayments')
         },
         {
           path:"OverdueRepayment",
           name:"逾期已还款订单",
           component: ()=>import('../views/collectionOrderManage/OverdueRepayment/OverdueRepayment')
         },
         {
           path:"ExpirationCollection",
           name:"已催收展期",
           component: ()=>import('../views/collectionOrderManage/ExpirationCollection/ExpirationCollection')
         }
       ]
     },
     {
       path:'/',
       name:"我的催收订单",
       component:Home,
       icon:'el-icon-s-check',
       children:[
         {
           path:"MyOrder",
           name:"我的订单",
           component: ()=>import('../views/MyCollection/MyOrder/MyOrder')
         },
         {
           path:"WatingOrder",
           name:"待催收  ",
           component: ()=>import('../views/MyCollection/WatingOrder/WatingOrder')
         },
         {
           path:"InCollection",
           name:"催收中",
           component: ()=>import('../views/MyCollection/InCollection/InCollection')
         },
         {
           path:"OverdueRepay",
           name:"逾期已还",
           component: ()=>import('../views/MyCollection/OverdueRepay/OverdueRepay')
         },
         {
           path:"OverdueExten",
           name:"逾期已展期 ",
           component: ()=>import('../views/MyCollection/OverdueExten/OverdueExten')
         },
       ]
     },
     {
       path:'/',
       name:"数据报表",
       component:Home,
       icon:'el-icon-s-finance',
       children:[
         {
           path:"RecoveryRate",
           name:"催收率分析",
           component: ()=>import('../views/DataReport/RecoveryRate/RecoveryRate')
         },
         {
           path:"Receiver",
           name:"催收员统计",
           component: ()=>import('../views/DataReport/Receiver/Receiver')
         },
         {
           path:"DailyWater",
           name:"每日流水统计",
           component: ()=>import('../views/DataReport/DailyWater/DailyWater')
         },
         {
           path:"PassRate",
           name:"每日通过率",
           component: ()=>import('../views/DataReport/PassRate/PassRate')
         },
         {
           path:"PaymentAnalysis",
           name:"每月还款分析 ",
           component: ()=>import('../views/DataReport/PaymentAnalysis/PaymentAnalysis')
         },
         {
           path:"PlatformData",
           name:"平台数据日报 ",
           component: ()=>import('../views/DataReport/PlatformData/PlatformData')
         },
         {
           path:"DataDaily",
           name:"数据日报 ",
           component: ()=>import('../views/DataReport/DataDaily/DataDaily')
         },
         {
           path:"DailyAccount",
           name:"台账日报 ",
           component: ()=>import('../views/DataReport/DailyAccount/DailyAccount')
         },
         {
           path:"FirstOvertake",
           name:"首逾分析 ",
           component: ()=>import('../views/DataReport/FirstOvertake/FirstOvertake')
         },
       ]
     },
     {
       path:'/',
       name:"后台系统管理",
       component:Home,
       icon:'el-icon-s-custom',
       children:[
         {
           path:"EmployeeList",
           name:"员工列表",
           component: ()=>import('../views/admin/EmployeeList/EmployeeList')
         },
         {
           path:"RoleManage",
           name:"角色管理",
           component: ()=>import('../views/admin/RoleManage/RoleManage'),
         },
         {
           path:"MenuSetting",
           name:"菜单管理",
           component: ()=>import('../views/admin/MenuSetting/MenuSetting')
         },

       ]

     },
  ],
    //mode:"abstract"
})

router.beforeEach((to,from,next)=>{
  if(to.path==="/Login"){
    next();
  }else{
    if(sessionStorage.pid){
      next()
    }else{
      next({path:"/Login"})
    }
  }
})
export default router

