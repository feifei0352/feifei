<template>
	<view class="container">
		<text class="warn">
			完善个人信息,获取更多房源信息
		</text>
		<view class="forms">
			<view class="inputs">
				<image src="../../../static/icon/truename@2x.png"></image>
				<input placeholder-style="color:#C7C7C7;font-size:30upx" type="text" value="" placeholder="真实姓名"/>
			</view>
			<view class="inputs">
				<image src="../../../static/icon/idnum@2x.png"></image>
				<input placeholder-style="color:#C7C7C7;font-size:30upx" type="text" value="" placeholder="身份证号码"/>
			</view>
			<button @click="getback">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			getback() {
				uni.navigateBack({
					delta:-1
				})
			}
		}
	}
</script>

<style>
	.container{
		background:#fff;
	}
	page{
		background:#fff;
	}
	.warn{
		display:block;
		width:100%;
		text-align: center;
		color:#F78640;
		padding:44upx 0;
		font-size:30upx;
	}
	.forms{
		text-align: center;
	}
	.inputs{
		height:88upx;
	}
	.inputs>image{
		width:50upx;
		height:50upx;
		display:inline-block;
		vertical-align: middle;
		margin-right:28upx;
	}
	.inputs>input{
		display:inline-block;
		width:609upx;
		height:88upx;
		vertical-align: middle;
		border-bottom:1upx solid #F0F0F0;
		text-align: left;
	}
	.forms>button{
		width:694upx;
		height:88upx;
		background:#099C99;
		color:#fff;
		margin-top:57upx;
	}
</style>
