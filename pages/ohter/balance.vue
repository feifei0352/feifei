<!-- /
* 史科厅 
* 邮箱：1013990898@
* 更新时间:2019-06-27 qq.com
* / -->
<template>
	<view class="uni-padding-wrap uni-common-mt">
		<ul class="list">
			<li v-for="item in list" :key="item.tenantId">
				<view class="top">
					<span>{{item.actionType}}<text class="list-source">({{item.source}})</text></span>
					<span v-if="item.actionType=='充值'" class="profit">+{{item.changesAmountSum}}</span>
					<span v-else>{{item.changesAmountSum}}</span>
				</view>
				<view class="bottom">
					<span>{{item.createTime}}</span>
					<span>余额：{{item.balance}}</span>
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				list:[
				]
			}
		},
		methods: {
			onLoad(option) { //option为object类型，会序列化上个页面传递的参数
				uni.showLoading();
				this.loading();
			},
			onPullDownRefresh() {
				this.loading();
				setTimeout(function () {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			async loading(option){
				let res = await this.util.request({
					url: '/etenantsvr/myModule/queryBalanceChange',
					method: 'post',
					data:{
						identityCardNo:this.$store.state.obj.identityNumber,
					}
				});
				if(res.code==0){
					this.list=res.data.list;
				}
				// console.log(JSON.stringify(res));
			},
		}
	}
</script>

<style>
	.list li{
		background-color: #fff;
		padding: 30upx 0;
		width: 100%;
		border-bottom: 1px solid #ddd;
		color: #333333;
	}
	.list li:last-child{
		border-color: #fff;
	}
	.list li view{
		padding:0 50upx;
	}
	.list li view span:last-child{
		float: right;
	}
	.list li .top{
		line-height: 80upx;
		font-weight: 600;
	}
	.list li .bottom{
		font-size: 28upx;
		color: #999;
	}
	.list li .top>span:last-child{
		color: #4AC767;
	}
	.list li .top>span.profit{
		color: #FA9725;
	}
	.list-source{
		font-size: 24upx;
		color: #999999;
		margin-left: 10upx;
	}
</style>
