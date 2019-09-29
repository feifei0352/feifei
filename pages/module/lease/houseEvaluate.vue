<template>
	<view>
		<view class="house-info">
			<image src="../../../static/icon/addphoto.png"></image>
			<view class="basic-info">
				<text>迎春南苑</text>
				<text>东区9栋1单元1301</text>
			</view>
		</view>
		<view class="evaluate">
			<view class="title">
				住房评价
			</view>
			<view class="evaluate-list">
				<view class="evaluete-item">
					<star tittle="沟通交流" v-model="rate1"></star>
					<star tittle="维修响应" v-model="rate2"></star>
					<star tittle="安静安全" v-model="rate3"></star>
					<star tittle="周边配套" v-model="rate4"></star>
					<star tittle="房屋性价" v-model="rate5"></star>
				</view>
			</view>
			<view class="context">
				<textarea name="" id="" cols="36" rows="6" placeholder="请填写评价 (不超过200字)"></textarea>
			</view>
			<button class="submits" @click="getsubmit">立即评价</button>
		</view>
	</view>
</template>
<script>
	import star from '../../../components/my-star/my-star.vue'
	export default {
		components:{
			star
		},
		data() {
			return {
               rate1:0,
			   rate2:0,
			   rate3:0,
			   rate4:0,
			   rate5:0,
			}
		},
		methods:{
			getsubmit() {
				
			}
		}
	}
</script>

<style scoped>
	.house-info{
		padding:46upx 28upx;
	}
	.house-info>image{
		width:216upx;
		height:162upx
	}
	.basic-info{
		display:inline-block;
		vertical-align: top;
		font-size:34upx;
		font-weight:bold;
		padding:19upx 29upx;
	}
	.basic-info>text:last-child{
		display:block;
		color:#999999;
		font-size:26upx;
		margin-top:21upx;
		font-weight:500;
	}
	.title{
		font-weight:bold;
		display:inline-block;
		height:34upx;
		font-size:34upx;
	}
	.evaluate{
		text-align: center;
	}
	.title:before,.title:after{
		content:'';
		display:inline-block;
		width:112upx;
		height:0;
		border-top:1upx solid #E0E0E0;	
		border-right:41upx solid #fff;
		border-left:41upx solid #fff;
		vertical-align: middle;	
	}
	.context{
		text-align: left;
		padding:34upx 32upx
	}
	.context>textarea{
		margin:0 auto
	}
	.submits{
		width:678upx;
		height:88upx;
		background:#099C99;
		opacity: .3;
		border-radius:4upx;
		color:#fff;
		margin:54upx auto;
	}
</style>
