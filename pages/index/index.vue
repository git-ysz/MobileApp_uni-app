<template>
	<view class="content">
		<view class="page" @touchstart="hideCameraType">
      <Home v-if="current === 0"></Home>
      <Mine v-if="current === 1"></Mine>
    </view>
    <view class="uni-tab-bar">
      <view @click="tabChange(0)" class="bar-item bar-item-left">
        <text>主页</text>
      </view>
      <view @click="switchCameraType" class="bar-item bar-item-center">
        <image src="../../static/image/saomiao.png" mode="scaleToFill"></image>
      </view>
      <view @click="tabChange(1)" class="bar-item bar-item-right">
        <text>我的</text>
      </view>
    </view>
    <view class="camera-list" :animation="animationData">
      <view class="slice slice-one" @click="captureImage(0)"></view>
      <view class="slice slice-two" @click="captureImage(1)"></view>
      <view class="slice slice-three" @click="captureImage(2)"></view>
      <text class="text-one">车牌号</text>
      <text class="text-two">驾驶证</text>
      <text class="text-three">VIN码</text>
    </view>
	</view>
</template>

<script>
import { constant } from '@/lib/config';
import Home from '@/pages/index/home';
import Mine from '@/pages/index/mine';
export default {
  name: 'index',
  components: { Home, Mine },
  data() {
    return {
      current: 0,
      isShowType: false,
      animation: {},
      animationData: {},
      timer: null
			
    };
  },
  methods: {
    tabChange(index) {
      if (this.current !== index) {
        this.current = index
      }
    },
    // 展示自定义圆弧选项
    switchCameraType() {
      // #ifdef H5
      return this.camera()
      // #endif
      if (!this.timer) {
        this.isShowType = !this.isShowType
      	this.timer = setTimeout(() => {
          clearTimeout(this.timer)
          this.timer = null
      	}, 600)
      }
    },
    hideCameraType() {
      this.isShowType = false
    },
    // 系统单选，暂弃用
    camera() {
      let itemList = []
      constant.cameraList.forEach(item => {
        itemList.push(item.title)
      })
      this._actionSheet({
        itemColor: '#000000',
        itemList: itemList
      }, e => {
        this.captureImage(e.index)
      })
    },
    // 调用封装后的方法拍照
    captureImage(index) {
      this._captureCamera(res => {
        // #ifdef H5
        console.log(res)
        return;
        // #endif
        // #ifdef APP-PLUS
        plus.io.resolveLocalFileSystemURL(res, (entry) => {
          if (!entry.isFile) {
            return false;
          }
          entry.file((file) => {
            console.log(file.size)
            let msg = `文件大小(plus)：${file.size / 1024 / 1024}Mb`
            if (file.size >= (4 * 1024 * 1024)) {
              msg = `文件过大(plus)：${file.size / 1024 / 1024}Mb`
            }
            this._alert(msg)
          })
        }, (err) => {
          // console.log(err)
        })
        return;
        // #endif
        uni.getFileInfo({
        	filePath: res,
        	success: ({size}) => {
            let msg = `文件大小(uni)：${size / 1024 / 1024}Mb`
            if (size >= (4 * 1024 * 1024)) {
            	msg = `文件过大(uni)：${size / 1024 / 1024}Mb`
            }
            this._alert(msg)
        	}
        })
      }, err => {
        // console.log(JSON.stringify(err))
      })
    }
  },
  watch: {
    current(val, oldVal) {
      let title,frontColor,backgroundColor
      // #ifndef H5
      this.animation.rotate(-180).step({duration: 0})
      this.animationData = this.animation.export()
      // #endif
      this.$nextTick(() => {
        this.hideCameraType()
      })
      if (val === 0) {
        title = '修车系统'
        frontColor = '#000000'
        backgroundColor = '#ffffff'
      } else {
        title = '个人信息'
        frontColor = '#ffffff'
        backgroundColor = '#0A98D5'
      }
      this._changeNavigation({
      	title: title,
      	frontColor: frontColor,
      	backgroundColor: backgroundColor
      })
    },
    // 根据状态过渡
    isShowType(val, oldVal) {
      let rotate = -180
      if (val === true) {
        rotate = 0
      }
      this.animation.rotate(rotate).step()
      this.animationData = this.animation.export()
    }
  },
  onLoad(data) {
    // #ifndef H5
    const animation = uni.createAnimation({
    	duration: 600,
    	timingFunction: 'ease',
    	transformOrigin: '50% 100%'
    })
    this.animation = animation
    // #endif
  },
  onHide() {
    // 防止点击拍照后没有视觉反馈，故加了600ms延迟关闭扇形图
  	const timer = setTimeout(() => {
      this.hideCameraType()
      clearTimeout(timer)
    }, 600)
  },
  // 监听安卓返回按键
  onBackPress() {
  	if(this.isShowType) {
      this.hideCameraType()
  		return true;
  	}
  },
  onUnload() {
    
  },
}
</script>

