<template>
	<view class="lease-container">
		<view class="lease-warn">
			<image src="../../../static/icon/tishi@2x.png"></image>
			<text>请仔细检查租约详情，并及时给房东反馈哦，一经确认不可更改！</text>
		</view>
		<view class="lease-list">
			<view class="lease-item">
				<view class="item-title">
					<image src="../../../static/icon/gerenxinxi@2x.png"></image>
					<text>个人信息</text>
				</view>
				<view class="item-info">
					<view class="info-item">
						<text>租客</text>
						<text>张少华</text>
					</view>
					<view class="info-item">
						<text>性别</text>
						<text>女</text>
					</view>
					<view class="info-item">
						<text>手机号</text>
						<text>15632895210</text>
					</view>
					<view class="info-item">
						<text>入住房屋</text>
						<text>迎春南苑22栋1单元402</text>
					</view>
					<view class="info-item">
						<text>起止时间</text>
						<text>2019-08-01至2020-07-31</text>
					</view>
				</view>
			</view>
			<view class="lease-item">
				<view class="item-title">
					<image src="../../../static/icon/gerenxinxi@2x.png"></image>
					<text>个人信息</text>
				</view>
				<view class="item-info">
					<view class="info-item">
						<text>租客</text>
						<text>张少华</text>
					</view>
					<view class="info-item">
						<text>性别</text>
						<text>女</text>
					</view>
					<view class="info-item">
						<text>手机号</text>
						<text>15632895210</text>
					</view>
					<view class="info-item">
						<text>入住房屋</text>
						<text>迎春南苑22栋1单元402</text>
					</view>
					<view class="info-item">
						<text>起止时间</text>
						<text>2019-08-01至2020-07-31</text>
					</view>
				</view>
			</view>
		</view>
		<view class="confirm-bottom">
			<view class="contact">
				<image src="../../../static/icon/renants_message@2x.png"></image>
				联系房东
			</view>
			<view class="my-buttons">
				<button>信息有误需要调整</button>
				<button>确认租约</button>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.lease-warn{
		background:#FFEBD6;
		color:#FA7828;
		font-size: 26upx;
		padding:19upx 56upx 20upx 37upx;
		line-height:36upx;
		position: fixed;
		top:0;
		left:0;
	}
	.lease-warn>image{
		width:24upx;
		height:24upx;
		vertical-align: middle;
		margin-right:8upx
	}
	.lease-container:before{
		display:block;
		content:'';
		height:110upx;
	}
	.lease-container:after{
		display:block;
		content:'';
		height:128upx;
	}
	.lease-list{
		padding:20upx 28upx;
	}
    .lease-item{
		background:#fff;
		border-radius:10upx;
		margin-bottom:20upx;
	}
	.item-title{
		color:#333333;
		font-size:30upx;
		font-weight: bold;
        padding:30upx 20upx 0 20upx;
		line-height:54upx;
	}
	.item-title:after{
		content:'';
		display:block;
		width:662upx;
		height:0;
		margin-top:20upx;
		border-bottom:1upx solid #F0F0F0;
	}
    .item-title>image{
		width:54upx;
		height:54upx;
		vertical-align: middle;
		margin-bottom:8upx;
		margin-right:17upx;
	}
	.info-item{
		width:613upx;
		height:88upx;
		line-height:88upx;
		font-size:26upx;
		color:#333333;
		padding:0 40upx;
	}
	.info-item>text{
		float:right;
	}
	.info-item>text:first-child{
		color:#777777;
		text-align: left;
		float:left;
	}
	.confirm-bottom{
		width:100%;
		height:107upx;
		line-height: 107upx;
		background:#fff;
		position:fixed;
		bottom:0;
		left:0;
		padding:21upx 42upx;
	}
	.contact{
		color:#333333;
		font-size:20upx;
		text-align: center;
		float:left;
		margin-right:26upx;
	}
	.contact>image{
		display:block;
		width:78upx;
		height:56upx;
		margin-bottom:-36upx;
		margin-top:10upx;
	}
	.contact>view{
		clear:both;
	}
	.my-buttons{
		float:left;
		margin-top:12upx
	}
	.my-buttons>button{
		height:88upx;
		width:330upx;
		line-height:88upx;
		border:1upx solid rgba(17,214,211,1);
		border-radius:4upx;
		color:#0DBFBC;
		font-size:32upx;
		display:inline-block;
		margin-right:18upx;
	}
	.my-buttons>button:last-child{
		background:rgba(255,109,36,1);
		width:220upx;
		border:none;
		color:#fff;
	}
</style>
