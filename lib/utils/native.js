export default  function (w) {
  /**
   * NJS显示系统提示框
   */
	w._alert = function(parms, cb) {
    let m = '';
    let msg, callback, title, buttonCapture, confirmColor, showCancel, cancelText, cancelColor;
    if (typeof(parms) === 'string' || typeof(parms) === 'number') {
    	m = parms
    } else {
      let { msg, callback, title, buttonCapture, confirmColor, showCancel, cancelText, cancelColor } = parms;
      m = msg
    }
    // #ifdef APP-PLUS
    return plus.nativeUI.alert(m, (callback || null), (title || '提示'), buttonCapture || '确定')
    // #endif
    return uni.showModal({
    	title: title || '',
    	content: m,
      confirmText: buttonCapture || '确定',
      confirmColor: confirmColor || '#3CC51F',
      cancelText: cancelText || '取消',
      cancelColor: cancelColor || '#000000',
    	showCancel: showCancel || false,
      success: function(e) {
        callback && callback(e)
      }
    })
	}
  // 安卓server
  w._ADserver = () => {
  	return plus.android.runtimeMainActivity();
  }
  // 自动提示框
  w._toast = (msg = '') => {
  	// #ifdef APP-PLUS
  	return plus.nativeUI.toast(msg)
  	// #endif
  	return uni.showToast({
  		title: msg,
  		icon: "none",
  	})
  }
  // 数据加载提示窗
  w._showLoding = (title, options = {}) => {
  	// #ifdef APP-PLUS
    options = Object.assign({
      loading: {
      	display: "block",
      },
      modal: true,
      back: "close"
    }, options);
  	return plus.nativeUI.showWaiting(title || '加载中...', options)
  	// #endif
    return uni.showLoading({
      title: title || '加载中...',
      mask: options.mask || false
    });
  }
  w._closeLoading = () => {
    setTimeout(() => {
      // #ifdef APP-PLUS
      return plus.nativeUI.closeWaiting()
      // #endif
      return uni.hideLoading();
    },300)
  }
  /**
   * 系统单选框
   *
   * @param {any} options 配置项：标题，取消字段，按钮文字颜色，选项Array[String]
   * @param {any} callBack 成功回调
   * @param {any} error 错误回调：only android
   *
   */
  w._actionSheet = (options, callBack, error) => {
    let {title, cancel, itemColor, itemList} = options
    // #ifdef APP-PLUS
    let titles = []
    itemList.forEach(item => {
      titles.push({title: item, color: itemColor || '#000000'})
    })
    return plus.nativeUI.actionSheet({
      title: title || "请选择",
      cancel: cancel || "取消",
      buttons: titles
    }, function(res) {
      if (res.index !== 0 && res.index !== -1) {
        callBack && callBack({index: res.index - 1})
      }
    })
    // #endif
    return uni.showActionSheet({
      itemList: itemList,
      itemColor: itemColor || '#000000',
      success: function(res){
      	callBack({index: res.tapIndex});
      },
      fail: function(res) {
        error && error(res)
      }
    });
  }
  /**
   * 调用摄像头 
   *
   * @param {any}   
   *
   */
  w._captureCamera = (callBack, error, options = {}) => {
    let {count, sourceType, sizeType} = options
    return uni.chooseImage({
      count: count || 1,
      sizeType: sizeType || ['compressed'],
      sourceType: sourceType || ['camera'],
    	success: (res) => {
        const path = res.tempFilePaths[0]
        callBack && callBack(path)
    	},
      fail: (err) => {
      	error && error(err)
      }
    })
    /* Native.js的形式无法保证图片过大的问题,弃用，改用uni-app自带方案 */
//     const cmr = plus.camera.getCamera(1)
//     options = Object.assign(options, {
//       filename: "_doc/uniapp_temp/camera/",
//       format: 'jpg',
//       index: '1',
//       optimize: true,
//     })
//     return cmr.captureImage(function(res) {
//       callBack && callBack(res)
//     }, function(err) {
//       error && error(err)
//     }, options)
  }
}