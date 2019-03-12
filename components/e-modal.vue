<template>
	<view class="modal-content" :style="[{alignItems: alignItems}, {height: visibility ? '100%' : 0}]" v-show="visibility" @click.stop="close">
    <slot name="header"></slot>
    <view :animation="animationData" class="modal-body" :style="{width: modalWidth, height: modalHeight, minWidth: '30%', minHeight: '10%'}" @click.stop="voidTap">
      <slot></slot>
    </view>
    <slot name="footer"></slot>
  </view>
</template>
<script>
  export default {
    name: "modal",
    data() {
      return {
        animation: {}, //动画实例对象
        animationData: {}, //动画执行数据
      }
    },
    methods: {
      // 点击遮罩隐藏
      close() {
        // #ifndef H5
        this.moveOut()
        // #endif
        const timer = setTimeout(() => {
        	this.$emit('close')
        	clearTimeout(timer)
        }, this.animationDuration)
      },
      // 阻止冒泡事件，防止点透
      voidTap() {
        return false;
      },
      moveIn() {
        // 直接中间打开
        if (this.type === 'center' || !this.animation) {
        	this.animation.translate(0, 0).step({duration: 0, transformOrigin: '0 0'})
        	this.animationData = this.animation.export()
        	return false;
        }
        // 从底部渐入
        if (this.type === 'bottom') {
        	this.animation.translateY('100%').step({duration: 0})
        	this.animationData = this.animation.export()
        	const timer = setTimeout(() => {
        		this.animation.translateY(0).step({duration: this.animationDuration})
        		this.animationData = this.animation.export()
        		clearTimeout(timer)
        	}, 100)
        }
        // 从顶部渐入
        if (this.type === 'top') {
        	this.animation.translateY('-100%').step({duration: 0, transformOrigin: '0 100%'})
        	this.animationData = this.animation.export()
        	const timer = setTimeout(() => {
        		this.animation.translateY(0).step({duration: this.animationDuration, transformOrigin: '0 100%'})
        		this.animationData = this.animation.export()
        		clearTimeout(timer)
        	}, 100)
        }
      },
      moveOut() {
        // 底部渐出
        if (this.type === 'bottom') {
        	this.animation.translateY('100%').step()
        	this.animationData = this.animation.export()
        }
        // 顶部渐出
        if (this.type === 'top') {
        	this.animation.translateY('-100%').step({transformOrigin: '0 100%'})
        	this.animationData = this.animation.export()
        }
        // 右侧渐出
        if (this.type === 'center') {
        	this.animation.translate(uni.upx2px(750)).step({transformOrigin: '0 0'})
        	this.animationData = this.animation.export()
        }
      }
    },
    computed: {
      visibility() {
        let show = this.show
        return show;
      },
      modalWidth() {
        let width = this.width
        if (typeof(this.width) === 'number') {
        	width = uni.upx2px(this.width) + 'px'
        }
        return width;
      },
      modalHeight() {
        let height = this.height
        if (typeof(this.height) === 'number') {
        	height = uni.upx2px(this.height) + 'px'
        }
        return height;
      },
      // 模态框对齐模式
      alignItems() {
        let alignItems = 'center'
        if (this.type === 'top') {
        	alignItems = 'flex-start'
        }
        if (this.type === 'bottom') {
        	alignItems = 'flex-end'
        }
        return alignItems;
      },
      animationDuration() {
        let duration = this.duration
        if (!this.animate) {
        	duration = 0
        }
        return duration;
      }
    },
    props: {
      // 模态框显示隐藏
      show: {
        default() {
          return true;
        },
        type: Boolean
      },
      // 显示在中间或者两端
      type: {
        default() {
          return 'center';
        },
        type: String
      },
      // 模态框宽度
      width: {
        default() {
          return '30%';
        },
        type: String | Number
      },
      // 模态框高度
      height: {
        default() {
          return '10%';
        },
        type: String | Number
      },
      animate: {
        default() {
          return true;
        },
        type: Boolean
      },
      //动画执行时间
      duration: {
        default() {
          return 300;
        },
        type: Number
      },
    },
    onLoad() {
    	// #ifndef H5
      // 创建动画默认参数
    	const animation = uni.createAnimation({
    		duration: this.animationDuration,
    		timingFunction: 'ease',
    		transformOrigin: '0 0'
    	})
    	this.animation = animation
    	// #endif
    },
    watch: {
      visibility(val) {
        if (!val) {
        	return false;
        }
        // #ifndef H5
        this.moveIn()
        this.$emit('opened')
        // #endif
      }
    },
    onBackPress() {
    	if (this.show) {
    		this.close()
    		return true;
    	}
    }
  }
</script>
<style lang="scss">
  .modal-content {
    z-index: 9999;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .3);
    padding: 10upx;
    box-sizing: border-box;
    overflow: hidden;
    .modal-body {
      position: absolute;
      padding: 10upx;
      box-sizing: border-box;
      background-color: #FFFFFF;
      border-radius: 10upx;
    }
  }
</style>