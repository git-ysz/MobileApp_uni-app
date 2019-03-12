// 全局混入，所有组件都会执行，慎用，组件内的值可以覆盖这里的值
export default {
  data() {
    return {
      apiList: [], //所有记录过的API请求
      isModal: false, //当前是否存在显示中的modal
    }
  },
  onUnload() {
    this.apiList.forEach(item => {
      item.abort() //关闭记录下的http请求
    })
    this._closeLoading() //关闭当前组件loding状态
  },
  onBackPress() {
    if (this.isModal) {
      // 如果当前有显示中的modal则先隐藏
    	this.isModal = false;
      return true;
    }
  }
}