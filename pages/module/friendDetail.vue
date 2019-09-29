<!-- 
*  周晨辉 
*  2019/6/27
*  -->
<template>
	<view>
		<view class="friendDetail-basic">
			<view class="datedSymbol" v-if="type==0">已到期</view>
			<view class="friendDetail-photo"><image :src="myphoto" :style="grayPhoto"></image></view>
			<view class="friendDetail-name">
				{{ user.tenant }}
				<image :src="mysexImg"></image>
			</view>
			<view class="friendDetail-area">{{ user.area }}</view>
		</view>
		<view class="friendDetail-other">
			<view class="friendDetail-room">
				<text class="friendDetail-title">房间号</text>
				<text>{{ user.roomNumber }}号</text>
			</view>
			<view class="friendDetail-phone" @click="showPhone">
				<text class="friendDetail-title">手机号</text>
				<text>{{ user.tenantPhone | formatPhone }}</text>
				<image src="../../static/other/call.png"></image>
			</view>
		</view>
		<view class="friendDetail-complaint" v-if="isNow"><view @click="complain(id, user.uid)">投诉TA</view></view>
		<uni-popup :show="showPopup" position="bottom">
			<view>拨打租友电话</view>
			<button @click="call(user.tenantPhone)" style="width:80%;color:#fff;background:rgba(102, 204, 204, 1);margin-bottom:32upx">{{ user.tenantPhone | formatPhone }}</button>
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
			user: {},
			grayPhoto: '',
			isNow: '',
			message: {},
			id: '',
			showPopup:false,
			sexImg:['../../static/other/boy.png','../../static/other/girl.png'],
			sex:0,
			mysexImg:'',
			myphoto:'',
			type:false
		};
	},
	methods: {
		onLoad(options) {
			console.log(options)
			var id = options.id;
			var type = options.type;
			this.type=type;
			this.mysexImg=this.sexImg[options.sex];
			this.myphoto=['../../static/other/pretendfri_boy_light.png','../../static/other/pretendfri_girl_light.png'][options.sex]
			if (type === '1') {
				this.grayPhoto = '';
				this.isNow = true;
			} else {
				this.grayPhoto = '-webkit-filter: grayscale(1); filter: gray;filter: grayscale(1);';
				this.isNow = false;
			}
			this.id = id;
			this.show(id);
		},
		async show(id) {
			let res = await this.util.request({
				url: '/etenantsvr/tenant/queryPartnerRentingInfo',
				method: 'post',
				data: {
					id: id
				}
			});
			var user = res.data.obj;
			this.user = res.data.obj;
			this.user.area = user.communityName + user.buildingNumber + '栋' + user.unitNumber + '单元' + user.houseNumber + '-' + user.roomNumber;
			this.sex=user.sex;
		},
		call(number) {
			uni.makePhoneCall({
				phoneNumber: number 
			});
		},
		showPhone(){
			this.showPopup=true
		},
		close(){
			this.showPopup=false
		},
		complain(id, uid) {
			uni.navigateTo({
				url: `./complain?id=${id}&uid=${uid}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	filters: {
		formatPhone(phone) {
			if (!phone) return '';
			phone = phone.toString();
			return phone.replace(/\B(?=(?:\d{4})+$)/g, '-');
		}
	}
};
</script>

<style>
page {
	background: #f5f5f5;
}
.friendDetail-basic {
	background: #fff;
	padding: 50upx 0;
	position:relative;
}
.friendDetail-photo,
.friendDetail-name,
.friendDetail-area {
	text-align: center;
}
.friendDetail-photo > image {
	height: 158upx;
	width: 158upx;
}
.friendDetail-name > image {
	height: 27upx;
	width: 20upx;
	margin-left: 8upx;
}
.friendDetail-area {
	font-size: 26upx;
	font-weight: 500;
	color: #666666;
	margin-top: 18upx;
}
.friendDetail-other {
	background: #fff;
	font-size: 32upx;
	padding: 34upx 34upx 0 34upx;
	margin-top: 18upx;
}
.friendDetail-other > view {
	padding-bottom: 34upx;
}
.friendDetail-phone > image {
	width: 100upx;
	height: 100upx;
	vertical-align: middle;
}
.friendDetail-title {
	color: #999999;
	margin-right: 51upx;
}
.friendDetail-complaint {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 132upx;
	line-height:132upx;
	background: #fff;
}
.friendDetail-complaint > view {
	width: 678upx;
	height: 88upx;
	line-height: 88upx;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 2upx solid rgba(252, 174, 71, 1);
	border-radius: 4upx;
	color: #f2a43d;
	font-weight: bold;
	text-align: center;
}
.datedSymbol{
	width:116upx;
	height:42upx;
	line-height:42upx;
	text-align: center;
	background:rgba(240,240,240,1);
	color:#ADADAD;
	font-size:24upx;
	font-weight:bold;
	border-radius:6upx;
	position:absolute;
	top:56upx;
	left:40upx
}
</style>
