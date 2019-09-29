<template>
	<view class="content">
		<view class="status_bar"></view>
		<view class="wrap">
			<view class="index-head" @click="rent(list[0].id,list[0].tenancyNum)">
				<view class="index-border" v-if="list[0].tenancyFlag == 1"><span class="index-rent">租住中</span></view>
				<view class="index-borders" v-else><span v-if='list.length>0' class="index-rent">已到期</span></view>
				<view class="index-address news" v-show="list[0]">{{ list[0].communityName }}{{ list[0].buildingNumber }}栋{{ list[0].unitNumber }}单元{{ list[0].houseNumber }}{{list[0].roomNumber?'-'+list[0].roomNumber:''}}</view>
				<view class="index-houseUser news" v-show="list[0]">房东 {{ list[0].truename }}</view>
				<view class="divider"></view>
				<view class="index-map news">
					<image style="width: .6rem; height: .7rem; vertical-align: top;margin-top:0.2rem" src="../../static/icon/address.png" mode=""></image>
					<span v-show="list[0]">{{ list[0].street }}</span>
				</view>
			</view>
			<view class="index-icon" style="position: relative;">
				<uni-grid
					:options="[
						{ image: '/static/icon/lease_one.png', text: '我的租房' },
						{ image: '/static/icon/lease_two.png', text: '我的房东' },
						{ image: '/static/icon/lease_three.png', text: '租房合同' },
						{ image: '/static/icon/lease_four.png', text: '交租费' },
						{ image: '/static/icon/lease_five.png', text: '我的租友' }                                                                                                                                           
					]"
					column-num="3"
					:show-border="false"
					@click="goService"
				>
				</uni-grid>
				<uni-badge v-if="news>0" style="position: absolute;top: 35upx;left: 52%;" :text="news" type="error" size="small"></uni-badge>
			</view>
			<view class="foot-bg"><image style="width: 18rem;height: 8rem;" src="/static/icon/material_picture.png" mode=""></image></view>
		</view>
		<uni-popup :show="type === 'explain'" position="middle" mode="fixed" @hidePopup="explain('')">
			<view class="middle-title" style="margin-top: -200upx;">
				<image src="../../static/other/version_update.png" mode="aspectFit"></image>
				<view style="margin-top: -160upx;background-color: #fff;text-align: center;padding-top: 80upx;border-radius: 15upx;">
					{{content}}
					<view style="display: flex;border-top: 1px solid #ddd;margin-top:60upx;font-size:36upx;">
						<span @click="explain('')" style="width: 49%;border-right: 1px solid #ddd;color: #B8B8B8;padding: 40upx 0;">以后再说</span>
						<span style="width: 49%;color: #09B8B5;padding: 40upx 0;" @click="download()">现在更新</span>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import uniBadge from "@/components/uni-badge/uni-badge.vue"
