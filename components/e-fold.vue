<template>
	<view class="fold">
    
    <view class="fold-body">
      <view :animation="bodyAnimationData">
        <slot>12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312
        12312312312312312312</slot>
      </view>
    </view>
    
		<view class="fold-header" :style="{pointerEvents: isFold}" @click="changeStatus">
      <view class="fold-left">
        <slot name="left">
          <text>{{title}}</text>
        </slot>
      </view>
      <view class="fold-right" @click.stop="voidClick">
      	<slot name="right">
          <uni-icon :animation="iconAnimationData" type="arrowdown"></uni-icon>
        </slot>
      </view>
    </view>
    
	</view>
</template>

<script>
	export default {
    name: 'fold',
		data() {
			return {
				bodyAnimation: {},
				iconAnimation: {},
        bodyAnimationData: {},
        iconAnimationData: {},
        show: true
			}
		},
    computed: {
      isFold() {
        return this.fold ? 'auto' : 'none';
      }
    },
    methods: {
      changeStatus() {
      	if (this.fold) {
      		this.show = !this.show
      	} else {
      		this.show = true
      	}
      },
      voidClick() {
        // return false;
      }
    },
    watch: {
      show(val, oldVal) {
        //#ifndef H5
        if (!val) {
        	this.bodyAnimation.translateY('-100%').opacity(0).step()
        	this.bodyAnimation.height('0px').step()
        	this.bodyAnimationData = this.bodyAnimation.export()
        	this.iconAnimation.rotate(-90).step()
        	this.iconAnimationData = this.iconAnimation.export()
        } else {
        	this.bodyAnimation.translateY('0').opacity(1).height('auto').step()
        	this.bodyAnimationData = this.bodyAnimation.export()
        	this.iconAnimation.rotate(0).step()
        	this.iconAnimationData = this.iconAnimation.export()
        }
        //#endif
      }
    },
    props: {
      // 是否可以收起
      fold: {
        default: true,
        type: Boolean
      },
      // 标题
      title: {
        default: '标题',
        type: String
      },
      // 是否动画
      animate: {
      	default: true,
      	type: Boolean
      },
      //动画执行时间
      duration: {
      	default: 300,
      	type: Number
      },
    },
    onLoad() {
      // #ifndef H5
      let duration = this.animate ? this.duration : 0
      // 创建动画默认参数
      const bodyAnimation = uni.createAnimation({
      	duration: duration,
      	timingFunction: 'ease',
      	transformOrigin: '0 0'
      })
      this.bodyAnimation = bodyAnimation
      const iconAnimation = uni.createAnimation({
      	duration: duration,
      	timingFunction: 'ease',
      	transformOrigin: '50% 50%'
      })
      this.iconAnimation = iconAnimation
      // #endif
    }
	}
</script>

<style lang="scss">
  $borderColor: #999;
  $headerHeight: 70upx;
  .fold {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    min-height: $headerHeight;
    // overflow: hidden;
  }
  .fold-header {
    position: absolute;
    top: 0;
    display: flex;
    box-sizing: border-box;
    padding: 0 10upx;
    height: $headerHeight;
    line-height: $headerHeight;
    font-size: 28upx;
    justify-content: space-between;
    align-items: center;
    color: #333333;
    background-color: #CCCCCC;
    border: 2upx solid $borderColor;
    width: 100%;
//     &:active {
//       opacity: .7;
//     }
    .fold-left,.fold-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: $headerHeight;
      box-sizing: border-box;
    }
    .fold-right {
      pointer-events: auto;
    }
  }
  .fold-body {
    position: relative;
    top: 0;
    width: 100%;
    min-height: $headerHeight;
    overflow: hidden;
    &>view {
      border: 2upx solid $borderColor;
      border-top: none;
      box-sizing: border-box;
      // min-height: 140upx;
      margin-top: $headerHeight;
      width: 100%;
      background-color: #FFFFFF;
    }
  }
</style>
