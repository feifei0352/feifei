<template>
	<view>
		<view class="basic-info" v-if="firstStep">
			<view class="title">基本信息</view>
			<view>
				<cmd-cell-item slot-left arrow style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0"><text style="color:#C7C7C7;font-size:32upx">请选择房屋地址</text></cmd-cell-item>
				<cmd-cell-item slot-left arrow style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0"><text style="color:#C7C7C7;font-size:32upx">请选择房源类型</text></cmd-cell-item>
				<cmd-cell-item slot-left style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0"><input type="text" style="font-size:32upx" placeholder-style="color:#C7C7C7" placeholder="请输入门牌号,如:208"></cmd-cell-item>
				<cmd-cell-item slot-left style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0"><input type="text" style="font-size:32upx" placeholder-style="color:#C7C7C7" placeholder="请输入房间编号,如:4"></cmd-cell-item>
			</view>
		    <button class="nextStep" @click="nextStep">下一步</button>
		</view>
		<view class="detailed-info" v-else>
			<view class="title">详细信息(分为必填和非必填项)</view>
			<view>
				<cmd-cell-item slot-left arrow style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0"><text style="color:#C7C7C7;font-size:32upx">请选择所在楼层</text></cmd-cell-item>
				<cmd-cell-item slot-left arrow style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0"><text style="color:#C7C7C7;font-size:32upx">请选择总楼层</text></cmd-cell-item>
				<cmd-cell-item slot-left arrow style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0"><text style="color:#C7C7C7;font-size:32upx">请选择房型</text></cmd-cell-item>
				<cmd-cell-item slot-left slot-right style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0;position: relative;"><text style="position:absolute;left:670upx;">m²</text><input type="text" style="font-size:32upx" placeholder-style="color:#C7C7C7" placeholder="请输入使用面积"></cmd-cell-item>
				<cmd-cell-item slot-left arrow style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0"><text style="color:#C7C7C7;font-size:32upx">请选择朝向</text></cmd-cell-item>
				<cmd-cell-item slot-left arrow style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0"><text style="color:#C7C7C7;font-size:32upx">请选择装修类型</text></cmd-cell-item>
				<cmd-cell-item slot-left arrow style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0"><text style="color:#C7C7C7;font-size:32upx">请选择房屋配置</text></cmd-cell-item>
				<cmd-cell-item slot-left style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0">
					<text class="small-title">图片(非必填)</text>
					<image class="get-pic" src="../../../static/icon/addphoto.png"></image>
				</cmd-cell-item>
				<cmd-cell-item slot-left style="width:650upx;height:88upx;padding:20upx 10upx 20upx 0">
					<text class="small-title">备注(非必填)</text>
					<textarea value="" placeholder-style="color:#C7C7C7;font-size:32upx" placeholder="请输入备注信息" />
				</cmd-cell-item>
				<button class="nextStep" @click="save">保存</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	export default {
		components:{
			cmdCellItem
			},
		data() {
			return {
				firstStep:true
			}
		},
		methods: {
			nextStep(){
				this.firstStep = false
			},
			save() {
				uni.navigateBack({
					delta:-1
				})
			}
		}
	}
</script>

<style>
	.title{
		color:#333333;
		font-size:40upx;
		font-weight: bold;
		padding:40upx 15upx 0 15upx
	}
	.nextStep{
		width:694upx;
		height:88upx;
		background:#099C99;
		color:#fff;
		line-height:88upx;
		font-size:32upx;
		margin-top:20upx;
		margin-bottom:30upx
	}
	.small-title{
		font-size:30upx;
		
	}
	.get-pic{
		width:148upx;
		height:148upx;
		display: block;
		margin-top:30upx;
		margin-bottom:20upx;
	}
</style>
