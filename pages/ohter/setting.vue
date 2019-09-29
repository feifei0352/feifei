<template>
	<view class="">
		<view style="margin:18upx 0;">
			<uni-list>
				<uni-list-item style="" title="消息通知" :show-switch="true"  :switch-checked="checked" :show-arrow="false" @switchChange="switchChange"></uni-list-item>		
			</uni-list>
		</view>
		<uni-list>
			<uni-list-item title="清除缓存" :badge-text="12" :show-arrow="false" @click="clearcatch"></uni-list-item>
			<uni-list-item title="用户协议" @click="gotoProtocol"></uni-list-item>
		</uni-list>
		<view class="out-btn" @tap="outBtn">退出登录</view>
	</view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
//import uniIcon from '@/components/uni-icon/uni-icon.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
export default {
	components: {
		uniList,
		uniListItem
	},
	data() {
		return {
			checked:true
		};
	},
	onShow() {
		this.getStorageInfo()
	},
	methods: {
		switchChange(e) {
			if(this.checked==true){
				this.checked=false;
				uni.showToast({
				title: '已关闭消息通知',
				icon: 'none'
			});
			}else{
				this.checked=true;
				uni.showToast({
					title: '已开启消息通知',
					icon: 'none'
				});
			}
		},
		getStorageInfo(){
			// uni.getStorage({
			// 	key: 'username',
			// 	success: function (res) {
			// 		console.log(res.data);
			// 	}
			// });
			uni.getStorageInfo({
				success: function (res) {
					console.log(res.keys);
					console.log(res.currentSize);
					console.log(res.limitSize);
				}
			});
		},
		outBtn: function() {
			this.$store.commit('logout', this.$store.state.obj);
			// uni.removeStorage({
			// 	key: 'login_info',
			// });
			//清空所有缓存数据，测试用
			uni.clearStorage();
			uni.reLaunch({
			  url: '/pages/login/login'
			});
		},
		gotoProtocol() {
			uni.navigateTo({
				url: 'protocol'
			});
		},
		clearcatch(){
			uni.showToast({
				title: '清除缓存',
				icon: 'none'
			});
		}
	}
};
</script>

<style>
.out-btn {
	width: 100%;
	height: 100upx;
	margin: 0 auto;
	text-align: center;
	line-height: 100upx;
	background: #ffffff;
	color: #09b8b5;
	//border-radius: 40upx;
	margin-top: 18upx;
}
</style>
