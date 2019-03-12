export default (function(w) {
	// 获取设备信息https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync
	w._getPhoneInfo = () => {
		try {
			const res = uni.getSystemInfoSync();
			return res;
		} catch (e) {
			//TODO handle the exception
			return null;
		}
	}
	// 获取设备网络状态
	w._getNetType = () => {
		uni.getNetworkType({
			success: function(res) {
				return res.networkType;
			}
		});
	}
	// 打电话
	w._phoneCall = (num, callBack) => {
		uni.makePhoneCall({
			phoneNumber: num, //仅为示例
			success: function() {
				callBack && callBack()
			}
		});
	}
	// 更改navigation样式，文字
	w._changeNavigation = (parms, callback) => {
		let {
			title,
			backgroundColor,
			frontColor
		} = parms
		uni.setNavigationBarColor({
			frontColor: frontColor,
			backgroundColor: backgroundColor
		})
		uni.setNavigationBarTitle({
			title: title,
      complete: function(res) {
        callback && callback(res)
      }
		})
	}

})
