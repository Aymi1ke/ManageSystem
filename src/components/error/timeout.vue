<template>
  <div class="timeout">
    <div class="error_bg">
      <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">
        <img src="../../../static/img/timeout.png" width="424" height="266"/>
        <p style="color: #999;text-align: center;font-size: .8em">页网络连接超时 请稍后重试</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "timeout"
    }
</script>

<style scoped>

</style>
