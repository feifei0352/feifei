<template>
	<view>
		<view v-if="infoPerfect" class="find-house">
			<text class="remind">——— 我们会根据您提交的需求进行租房匹配哦 ———</text>
			<view class="necessary">
				<view class="necessary-top">
					您租房看中的必须项
					<cmd-icon style="float:right" type="chevron-right" size="20" color="#fff"></cmd-icon>
				</view>
			</view>
			<view class="unnecessary">
				<view class="unnecessary-top">
					您租房看中的非必须项
					<cmd-icon style="float:right" type="chevron-right" size="20" color="#fff"></cmd-icon>
				</view>
			</view>
			<view class="perfect-bottom">
				<view class="perfect-button" @click="test">
					<image src="../../../static/icon/submit@2x.png"></image>
					<text>提交我的租房需求</text>
				</view>
			</view>
		</view>
		<view class="rental-demand" v-else>
			<text>请先填写您的租房需求哦，提交后将会推荐匹配的房源信息</text>
			<button @click="show">填写我的租房需求</button>
		</view>
		<uni-popup :show="showPop" type="middle" mode="fixed" @hidePopup="hidePopup">
			<view class="pop-tittle">
				<text>温馨提示</text>
				<text style="font-size:80upx;color:#C7C7C7;" @click="hidePopup">×</text>
			</view>
			<view class="pop-main">
				<text>为了保证租客信息的真实性，提升租房信息匹配的效率，发布租房需求前需要完善您的个人信息哦~</text>
				<button @click="perfect">立即完善</button>
			</view>
		</uni-popup>
		<button @click="test2">测试</button>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
	export default {
		components: {
			uniPopup,
			cmdIcon
		},
		data() {
			return {
				showPop: false,
				infoPerfect: true
			}
		},
		methods: {
			show() {
				this.showPop = true;
			},
			hidePopup() {
				this.showPop = false;
			},
			perfect() {
				uni.navigateTo({
					url: 'perfect-infomation'
				})
			},
			test() {
				uni.navigateTo({
					url:'houseorigin-detail'
				})
			},
			test2() {
				this.infoPerfect=!this.infoPerfect;
			}
		}
	}
</script>

<style>
	.rental-demand {
		width: 80%;
		height: 200upx;
		margin: 337upx auto;
	}

	.rental-demand>text {
		display: block;
		margin: 0 auto;
		font-size: 30upx;
		width: 466upx;
		line-height: 40upx;
		margin: 0 auto;
		text-align: center;
	}

	.rental-demand>button {
		width: 356upx;
		height: 102upx;
		background: #11D6D3;
		line-height: 102upx;
		font-size: 32upx;
		color: #fff;
		border-radius: 51upx;
		margin-top: 64upx;
	}

	.pop-tittle,
	.pop-main {
		width: 600upx;
		text-align: center;
	}

	.pop-tittle {
		font-weight: bold;
		width: 510upx;
		border-bottom: 1upx solid #E4E8ED;
	}

	.pop-tittle>text {
		height: 100upx;
		line-height: 100upx;
		vertical-align: middle;
	}

	.pop-tittle>text:last-child {
		float: right;
		display: inline-block;
		height:
	}

	.pop-main>text {
		display: block;
		width: 466upx;
		line-height: 48upx;
		font-size: 26upx;
		text-align: left;
		padding: 42upx 0;
		margin: 0 auto;
	}

	.pop-main>button {
		width: 510upx;
		height: 88upx;
		line-height: 88upx;
		background: #11D6D3;
		color: #fff;
	}

	.necessary-top,
	.unnecessary-top {
		width: 634upx;
		height: 88upx;
		line-height: 88upx;
		margin: 32upx auto;
		color: #fff;
		font-size: 30upx;
		padding: 0 30upx;
		border-radius: 4upx;
	}

	.necessary-top {
		background: #18D9AF;
	}

	.unnecessary-top {
		background: #18D9D6;
	}
    .perfect-bottom{
		position: fixed;
		width:100%;
		bottom: 0;
		left: 0;
	}
	.perfect-button {
		width: 694upx;
		height: 88upx;
		line-height: 88upx;
		background: rgba(255, 255, 255, 1);
		border: 2upx solid rgba(17, 214, 211, 1);
		border-radius: 44upx;
		color: #0DBFBC;
		font-size: 32upx;
		text-align: center;
		margin: 20upx auto;
	}
	.perfect-button>image {
		width: 34upx;
		height: 34upx;
		vertical-align: middle;
		margin-right: 16upx;
	}
	.remind{
	   display: inline-block;
	   width:100%;
	   text-align: center;
	   margin-top:40upx;
	   font-size:24upx;
	   color:#C3C3C3;
	}
</style>
