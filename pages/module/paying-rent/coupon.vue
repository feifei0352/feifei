<template>
	<view class="container">
		<view class="coupon">
			<view class="money">￥50</view>
			<view class="coupon-info">
				<text class="coupon-name">租费抵用券</text>
				<text>2019-08-21至2019-09-21</text>
				<text>满1000可用</text>
			</view>
			<view class="coupon-status">
				<button>已选择</button>
				<button class="usable" v-if="false">立即使用</button>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.container{
		margin:0;
		padding:0;
	}
	.coupon{
		width:694upx;
		height:174upx;
		line-height:174upx;
		margin:20upx auto;
		background:url('../../../static/icon/youhuiquanbg@2x.png');
		background-size:100% 100%;
	}
	.coupon>view{
		display: inline-block;
	}
	.money{
		height:174upx;
		font-size:60upx;
		color:rgba(255,182,41,1);
		margin:0 45upx;
		vertical-align: top;
	}
	.coupon-info{	
		height:174upx;
		width:300upx;
		margin-top:26upx;
	}
	.coupon-status{
		height:174upx;
		line-height: 174upx;
		vertical-align:middle;
		margin-top:40upx;
	}
	.coupon-status>button{
		width:148upx;
		height:68upx;
		font-size:26upx;
		line-height: 68upx;
		border-radius:48upx;
		background:#fff;
		border:2upx solid rgba(255,182,41,1);
		color:#F0A000;
	}
	.coupon-info>text{
		display:block;
		color:#999999;
		font-size:24upx;
		line-height:30upx;
	}
	.coupon-info .coupon-name{
		font-size:30upx;
		font-weight:bold;
		color:#333333;
		line-height:60upx;
	}
	.usable{
		color:#fff;
		background:#FFB629;
		border:none;
	}
</style>
