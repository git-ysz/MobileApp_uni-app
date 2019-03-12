<script>
export default {
  onLaunch: function() {
    // 当uni-app 初始化完成时触发（全局只触发一次）
    console.log('App Launch');
    //#ifdef APP-PLUS
    /* 5+环境锁定屏幕方向 */
    plus.screen.lockOrientation('portrait-primary'); //锁定
    /* 5+环境升级提示 */
    // this._alert(plus.runtime.version)
    var server = "https://uniapp.dcloud.io/update"; //检查更新虚拟地址
    var req = { //升级检测数据
    	"appid": plus.runtime.appid,
    	"version": plus.runtime.version,
    	"imei": plus.device.imei
    };
    uni.request({
    	url: server,
    	data: req,
    	success: (res) => {
    		console.log(JSON.stringify(res));
    		if (res.statusCode == 200 && res.data.isUpdate) {
    			let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
    			uni.showModal({ //提醒用户更新
    				title: '更新提示',
    				content: res.data.note ? res.data.note : '是否选择更新',
    				success: (res) => {
    					if (res.confirm) {
    						plus.runtime.openURL(openUrl);
    					}
    				}
    			})
    		}
    	}
    })
    //#endif
  },
  onLoad() {}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "./lib/uni.css";
</style>
