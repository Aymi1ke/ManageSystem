<template>
    <div class="info" >
       <el-collapse v-model="activeNames" >
        <el-collapse-item title="基本信息" name="1">
            <el-row :gutter="20" v-for="val in detail">
                <el-col :span="12">姓名：{{val.idCardName}}</el-col>
                <el-col :span="12">身份证号：{{val.userIdCard}}</el-col>
                <el-col :span="12">手机号：{{val.userPhone}}</el-col>
                <el-col :span="12">家庭址住：{{val.address}}</el-col>
            </el-row>
        </el-collapse-item>
        <el-collapse-item title="身份信息OCR" name="2">
          <el-row :gutter="20" class="imglist" v-for="val in detail">
            <viewer>
              <el-col :span="8"><img :src="baseURL+val.photo1"  style="width: 10em;height: 12em"/></el-col>
              <el-col :span="8"><img :src="baseURL+val.reversePhone"  style="width: 17em;height: 12em"/></el-col>
              <el-col :span="8"><img :src="baseURL+val.frontPhone"  style="width: 17em;height: 12em"/></el-col>
            </viewer>
          </el-row>
        </el-collapse-item>
         <el-collapse-item title="联系人信息" name="3">
             <el-row  :gutter="20" v-for="val in detail">
               <el-col :span="8">紧急联系人姓名:{{val.cqEmergency.contactNameOne}}</el-col>
               <el-col :span="8">联系方式:{{val.cqEmergency.contactPhoneOne}}</el-col>
               <el-col :span="8">与本人关系:{{val.cqEmergency.contactTypeOne == 'father'?
                 '父亲':(val.cqEmergency.contactTypeOne == 'mother'?
                 '母亲':(val.cqEmergency.contactTypeOne == 'spouse'?
                 '配偶':(val.cqEmergency.contactTypeOne == 'brother'?
                 '兄弟':(val.cqEmergency.contactTypeOne == 'sister'?
                 '姐妹':(val.cqEmergency.contactTypeOne == 'children'?
                 '子女':(val.cqEmergency.contactTypeOne == 'friend'?
                 '朋友':(val.cqEmergency.contactTypeOne == 'colleague'?
                 '同事':(val.cqEmergency.contactTypeOne == 'other'?
                 '其他':''))))))))}}</el-col>
               <el-col :span="8">紧急联系人姓名:{{val.cqEmergency.contactNameTwo}}</el-col>
               <el-col :span="8">联系方式:{{val.cqEmergency.contactPhoneTwo}}</el-col>
               <el-col :span="8">与本人关系:{{val.cqEmergency.contactTypeTwo == 'father'?
                 '父亲':(val.cqEmergency.contactTypeTwo == 'mother'?
                 '母亲':(val.cqEmergency.contactTypeTwo == 'spouse'?
                 '配偶':(val.cqEmergency.contactTypeTwo == 'brother'?
                 '兄弟':(val.cqEmergency.contactTypeTwo == 'sister'?
                 '姐妹':(val.cqEmergency.contactTypeTwo == 'children'?
                 '子女':(val.cqEmergency.contactTypeTwo == 'friend'?
                 '朋友':(val.cqEmergency.contactTypeTwo == 'colleague'?
                 '同事':(val.cqEmergency.contactTypeTwo == 'other'?'其他':''))))))))}}</el-col>
             </el-row>
        </el-collapse-item>
        <el-collapse-item title="银行账户信息" name="4">
          <el-row  :gutter="20" v-for="val in detail">
            <el-col :span="8">所属银行：{{val.bankId}}</el-col>
            <el-col :span="8">开户行名称：{{val.issuer}}</el-col>
            <el-col :span="8">绑定银行卡卡号: {{val.cardId}}</el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>

    </div>

</template>

<script>
  import viewer from '../../../v-viewer/index.js'
    export default {
        name: "Info",
        props:{
          "detail":{
              type:Array,
            }
        },
        data(){
            return {
              activeNames: ['1','2','3','4','5'],
              baseURL:'http://118.31.56.223:8080',
              //baseURL:'http://192.168.101.101:8080'
            }
        },
        methods:{


        },
    }
</script>

<style scoped>
  .info{
    text-align: center;
  }
 .el-row{
   line-height: 40px;
 }
  .imglist .el-col:first-child{
    width: 260px;
  }
</style>
