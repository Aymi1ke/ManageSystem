<template>
    <div class="404">
         <div class="error_bg">
           <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">
             <img src="../../../static/img/404.png" width="424" height="266"/>
             <p style="color: #999;text-align: center;font-size: .8em">页面找不到了 请刷新重试</p>
           </div>
         </div>
    </div>
</template>

<script>
    export default {
        name: "404"
    }
</script>

<style>
.error_bg{
   width: 100%;
   height: calc(100vh - 80px);
   background:#F2F2F2;
}
</style>
