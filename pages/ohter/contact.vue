<template>
	<view class="" :phoneNumber="list[0].value">
		<view class="logo">
			<view class="logo-area">
				<image class="logo-img" src="../../static/other/logo.png" mode=""></image>
			    <view>E租客V1.0</view>
			</view>
		</view>
		<view class="contact">
			<view class="contact-list" v-for="(item, index) in list" :key="index.item" @click="showPhone(index)">
				<text class="contact-left">{{ item.title }}</text>
				<text class="contact-right">{{ item.value }}</text>
				<image v-if="item.img" :src="item.img"></image>			
			</view>
			<view class="contact-list" style="height:200upx;">
				<text class="contact-left">公众号</text>
				<image class="ewm" src="../../static/other/ewm.png"></image>	
				<p>（公众号：afterentin）</p>
			</view>
		</view>
		<uni-popup :show="showPopup" position="bottom">
			<button @click="call(list[0].value)" style="width:80%;color:#fff;background:rgba(102, 204, 204, 1);margin-bottom:32upx;margin-top:60upx">{{list[0].value}}</button>
			<button @click="close" style="width:80%;color:rgba(102, 204, 204, 1);border:2upx solid rgba(102,204,204,1);margin-bottom:60upx">取消</button>
		</uni-popup>
	</view>
</template>
<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
    components:{
		uniPopup
	},
	data() {
		return {
			list: [
				{
					title: '联系电话',
					value: '0571-8778 9888',
					img:'../../static/other/call.png'
				},
				{
					title: '企业邮箱',
					value: 'info@lianjiakeji.com'
				},
				{
					title: '官方网站',
					value: 'ljw15.com'
				},{
					title: '客服微信',
					value: '109889878'
				},
				{
					title: '地址　　',
					value: '杭州市滨江区秋溢路399号金润 科技园B座9楼'
				}
			],
			data: [],
			showPopup:false
		};
	},
	onLoad() {
		this.show();
	},
	methods: {
		async show() {
			let res = await this.util.request({
				url: '/lianjiauser/public/queryContactUs',
				methods: 'post',
				data: {
					appType: '1'
				}
			});
			let obj = res.data.obj;
			this.data = [obj.phone, obj.email, obj.websiteAddress,obj.weChat, obj.companyAddress];
			for (let i in this.list) {
				this.list[i].value = this.data[i];
			}
			console.log(res);
		},
		call(number) {
		uni.makePhoneCall({
			phoneNumber: number 
		 });
	    },
		showPhone(index){
			if(index=='0'){
				this.showPopup=true		
			}
		},
		close(){
			this.showPopup=false
		}
	}
};
</script>
<style>
.logo {
	text-align: center;
	height:322upx;
	position:relative;
}
.logo-area{
	width:160upx;
	height:190upx;
	margin:auto;
	position:absolute;
	top:0;
	left:0;
	right:0;
	bottom:0
}
.logo-img {
	width: 160upx;
	height: 160upx; 
}
.logo-area>view{
	font-size:24upx;
	color:#999999;
}
.contact {
	background-color: #ffffff;
}
.contact-list {
	margin: 0 48upx;
	padding: 35upx 0;
	color: #999999;
	border-bottom: 1upx solid rgba(235, 237, 240, 1);
	font-size: 30upx;
	position:relative;
}
.contact-list>image{
	position:absolute;
	top:20upx;
	left:610upx;
	width:66upx;
	height:66upx
}
image.ewm{
	left:220upx;
	width:180upx;
	height:180upx
}
.contact-list>p{
	position: absolute;
	top: 220upx;
	left:220upx;
}
.contact-list:last-child {
	border-bottom: none;
}
.contact-left {
	display: inline-block;
	width: 150upx;
	vertical-align: top;
}
.contact-right {
	margin-left: 92upx;
	display: inline-block;
	width: 400upx;
	color: #000000;
}
</style>
