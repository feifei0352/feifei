<template>
	<view style="position:relative;background:#fff;padding:0 28upx">
		<view class="container">
			<view class="house-location">
				<text class="house-name">江虹小区 丹香苑 朝北-主卧 504室</text>
				<image class="location" src="../../../static/icon/position@2x.png"></image>
			</view>
			<view class="house-date">
				<text>2019-01-01至2019-12-31</text>
			</view>
			<view class="house-tags">
				<button>在租</button>
				<button>商品房/安置房</button>
				<button>精装</button>
			</view>
			<view class="house-info">
				<view style="width:30%">
					<text class="info-1">26/18层</text>
					<text class="info-2">有电梯</text>
				</view>
				<view style="width:40%">
					<text class="info-1">4室1厅1厨1卫</text>
					<text class="info-2">有家电</text>
				</view>
				<view style="width:30%">
					<text class="info-1">朝向-南</text>
					<text class="info-2">114m²</text>
				</view>
			</view>
			<view class="house-configuration">
				<view class="config-title">房屋配置</view>
				<view class="config-val">
					<view class="config-item">
						<image src="../../../static/icon/kongtiao@2x.png"></image>
						<text>空调</text>
					</view>
					<view class="config-item">
						<image src="../../../static/icon/xiyiji@2x.png"></image>
						<text>洗衣机</text>
					</view>
					<view class="config-item">
						<image src="../../../static/icon/bingxiang@2x.png"></image>
						<text>冰箱</text>
					</view>
					<view class="config-item">
						<image src="../../../static/icon/shafa@2x.png"></image>
						<text>沙发</text>
					</view>
					<view class="config-item" @click="showMore">
						<image src="../../../static/icon/gengduo@2x.png"></image>
						<text>更多</text>
					</view>
				</view>
			</view>
			<view class="house-context">
				<view class="config-title">备注</view>
				<text>
					租客是一对情侣，打算长租。近期无养宠物的打算，后期想改造一下外想改造一下外想改造外改造外改造外...
				</text>
				<image src="../../../static/icon/beizhu@2x.png"></image>
			</view>
			<view class="house-renter">
				<view class="config-title">租客(4人)</view>
			    <view class="renters">
					<view class="renter" @click="friendDetail">
						<view>
							<text>501室</text>
							<image src="../../../static/other/pretendfri_girl_light.png"></image>
							<text>李明(男)</text>
						</view>
					</view>
					<view class="renter" @click="friendDetail">
						<view>
							<text>501室</text>
							<image src="../../../static/other/pretendfri_girl_light.png"></image>
							<text>李明(男)</text>
						</view>
					</view>
					<view class="renter" @click="friendDetail">
						<view>
							<text>501室</text>
							<image src="../../../static/other/pretendfri_girl_light.png"></image>
							<text>李明(男)</text>
						</view>
					</view>
					<view class="renter">
						<view>
							<text>501室</text>
							<image src="../../../static/other/pretendfri_girl_light.png"></image>
							<text>李明(男)</text>
						</view>
					</view>
				</view>
			</view>
			<view class="contract">
				<text>租期一年合同</text>
				<view class="contract-detail">
					<text>查看合同详情</text>
					<image src="../../../static/icon/check@2x.png"></image>
				</view>
			</view>
		</view>
		<view class="house-touch">
			<button class="online">在线联系房东</button>
			<button class="phone">电话联系房东</button>
		</view>
		<view class="bg" v-if="showPop" @click="hide">
		</view>
		<view class="pop" ref="mypop" v-if="showPop">
			<view class="config-title">房屋配置</view>
			<view class="config-val">
				<view class="config-item">
					<image src="../../../static/icon/kongtiao@2x.png"></image>
					<text>空调</text>
				</view>
				<view class="config-item">
					<image src="../../../static/icon/xiyiji@2x.png"></image>
					<text>洗衣机</text>
				</view>
				<view class="config-item">
					<image src="../../../static/icon/bingxiang@2x.png"></image>
					<text>冰箱</text>
				</view>
				<view class="config-item">
					<image src="../../../static/icon/shafa@2x.png"></image>
					<text>沙发</text>
				</view>
				<view class="config-item">
					<image src="../../../static/icon/weibolu@2x.png"></image>
					<text>微波炉</text>
				</view>
				<view class="config-item">
					<image src="../../../static/icon/chuang@2x.png"></image>
					<text>床</text>
				</view>
				<view class="config-item">
					<image src="../../../static/icon/zaotai%20@2x.png"></image>
					<text>灶台</text>
				</view>
				<view class="config-item">
					<image src="../../../static/icon/dianshi@2x.png"></image>
					<text>电视</text>
				</view>
				<view class="config-item">
					<image src="../../../static/icon/chouyanji@2x.png"></image>
					<text>抽烟机</text>
				</view>
				<view class="config-item">
					<image src="../../../static/icon/reshuiqi@2x.png"></image>
					<text>热水器</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {

		data() {
			return {
				showPop:false
			}
		},
		methods: {
			showMore() {
				this.showPop = true
			},
			hide() {
                this.showPop = false
			},
			friendDetail() {
				uni.navigateTo({
					url:'../friendDetail'
				})
			}
		}
	}
