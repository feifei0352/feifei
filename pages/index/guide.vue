<template>
	<view class="content">
		<swiper class="swiper" :autoplay="autoplay" :duration="duration">
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/startpage.png" mode="aspectFit"></image></view>
				</view>
				<!-- <view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
				<view class="experience" @tap="launchFlag()">{{ experience }}</view> -->
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			autoplay: false,
			duration: 500,
			// jumpover: '跳过',
			// experience: '立即体验'
		};
	},
	
	methods: {
		onLoad: function() {
			/**
			 * 向本地存储中设置launchFlag的值，即启动标识；
			 */
			uni.setStorage({
				key: 'launchFlag',
				data: true
			});
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/login/login'
				});
			},5000)
		}
	}
};
</script>
<style>
page,
.content {
	width: 100%;
	height: 100%;
	background-size: 100% auto;
	padding: 0;
}
.swiper {
	width: 100%;
	height: 100%;
	background: #ffffff;
}
.swiper-item {
	width: 100%;
	height: 100%;
	text-align: center;
	position: relative;
	display: flex;
}
.swiper-item-img {
	width: 100%;
}
.swiper-item-img image {
	width: 100%;
	height: 100%;
}

.jump-over,
.experience {
	position: absolute;
	height: 60upx;
	line-height: 60upx;
	padding: 0 40upx;
	border-radius: 30upx;
	font-size: 32upx;
	color: #454343;
	border: 1px solid #454343;
	z-index: 999;
}
.jump-over {
	right: 45upx;
	top: 25upx;
}
.experience {
	right: 50%;
	margin-right: -105upx;
	bottom: 0;
}
</style>
