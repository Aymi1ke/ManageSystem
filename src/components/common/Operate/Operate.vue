<template>
  <div class="operate-box box-shadow">


  </div>

</template>

<script>
    import {formatDate} from "../../../config/common";

    export default {
        name: "Operate",
      props:{
        "bgState":{
          "type":Number,
          "required":true
        },
        data(){
          return{
            radio:'1',
            currentDate:'',
          }
        },
      },
      filters:{
        formatDate(){
          let date = new Date();
          return formatDate(date,'yyyy-MM-dd hh:mm:ss')
        },
      },
      methods:{
        AuditOrder(){
          this.$emit('Auitedthis')
        }
      }
    }
</script>

<style scoped>

</style>
