<template>
	<view>
		<view class="lease" v-if="true">
			<view class="lease-item" @click="leaseDetail">
				<view class="lease-info">
			       <view class="lease-tags">
					   <text>租住中</text>
				   </view>
			       <view class="lease-pic">
					   <image src="../../../static/icon/addphoto.png"></image>
				   </view>
			       <view class="lease-area">
					   <text class="area1">迎春南苑</text>
					   <text class="area2">东区9栋2单元1301</text>
				   </view>
				</view>
				<view class="confirm">
					<view class="myConfirm" id="wait" v-if="data1 == '1'">
						<text>待确认</text>
						<image src="../../../static/icon/wait@2x.png"></image>
					</view>
					<view class="myConfirm" id="confirmed" v-else-if="data1 == '2'">
						<text>已确认</text>
						<image src="../../../static/icon/yes@2x.png"></image>
					</view>
					<view class="myConfirm" id="evaluate" v-else>
						<button @click.stop="evaluate">立即评价</button>
					</view>
				</view>
			</view>
		</view>
		<view class="lease-none" v-else>
			<image src="../../../static/other/renants_notes.png" mode=""></image>
			<view>当前暂无租约信息哦</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				data1:'3'
			}
		},
		methods: {
			leaseDetail() {
				uni.navigateTo({
					url:'leaseDetail'
				})
			},
			evaluate() {
				uni.navigateTo({
					url:'houseEvaluate'
				})
			}
		}
	}
</script>
<style scoped>
  .lease-item{
	  width:694upx;
	  height:314upx;
	  margin:20upx auto 0;
	  border-radius:10upx;
	  background:#fff;
	  text-align: center;
  }
  .lease-info{
	  width:100%;
  }
  .lease-info:after{
	  content:'';
	  display:block;
	  clear:both;
  }
  .lease-info>view{
	  float:left;
	  margin:0 20upx
  }
  .lease-pic>image{
	  width:216upx;
	  height:162upx;
	  margin:32upx 0;
  }
  .myConfirm>image{
	  width:52upx;
	  height:52upx;
	  vertical-align: middle;
	  margin-bottom:16upx;
  }
  .lease-area{
	 padding-top:50upx
  }
  .lease-area>text{
	  display:block;
	  margin:12upx 0;
	  text-align: left;
  }
  .area1{
	  font-size:30upx;
	  font-weight:bold;
	  color:rgba(51,51,51,1);
  }
  .area2{
	  font-size:26upx;
	  font-weight:500;
	  color:rgba(153,153,153,1);
  }
  .lease-tags>text{
	  display:inline-block;
	  margin-top:60upx;
	  width:108upx;
	  height:42upx;
	  background:#FFF4ED;
	  color:#EB803D;
	  line-height:42upx;
	  font-size:26upx;
	  margin-left:12upx
  }
  .confirm{
	  width:90%;
	  height:87upx;
	  line-height: 87upx;
	  margin:0 auto;
	  border-top:1upx solid #F5F5F5
  }
  .myConfirm{
	  float:right;
      font-size:30upx;
	  color:#FC5252;
  }
  #confirmed{
	  color:#2FC38D;
  }
  .lease-none{
	  text-align: center;
      margin:312upx auto;
  }
  #evaluate>button{
	  width:178upx;
	  height:52upx;
	  background:#11D6D3;
	  color:#fff;
	  line-height: 52upx;
	  border-radius:26upx;
	  font-size:26upx;
	  margin-top:17upx;
  }
  .lease-none>image{
	  width:169upx;
	  height:169upx;
  }
  .lease-none>view{
	  color:#333333;
	  font-size:30upx;
	  margin-top:19upx;
  }
</style>