export default {
	components: { uniGrid,uniPopup,uniBadge},
	data() {
		return {
			tenantId:'',
			list: [],
			type:'',
			apkUrl:'',
			content:'',
			versionCode:'1.0',
			news:'0'
		};
	},
	onLoad() {
		let that=this;
		uni.getStorage({
			key: 'login_info',
			success: function (res) {
				//判断是否登录
				if(res.data.id){
					uni.startPullDownRefresh();
				}else{
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			},
			fail:function(){
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		});
	},
	onReady() {
		setTimeout(function () {
            console.log('start pulldown');
        }, 1000);
	},
	methods: {
		async indexList() {
			let res = await this.util.request({
				url: '/etenantsvr/homePage/indexList/',
				method: 'post',
				data: {
					tenantId: this.$store.state.obj.id,
				}
			});
			this.list = res.data.list;
			let res2 = await this.util.request({
				url: '/etenantsvr/homePage/unreadMessage',
				method: 'post',
				data: {
					identityNumber: this.$store.state.obj.identityNumber,
				}
			});
			if(res2.code==0){
				this.news=res2.data.obj;
			}
		},
		async AndroidCheckUpdate(){
			let res = await this.util.request({
				url: '/etenantsvr/version/queryVersionUpdateContent',
				method: 'post',
				data: {}
			});
			if(res.code==0){
				if(res.data.obj.versionCode>this.versionCode){
					this.content=res.data.obj.content;
					this.apkUrl=res.data.obj.apkUrl;
					console.log(res.data.obj.mustUpdate);
					if(res.data.obj.mustUpdate=='true'){
						uni.showLoading({
							title:'正在更新，请稍后',
							mask:true,
						})
						var dtask = plus.downloader.createDownload( this.apkUrl, {}, function ( d, status ) {  
							// 下载完成  
							if ( status == 200 ) {   
								plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename),{},{},function(error){  
									uni.showToast({  
										title: '更新失败！',  
										mask: false,  
										icon:'none',
										duration: 1500  
									});  
								})  
							} else {  
								 uni.showToast({  
									title: '更新失败！',  
									mask: false, 
									icon:'none',
									duration: 1500  
								 });  
							}    
						});  
						dtask.start();
						return false;
					}
					if(!uni.getStorageSync('update')){
						this.explain('explain');
						uni.setStorageSync('update','1');
					}
				}
			}
		},
		onPullDownRefresh() {
			this.indexList();
			let that=this;
			setTimeout(function () {
				uni.stopPullDownRefresh();
					uni.getSystemInfo({  
						success:(res) => {  
							console.log(res.platform);  
							//检测当前平台，如果是安卓则启动安卓更新  
							if(res.platform=="android"){  
								that.AndroidCheckUpdate();  
							}  
						}  
					}) 
			}, 1000);
		},
		download(){
			uni.showToast({  
				title: '新版本下载完成后将自动弹出安装程序。',  
				mask: false,  
				duration: 5000,  
				icon:"none"  
			});
			this.explain('');
			 var dtask = plus.downloader.createDownload( this.apkUrl, {}, function ( d, status ) {  
				// 下载完成  
				if ( status == 200 ) {   
					plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename),{},{},function(error){  
						uni.showToast({  
							title: '更新失败！',  
							mask: false,  
							icon:'none',
							duration: 1500  
						});  
					})  
				} else {  
					 uni.showToast({  
						title: '更新失败！',  
						mask: false, 
						icon:'none',
						duration: 1500  
					 });  
				}    
			});  
			dtask.start();   
		},
		explain(type){
			this.type=type;
		},
		goService(e) {
			if (e.index == 0) {
				uni.navigateTo({
					url: '../module/rent-house/rentHouse',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
			if (e.index == 1) {
				uni.navigateTo({
					url: '/pages/module/find-house/findHouse',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
			if (e.index == 2) {
				uni.navigateTo({
					url: '../module/lease/myLease',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
			if (e.index == 3) {
				uni.navigateTo({
					url: '/pages/module/paying-rent/payingRent',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
			if (e.index == 4) {
				uni.navigateTo({
					url: '/pages/module/pretendfriends',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		rent(id,tenancyNum) {
			uni.navigateTo({
				url: '/pages/detail/detail?id='+id+`&idcard=` + this.$store.state.obj.identityNumber+'&tenancyNum='+tenancyNum
			});
		},
		loadExecution: function() {
			/**
			 * 获取本地存储中launchFlag的值
			 * 若存在，说明不是首次启动，直接进入首页；
			 * 若不存在，说明是首次启动，进入引导页；
			 */
			try {
				const value = uni.getStorageSync('launchFlag');
				if (value) {
					if (value == true) {
						uni.switchTab({
							url: '/pages/index/index'
						});
					} else {
						uni.redirectTo({
							url: '/pages/index/guide'
						});
					}
				} else {
					uni.setStorage({
						key: 'launchFlag',
						data: true,
						success: function() {
							console.log('存储launchFlag');
						}
					});
					uni.redirectTo({
						url: '/pages/index/guide'
					});
				}
			} catch (e) {
				// error
				uni.setStorage({
					key: 'launchFlag',
					data: true,
					success: function() {
						console.log('error时存储launchFlag');
					}
				});
				uni.redirectTo({ url: '/pages/index/guide' });
			}
			return;
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style>
.content {
	width: 100%;
}
.status_bar {
	height: 5rem;
	width: 100%;
	background-color: #2cc3be;
}
.wrap {
	position: relative;
	bottom: 3.4rem;
}
.index-head {
	width: 90%;
	background-color: #ffffff;
	border-radius: 0.3rem;
	/* box-shadow: 0 0 1upx 1upx #f3f3f3; */
	margin: 0 4.5%;
	padding-bottom: 15upx;
}
.index-border {
	float: right;
	width: 20%;
	margin-left: 0.3rem;
	height: 3.4rem;
	border-bottom-left-radius: 100%;
	background-color: #ffb629;
}
.index-borders {
	float: right;
	width: 20%;
	margin-left: 0.3rem;
	height: 3.4rem;
	border-bottom-left-radius: 100%;
	background-color: #CCCBC8;
}
.index-rent {
	width: 100%;
	display: block;
	font-size: 0.7rem;
	color: #ffffff;
	margin: 1rem 0 0 1.1rem;
}

.news {
	margin-left: 1rem;
	font-size: 0.8rem;
}
.news span {
	display:inline-block;
	line-height:1.2rem;
	width:510upx;
	margin-left: 0.5rem;
}
.index-address {
	padding: 1rem;
}
.index-houseUser {
	padding-left: 1rem;
	padding-bottom: 1rem;
	color: #949494;
}
.divider {
	width: 80%;
	height: 1upx;
	background: rgba(225, 230, 229, 1);
	margin-left: 2rem;
}
.index-map {
	padding-left: 1rem;
	padding-top: 1rem;
	color: #949494;
}
.index-icon {
	margin-top: 2%;
}
.foot-bg {
	margin-top: 3%;
	text-align: center;
}
.uni-popup{
	background-color: transparent!important;
}
</style>
