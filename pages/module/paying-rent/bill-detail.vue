<template>
	<view class="container">
		<view class="basic-info">
			<view class="info">
				<text class="info-tittle">账单类型</text>
				<text class="info-value">{{basicinfo.name}}</text>
			</view>
			<view class="info">
				<text class="info-tittle">账单状态</text>
				<text class="info-value" id="payed" v-if="basicinfo.status=='0'">已支付</text>
				<text class="info-value" id="waitforpay" v-else>待支付</text>
			</view>
			<view class="info">
				<text class="info-tittle">收费日期</text>
				<text class="info-value">{{basicinfo.date}}</text>
			</view>
			<view class="info">
				<text class="info-tittle">缴费日期</text>
				<text class="info-value">{{basicinfo.datelimit}}</text>
			</view>
		</view>
		<view class="rent" v-if="basicinfo.type == '0'">
			<view class="info">
				<text class="info-tittle">租金</text>
				<text class="info-value">2000.00</text>
			</view>
			<view class="info">
				<text class="info-tittle">押金</text>
				<text class="info-value">2000.00</text>
			</view>
		</view>
		<view class="list" v-else>
			<view class="list-tittle" :class="{already:basicinfo.status=='0'}">费用明细</view>
			<view class="list-item">
				<view class="item-left">
					<image src="../../../static/icon/dzf_shuifei@2x.png"></image>
					<view class="standard">
						<text>5元/吨</text>
						<text>上期读数: 38  本期读数: 138</text>
					</view>
				</view>
				<view class="item-right">30.00元</view>
			</view>
			<view class="list-item">
				<view class="item-left">
					<image src="../../../static/icon/dzf_dianfei@2x.png"></image>
					<view class="standard">
						<text>1.2元/度</text>
						<text>上期读数: 38  本期读数: 138</text>
					</view>
				</view>
				<view class="item-right">100.00元</view>
			</view>
			<view class="list-item">
				<view class="item-left">
					<image src="../../../static/icon/dzf_ranqi@2x.png"></image>
					<view class="standard">
						<text>1.2元/度</text>
						<text>上期读数: 38  本期读数: 138</text>
					</view>
				</view>
				<view class="item-right">100.00元</view>
			</view>
			<view class="list-item">
				<view class="item-left">
					<image src="../../../static/icon/dzf_wuye@2x.png"></image>
					<view class="standard">
						<text>固定收费</text>
					</view>
				</view>
				<view class="item-right">140.00元</view>
			</view>
			<view class="list-item">
				<view class="item-left">
					<image src="../../../static/icon/dzf_liji@2x.png"></image>
					<view class="standard">
						<text>固定收费</text>
					</view>
				</view>
				<view class="item-right">50.00元</view>
			</view>
		</view>
		<view class="bottom-button" v-if="basicinfo.status=='1'">立即支付</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				basicinfo:{
					type:0,   //0:租金账单   1:杂费账单
					name:'水电账单',
					status:0,
					date:'2019-09-02',
					datelimit:'2019-08-07至2019-09-06'
				},
				
			}
		}
	}
</script>

<style scoped>
	.container{
		font-size:30upx;
		color:#333333;
	}
	.container:after{
		content:'';
		display:block;
		height:100upx;
		margin-top:22upx;
	}
	.bottom-button{
		background:#11D6D3;
		width:100%;
		height:100upx;
		border-radius:4upx;
		color:#fff;
		font-size:36upx;
		position:fixed;
		bottom:0;
		left:0;
		text-align:center;
		line-height: 100upx;
	}
	.basic-info,.rent{
		background:#fff;
		width:630upx;
		padding:0 32upx;
		margin:20upx auto;
		border-radius:10upx;
	}
	.info{
		height:87upx;
		line-height: 87upx;
		border-bottom:1upx solid #F5F5F5;
	}
	.rent .info-tittle{
		color:#B3B3B3
	}
	.info-tittle{
		float:left;
		color:#969899;
	}
	.rent .info-value{
		color:#FF7C36;
	}
	.info-value{
		float:right;
	}
	.item-right{
		float:right;
		color:#FF7C36;
	}
	.item-left{
		float:left;
	}
	.item-left>image{
		width:64upx;
		height:64upx;
		margin-right:20upx;
	}
	.standard{
		display:inline-block;
		font-size:26upx;
		line-height:36upx;
	}
	.standard>text{
		display:block;
		color:#777777;
	}
	.standard>text:last-child{
		color:#333333;
	}
	.list{
		background:#fff;
		width:694upx;
		margin:0 auto;
		border-radius:10upx;
		overflow: hidden;
	}
	.list-tittle{
		font-weight:bold;
		padding-left:30upx;
		height:86upx;
		line-height: 86upx;
		border-bottom:1upx solid #F5F5F5;
	}
	.list-item{
		padding:30upx 32upx;
		overflow:hidden;
		border-bottom:1upx solid #F5F5F5;
	}
	#payed{
		color:#2FC38D
	}
	#waitforpay{
		color:#FC5252;
	}
	.already{
		background:#42CF9B;
		border-bottom: none;
	}
</style>
