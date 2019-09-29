import vue from '../main.js'
let util = {};

// request
util.request = function({
	method = "POST",
	url,
	data,
	success,
	fail,
	complete
}) {
	// 请求
	if (0 != url.indexOf("http")) {
		//测试url
		url = 'http://192.168.1.32' + url
		// url = 'https://www.lianjiakeji.com' + url
	}
	var header = {
		'content-type': 'application/x-www-form-urlencoded'
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			data: data,
			header: header,
			dataType: 'json',
			success: (res) => {
				if (res.data.code != 0) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 1500
					})
				}
			},

			fail: (res) => {
				let ret = new Object()
				ret.code = 0
				// ret.msg = res.errMsg
				ret.msg = '接口或网络异常'
				reject(ret)
				uni.hideLoading();
			},
			complete: (res) => {
				uni.hideLoading();
				if (res.statusCode === 200) { //成功
					resolve(res.data)
				} else {
					let ret = new Object()
					ret.code = 0
					ret.msg = res.errMsg
					reject(ret)
				}
			}
		})
	});
};

util.transform = function(id) {
	var num = id.charAt(16);
	return num % 2 === 0 ? 1 : 0;
}

//时间转换
util.addDate = function(time,add) {
	var str = new Date(time);
	var time1 = str.getTime();
	var time2 = time1 + 86400000*add;
	var date = new Date(time2);

	function getfull(num) {
		if (num < 10) {
			num = '0' + num
		}
		return num;
	}
	var date2 = date.getFullYear() + '-' + getfull(date.getMonth() + 1) + '-' + getfull(date.getDate());
	return date2;

}

//计算到租日和起租日时间差
util.subtract=function(date1,date2){
	var time1=new Date(date1);
	var time2=new Date(date2);
	var time3=time1-time2;
	return time3/86400000
}
export default util;
