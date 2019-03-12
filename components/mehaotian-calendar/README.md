### 日历选择组件

### 属性说明

- `selected [Array]` 显示打卡日期，组件中红点标志表明
- `lunar [Boolean]` 是否开启农历显示
- `disableBefore [Boolean]` 是否禁用已过日期
- `startDate [String]` 开始日期
- `endDate [String]` 结束日期

### 事件说明

`getdate [function]` 当前选择的时间


### 调用方式
```javascript

<template>
	<view class="content">
		<calendar 
		:selected="selected" 
		:lunar="true" 
		:disable-before="true" 
		:start-date="'2019-1-2'"
		:end-date="'2019-2-20'"
		@getdate="getdate" />

	</view>
</template>

<script>
import calendar from '../../components/mehaotian-calendar/mehaotian-calendar.vue';
export default {
	components: {
		calendar
	},
	data() {
		return {
			selected: [
				{
					date: '2018-12-26'
				},
				{
					date: '2018-12-27'
				},
				{
					date: '2018-12-28'
				},
				{
					date: '2019-1-29'
				}
			]
		};
	},
	methods: {
		getdate(e) {
			console.log(e);
		}
	}
};
</script>


```