<style lang="scss">
$tabBarHeight: 110upx;
.content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  .page {
    background-color: #f0f0f0;
    width: 100%;
    height: calc(100% - 110upx);
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; //惯性滚动
  }
  .uni-tab-bar {
    height: $tabBarHeight;
    width: 750upx;
    box-shadow: 0 -2upx 20upx rgba(0,0,0,.1);
    box-sizing: border-box;
    max-height: $tabBarHeight;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    display: flex;
		overflow: inherit;
    flex-direction: row;
    justify-content: space-between;
    z-index: 999;
    .bar-item {
      width: 250upx;
      box-sizing: border-box;
      text-align: center;
      line-height: $tabBarHeight;
      &:active {
        opacity: .7;
      }
    }
    .bar-item-center {
      position: absolute;
      bottom: 0;
      margin-left: 50%;
      left: -125upx;
      height:100%;
      border-radius:  250upx 250upx 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      image {
				position: absolute;
        background-color: #FAFAFA;
        border: 2upx solid #F1F1F1;
      	width: 150upx;
      	height: 150upx;
        padding: 20upx;
        box-sizing: border-box;
      	border-radius: 150upx;
        margin-bottom: 20upx;
				bottom: 10upx;
      }
    }
    .bar-item-left {
      text-align: left;
      padding-left: 60upx;
    }
    .bar-item-right {
      text-align: right;
      padding-right: 60upx;
    }
  }
  .camera-list {
    z-index: 997;
    width: 400upx;
    height: 200upx;
    border-radius: 400upx 400upx 0 0;
    box-shadow: 0 -2upx 20upx rgba(0,0,0,.1);
    border-bottom: none;
    position: fixed;
    background-color: #FAFAFA;
    bottom: $tabBarHeight;
    margin-left: 50%;
    left: -200upx;
    overflow: hidden;
    text-align: center;
    transform: rotate(-180deg);
    transform-origin: 50% 100%;
    // 选项
    .slice {
      width: 200upx;
      height: 200upx;
      padding-top: 20upx;
      box-sizing: border-box;
      border: 2upx solid #F0F0F0;
      position: absolute;
      bottom: 2upx; //防止底部露边框
      transform-origin: 0% 100%;
      left: 50%;
      // 点击选项变色或者透明
      &:active {
        background-color: #CCCCCC;
      }
    }
    .slice-one {
      transform: rotate(-60deg) skew(-30deg);
    }
    .slice-two {
      transform: rotate(-120deg) skew(-30deg);
    }
    .slice-three {
      transform-origin: 100% 100%;
      left: 0;
    	transform: rotate(120deg) skew(30deg);
    }
    text {
      position: absolute;
      top: 0;
      box-sizing: border-box;
      padding-top: 20upx;
      width: 30%;
      height: 200upx;
      // background-color: #F1F2F3;
      margin-left: 50%;
      left: -15%;
      transform-origin: 50% 100%;
      pointer-events: none;
    }
    .text-one {
      transform: rotate(0deg);
    }
    .text-two {
      transform: rotate(-60deg);
    }
    .text-three {
      transform: rotate(60deg);
    }
  }
}
</style>
