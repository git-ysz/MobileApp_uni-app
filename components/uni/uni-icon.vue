<template>
    <view class="uni-icon" :class="['uni-icon-'+type]" :style="{color:color,'font-size':fontSize}" @click="onClick()" :animation="animation"></view>
</template>

<script>
export default {
    props: {
        /**
         * 图标类型
         */
        type: {
            default: '',
            type: String
        },
        /**
         * 图标颜色
         */
        color: {
            default: '#333',
            type: String
        },
        /**
         * 图标大小
         */
        size: {
            type: Number | String,
            default: '48'
        },
        animation: {
          type: Object,
          default: null
        }
    },
    computed: {
        fontSize() {
            return `${uni.upx2px(this.size)}px`;
        }
    },
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
};
</script>
<style>
</style>
