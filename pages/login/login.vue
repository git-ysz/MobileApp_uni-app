<template>
	<view>
    <!-- {{title}}
    <navigator url="../index/index" open-type="reLaunch"><button type="primary">主页</button></navigator> -->
    <web-view src="/hybrid/html/camera.html"></web-view>
  </view>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        title: "登录页面"
      }
    },
    methods: {
      loginSubmit() {
        this._showLoding()
        this._http.get("https://aip.baidubce.com/oauth/2.0/token", {
          data: {
            grant_type: "client_credentials",
            client_id: "6UUbM0ZxSVyoZaHk5tL5CwAv",
            client_secret: "tvUkFZkLqGje33TRm56RkPIFcOzLSyDH"
          },
          success: (res) => {
            console.log(JSON.stringify(res))
            this._closeLoading()
          }
        })
      },
    },
    onLoad(data) {
      this.loginSubmit()
    }
  }
</script>
<style>
  
</style>