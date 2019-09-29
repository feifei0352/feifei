# request封装

使用方法

1、将插件解压到项目根目录

2、在main.js中全局引入
import util from './libs/util';
Vue.prototype.util = util

3、在页面中调用

async onShow() {
    let res = await this.util.request({
        url: '/api1',
        method: 'get',
        data: {
            id: id
        }
    });
    console.log(res);
    if (res.data.status != 1) {
        uni.showToast({
            title: '提示',
            icon: 'none',
            duration: 1500
        });
    }
}
