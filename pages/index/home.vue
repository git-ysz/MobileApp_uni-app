<template>
	<view>
		<text>{{msg}}</text>
    <navigator url="../login/login" open-type="navigateTo"><button type="primary">登录</button></navigator>
    <e-fold></e-fold>
    1231231234113
	</view>
	
</template>

<script>
  import eFold from '../../components/e-fold'
	export default {
    name: "home",
    components: {eFold},
		data() {
			return {
				msg: '主页'
			}
		},
    methods: {
      
    }
	}
</script>

<style>

</style>