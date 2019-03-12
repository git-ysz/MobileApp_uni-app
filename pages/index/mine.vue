<template>
	<view>
		<text>{{msg}}</text>
    <e-modal :width="modalWidth" :height="modalHeight" type="bottom" :show="isModal" @close="close">
      <!-- <view><text>12312412</text></view> -->
    </e-modal>
    <button type="primary" @click="showModal"><text>模态框</text></button>
	</view>
</template>

<script>
  import eModal from '@/components/e-modal';
	export default {
    name: "mind",
    components: {eModal},
		data() {
			return {
				msg: '我的页面',
        isModal: false,
			};
		},
    computed: {
      modalWidth() {
        return (uni.upx2px(600) + 'px');
      },
      modalHeight() {
        return (uni.upx2px(1000) + 'px');
      }
    },
    methods: {
      showModal() {
        this.isModal = true
      },
      close() {
        this.isModal = false
      }
    },
    onLoad() {},
    onBackPress() {
      
    }
	}
</script>

<style>

</style>
