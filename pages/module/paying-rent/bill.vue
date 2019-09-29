<template>
	<view class="contain">
       <view class="bill-head">
		   <view class="origin">
			   <text>账单房源</text>
			   <text>东方郡东区9幢2单元502</text>
		   </view>
		   <image src="../../../static/icon/zhangdanqh@2x.png" @click="changehouse"></image>
	   </view>
	   <view class="bill-total">
		   <view>
			   <text>总支出(元)</text>
			   <text>12000.00</text>
		   </view>
		   <view>
			   <text>本月支出(元)</text>
			   <text>3600.00</text>
		   </view>
	   </view>
	   <view class="bill-list">
		   <view class="bill-item" v-for="(item,index) of billList" :key="index">
			   <view class="item-left">
				   <view class="left-tittle">{{item.name}}</view>
				   <view class="left-date">{{item.date}}</view>
			   </view>
			   <view class="item-right">
				   <view class="money">{{item.count}}</view>
				   <view class="payway">{{item.payway}}</view>
			   </view>
		   </view>
	   </view> 
	   <model>
		   <view>
			   <view class="top">
					<text class="noway">取消</text>
					<text class="sure">确定</text>
			   </view>
			   <view class="house-list">
                  <!-- <scroll-view scroll-y="true" style="position:relative">
					<view class="active-area"></view>
                  	<view class="row">东方郡东区9幢2单元5901</view>
					<view class="row">东方郡东区9幢2单元5901</view>
					<view class="row">东方郡东区9幢2单元5901</view>
                  </scroll-view> -->
				  <picker>
					  <view class="row">东方郡东区9幢2单元5901</view>
					  <view class="row">东方郡东区9幢2单元5901</view>
					  <view class="row">东方郡东区9幢2单元5901</view>
				  </picker>
			   </view>
		   </view>
	   </model>
	</view>
</template>

<script>
	import model from '../../../components/model/model.vue'
	export default {
		components:{
			model
		},
		data() {
			return {
				billList:[
					{
						name:'押金退还',
						date:'2019-03-25 10:23',
						count:'-6400.00',
						payway:'账户余额'
					},
					{
						name:'交租金',
						date:'2019-03-25 10:23',
						count:'-3000.00',
						payway:'账户余额'
					},
					{
						name:'充值',
						date:'2019-03-25 10:23',
						count:'-6230.00',
						payway:'微信支付'
					},
					{
						name:'交押金',
						date:'2019-03-25 10:23',
						count:'-60.00',
						payway:'支付宝'
					},
					{
						name:'交押金',
						date:'2019-03-25 10:23',
						count:'-60.00',
						payway:'支付宝'
					},
					{
						name:'交押金',
						date:'2019-03-25 10:23',
						count:'-60.00',
						payway:'支付宝'
					},
					{
						name:'交押金',
						date:'2019-03-25 10:23',
						count:'-60.00',
						payway:'支付宝'
					}
				],
				show:false,
				confirm:true
			}
		},
		methods:{
			changehouse() {
                this.show=true;
			}
		}
	}
</script>

<style scoped>
	.contain{
		font-size:32upx;
		color:#333333;
		background:#fff;
		padding:0 21upx;
	}
	.origin{
		display:inline-block;
		margin-top:18upx;
	}
	.origin>text{
		display:block;
		margin-bottom:31upx;
	}
	.origin>text:first-child{
		color:#999999;
	}
	.bill-head>image{
		width:150upx;
		height:150upx;
		float:right;
	}
	.bill-total{
		margin-top:30upx;
		height:103upx;
		background:rgb(36,192,207);
		padding:52upx;
		border-radius:12upx;
	}
	.bill-total>view{
		float:left;
		width:49%;
		text-align: center;
		color:#fff;
		font-size:48upx;
	}
	.bill-total>view>text:first-child{
		display:block;
		font-size:30upx;
		color:rgba(92,242,237,1);
		margin-bottom:31upx;
	}
    .left-date,.payway{
		color:#999999;
		font-size:24upx;
	}
	.money{
		color:#2FC38D;
		font-weight:bold;
	}
	.item-left{
		float:left;
		line-height:60upx;
	}
	.item-right{
		float:right;
		text-align: right;
		line-height:60upx;
	}
	.bill-list{
		margin-top:17upx;
	}
	.bill-item{
		overflow: hidden;
		border-bottom:1upx solid #F5F5F5;
		padding:20upx 0;
	}
	
	.top{
		padding:30upx 40upx;
	}
	.noway{
		color:#B8B8B8;
		float:left;
	}
	.sure{
		color:#09B8B5;
		float:right;
	}
	.house-list{
		padding:70upx 0 50upx 0;
	}
	.row{
		text-align: center;
		font-size:36upx;
		color:#BBBBBB;
		height:70upx;
	}
	.active-area{
		height:70upx;
		width:480upx;
		border-top:2upx solid #00B8B5;
		border-bottom:2upx solid #00B8B5;
		position:absolute;
		top:50upx;
		left:135upx;
	}
	.active{
		color:#333333;
	}
</style>