</script>
<style>
	.house-name{
		font-size:40upx;
		font-weight:bold;
		display:inline-block;
		width:504upx;
		line-height:48upx;
	}
	.location{
		width:76upx;
		height:76upx;
		vertical-align: top;
		margin-left:96upx;
	}
	.house-date{
		margin:24upx 0;
	}
	.house-date>text{
		font-size:24upx;
		color:#5D5D5D;
	}
	.house-tags{
		margin:5upx 0 26upx 0;
	}
	.house-tags>button{
		display:inline-block;
		background:#DCF7F6;
		font-size:22upx;
		height:42upx;
		line-height:42upx;
		color:rgba(7,181,169,1);
		margin-right:12upx;
	}
	.house-info{
		display:flex;
	}
	.house-info>view{
		position:relative;
		text-align: center;
	}
	.house-info>view>text{
		display:block;
	}
	.house-info>view:after{
		position:absolute;
		top:10upx;
		height: calc(100% - 20upx); 
		left:0;
		content:'';
		width:0;
		border-left:1upx solid rgb(240,240,240);
	}
	.house-info>view:first-child:after{
		border:none;
	}
	.info-1{
		font-size:30upx;
		color:#F78640;
		margin-top:12upx;
	}
	.info-2{
		font-size:22upx;
		color:#BDBDBD;
		margin-top:20upx;
	}
	.house-configuration:after{
		content:'';
		display:block;
		clear: both;
	}
	.config-title{
		color:#333333;
		font-weight:bold;
		font-size:30upx;
		margin:36upx 0 26upx 0;
	}
	.config-item{
		float:left;
		width:20%;
		text-align: center;
	}
	.config-item>image{
		display:block;
		margin:0 auto;
		width:100upx;
		height:100upx;
	}
	.config-item>text{
		color:#333333;
		font-size:22upx;
	}
	.house-context{
		font-size:#333333;
		font-size:26upx;
		line-height: 36upx;		
	}
	.house-context>text{
		display:block;
		padding-bottom:24upx;
		border-bottom:1upx solid rgb(240,240,240);
	}
	.house-context>image{
		display:block;
		width:82upx;
		height:62upx;
		margin:0 auto
	}
	.renters{
	    overflow:scroll;
		height:240upx;
		display:flex;
	}
	.renter{
		margin-right:19upx;
	}
	.renter>view{
		background:rgb(250,250,250);
		width:220upx;
		height:240upx;
	}
	.renter>view>image{
		display:block;
		width:120upx;
		height:120upx;
		margin:0 auto
	}
	.renter>view>text{
		display:block;
		text-align: center;
		color:#333333;
		font-size:26upx;
		height:60upx;
		line-height:62upx;
	}
	.renter>view>text:last-child{
		font-size:22upx;
	}
	.contract{
		height:62upx;
		line-height:62upx;
		background:rgba(235,248,255,1);
		border:1upx solid rgba(102,199,255,1);
		border-radius:12upx;
		color:#0096ED;
		padding:32upx 28upx 31upx 45upx;
		font-size:30upx;
		margin-top:31upx;
		margin-bottom:20upx
	}
	.contract-detail{
		display:inline-block;
		float:right;
	}
	.contract-detail>image{
		width:42upx;
		height:42upx;
		vertical-align: middle;
	}
	.house-touch>button{
		width:338upx;
		height:88upx;
		line-height:88upx;
		border-radius:4upx;
		color:#fff;
		font-size:32upx;
		display:inline-block;
		margin-top:22upx
	}
	.online{
		background:#11D6D3;
		margin-right:24upx;
	}
	.phone{
		background:#F5CB11
	}
	.house-touch{
		height:128upx;
	}
	.container{
		height:1064upx;
		overflow: scroll;
	}
	.pop{
		width:100%;
		background:#fff;
		position:fixed;
		z-index:101;
		bottom:0;
		padding-top:30upx;
		left:0;
		border-radius:48upx 48upx 0 0;
	}
	.pop>.config-title{
		margin-left:30upx
	}
    .pop .config-item{
		background:#fff;
        width:20%;
		margin:20upx 0;
	}
	.bg{
		position: absolute;
		background-color: rgba(0,0,0,0.5);
		z-index: 100;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
</style>
