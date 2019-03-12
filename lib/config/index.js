let baseUrl = '',
  platform = uni.getSystemInfoSync().platform;
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  baseUrl = 'http://localhost:8080/';
} else {
  // 生产环境
  baseUrl = 'http://apptest.hexieqiche.com.cn/test/erp/';
}

const system = {
  baseUrl: baseUrl,
  platform: platform, //运行设备
}
const constant = {
  cameraList: [
  	{
  		title: '车牌号',
  		url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/license_plate',
  		defaultData: {
  			//是否检测多张车牌，默认为false，当置为true的时候可以对一张图片内的多张车牌进行识别
  			multi_detect: false,
  		}
  	},
  	{
  		title: '行驶证',
  		url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/vehicle_license',
  		defaultData: {
  			detect_direction: true, //是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:- true：检测朝向；- false：不检测朝向。
  			accuracy: 'normal' //normal 使用快速服务，1200ms左右时延；缺省或其它值使用高精度服务，1600ms左右时延
  		}
  	},
  	{
  		title: '驾驶证',
  		url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/driving_license',
  		defaultData: {
  			detect_direction: true,
  		}
  	},
  	{
  		title: 'VIN码',
  		url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/vin_code',
  		defaultData: {
  			// 该参数决定模型是否自动纠正图像方向，默认不检测，当该参数=setImgDirFlag 时自动检测、纠正图像方向并识别
  			imgDirection: 'setImgDirFlag',
  		}
  	}
  ]
}

export {
  system,
  constant
}