<template>
	<view class="center">
		<uni-nav-bar status-bar="true" right-icon="bars" shadow=false :background-color="background" color="#fff" @click-right="goSetting"></uni-nav-bar>

		<view class="person-head" :style="{background: background}">
			<cmd-avatar :src="url" @click="fnInfoWin" size="lg" :make="{ 'background-color': '#fff' }"></cmd-avatar>
			<view class="person-head-box">
				<view class="person-head-nickname">{{information.tenant}}</view>
				<view class="person-head-username">{{information.tenantPhone}}</view>
			</view>
		</view>
		<view class="person-list">
			<cmd-cell-item v-for="(item, key) in list" :key="key" :title="item.title" :addon="item.addon" slot-left arrow @click="goDetailPage(item.url)"></cmd-cell-item>
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
import cmdAvatar from '@/components/cmd-avatar/cmd-avatar.vue';
import cmdIcon from '@/components/cmd-icon/cmd-icon.vue';
import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';

export default {
	components: {
		cmdAvatar,
		cmdCellItem,
		cmdIcon,
		uniNavBar,
		uniPopup
	},
	data() {
		return {
			text: 'uni-app',
			url: '',
			list: [
				{
					title: '余额',
					addon: '0',
					url: 'wallet'
				},
				{
					title: '同住人',
					addon: '',
					url: 'people'
				},
				{
					title: '版本更新',
					addon: 'v1.0',
					url: 'version'
				},
				{
					title: '关于我们',
					addon: '',
					url: 'about'
				},
				{
					title: '联系我们',
					addon: '',
					url: 'contact'
				}
			],
			information:{},
			versionCode:'1.0',
			type:'',
			apkUrl:'',
			content:'',
			background:'#099c99',
		};
	},
	onShow(){
		this.myinfo();
		this.loading();
		uni.startPullDownRefresh();
	},
	methods: {
		async myinfo(){
			var that=this;
			let res=await this.util.request({
				url:'/etenantsvr/myModule/queryPersonalInfoDetail',
				method:'post',
				data:{userId:that.$store.state.id}
			});
			var obj=res.data.obj;
			this.information=obj;
			var reg = /^(\d{3})\d*(\d{4})$/;
			this.information.tenantPhone = this.information.tenantPhone.replace(reg,'$1****$2')
			 if (parseInt(this.$store.state.obj.identityNumber.substr(16, 1)) % 2 == 1) {
                //男
                this.url='../../static/other/pretendfri_boy_light.png';
				this.background="#099c99";
            } else {
				//女
				this.url='../../static/other/pretendfri_girl_light.png';
				this.background="#9E5173";
            }
		},
		async loading(){
			let res = await this.util.request({
				url: '/etenantsvr/myModule/queryAccountBalance',
				method: 'post',
				data:{
					identityCardNo:this.$store.state.obj.identityNumber,
				}
			});
			if(res.code==0){
				this.list[0].addon=res.data.obj.balance;
			}
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh(); 
			}, 1000);
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
					this.explain('explain');
				}
			}
		},
		download(){
			 uni.showToast({  
				title: '新版本下载完成后将自动弹出安装程序',  
				mask: false,  
				duration: 5000,  
				icon:"none"  
			});
			this.explain('');
			 var dtask = plus.downloader.createDownload( this.apkUrl, {}, function ( d, status ) {  
				// 下载完成 
				console.log(d);
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
		goSetting(e) {
			uni.navigateTo({
				url: '/pages/ohter/setting'
			});
		},
		goDetailPage(url) {
			let that=this;
			if(url=='version'){
				uni.getSystemInfo({  
					success:(res) => {  
						console.log(res.platform);  
						//检测当前平台，如果是安卓则启动安卓更新  
						if(res.platform=="android"){
							uni.showLoading({
								title:'正在检查更新..'
							})
							that.AndroidCheckUpdate();  
						} else{
							uni.showToast({
								title: '请去appStore查看',
								duration: 2000,
								icon:'none',
							});
						}
					}  
				}) 
			}else{
				uni.navigateTo({
					url: '/pages/ohter/' + url + ''
				});
			}
		},
		fnInfoWin(){
			uni.navigateTo({
				url:'myInformation'
			})
		}
	}
};
</script>

<style>
.person-head {
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 150px;
	padding-left: 20px;
}

.person-head-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-left: 10px;
}

.person-head-nickname {
	font-size: 40upx;
	font-weight: 500;
	color: #fff;
}

.person-head-username {
	font-size: 30upx;
	font-weight: 500;
	color: #fff;
	margin-top: 20upx;
	letter-spacing: 5upx;
}

.person-list {
	line-height: 0;
}
.uni-popup{
	background-color: transparent!important;
}
</style>
