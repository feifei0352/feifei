<template>
	<view>
		<scroll-view scroll-x class="top">
			<view class="contact-tabbar" :class="{ 'tabbar-bottom': currentTab == index }" v-for="(item, index) in tabBar" :key="index" @click="clickTab(index)">
				<span>{{ item.title }}</span>
			</view>
		</scroll-view>
		<swiper :current="currentTab" @change="changeTab">
			<swiper-item>
				<view class="bill" v-for="(item,index) of list" :key="index" @click="billDetail">
					<view class="bill-head">
						<text>租金账单</text>
						<view><text>{{item.period}}</text></view>
					</view>
					<view class="bill-content">
						<view class="content-item">
							<text>账单周期:</text>
							<text>{{item.dateLimit}}</text>
						</view>
						<view class="content-item">
							<text>截止收费日期:</text>
							<text>{{item.dateEnd}}</text>
						</view>
					</view>
					<view class="bill-bottom">
						<view class="total">
							<text>需缴费用</text>
							<text class="total-sum">{{item.total}}</text>
							<button @click="test">去支付</button>
						</view>
					</view>
				</view>
				<view class="none" v-if="list.length == 0">
					<view>
						<image src="../../../static/other/renants_noinfo.png"></image>
						<view>当前暂无租费账单</view>
					</view>
					<view></view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="none" v-if="expire.length == '0'">
					<view><image src="../../../static/other/renants_noinfo.png"></image></view>
					<view>当前暂无水电费账单</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue';
export default {
	components: {
		uniIcon
	},
	data() {
		return {
			tabBar: [
				{
					title: '租费'
				},
				{
					title: '水电费'
				}
			],
			list:[
				{
					period:'一期',
					dateLimit:'2019-08-07至2019-09-06',
					dateEnd:'2019-09-02',
					total:'2000.00元',
					status:0
				},
				{
					period:'二期',
					dateLimit:'2019-08-07至2019-09-06',
					dateEnd:'2019-09-02',
					total:'2000.00元',
					status:1
				},
				{
					period:'三期',
					dateLimit:'2019-08-07至2019-09-06',
					dateEnd:'2019-09-02',
					total:'2000.00元',
					status:2
				},
				{
					period:'三期',
					dateLimit:'2019-08-07至2019-09-06',
					dateEnd:'2019-09-02',
					total:'2000.00元',
					status:2
				}
			],
			expire: [],
			currentTab: 0,
		};
	},
	methods: {
		clickTab(e) {
			this.currentTab = e;
		},
		changeTab(e) {
			this.currentTab = e.mp.detail.current;
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'bill'
			});
		},
		billDetail() {
			uni.navigateTo({
				url:'bill-detail'
			})
		},
		test() {
			uni.navigateTo({
				url:'coupon'
			})
		}
	}
};
</script>

<style scoped>
page {
	background: #f2f2f2;
}
.top {
	width: 100%;
	text-align: center;
	line-height: 42px;
	white-space: nowrap;
	position: relative;
	background: #fff;
}
.contact-tabbar {
	width: 50%;
	font-size: 18px;
	height: 42px;
	display: inline-block;
	color: #000;
}
.tabbar-bottom {
	color: #22c7c7;
}
.tabbar-bottom span {
	border-bottom: 4px solid #22c7c7;
	padding-bottom: 6px;
}
.contact-item {
	background: #fff;
	margin: 30upx 0;
}
.contact :active{
	background:#E9EDF0
}
swiper,
swiper-item {
	height:1080upx;
	overflow: scroll;
}
.none {
	text-align: center;
	font-size: 30upx;
	color: #333333;
	margin-top: 224upx;
}
.none image {
	width: 169upx;
	height: 169upx;
}
.contact-item-right {
	float: right;
	font-size: 28upx;
	margin-top: 20upx;
}
.bill{
	width:694upx;
	margin:22upx auto;
	background:#fff;
	border-radius:10upx;
	padding-left:25upx;
}
.bill-head{
	height:80upx;
	line-height:80upx;
}
.bill-head>text{
	color:#333333;
	font-weight:bold;
	font-size:30upx;
}
.bill-head>view{
	display:inline-block;
	width:100upx;
	height:80upx;
	background:rgb(255,182,41);
	float:right;
	color:#fff;
	font-size:24upx;
	line-height:60upx;
	text-align: center;
	background:url('../../../static/icon/daijiaozufei@2x.png');
	background-size:100% 100%;
}
.bill-head>view>text{
	display:inline-block;
	margin-left:14upx
}
.bill-content{
	padding:24upx 0;
	margin-right:14upx;
	border-bottom:1upx solid #F5F5F5
}
.content-item>text{
	font-size:26upx;
	color:rgba(51,51,51,1);
	line-height:20px;
	display: inline-block;
	width:400upx;
}
.content-item>text:first-child{
	color:#B3B3B3;
	width:160upx;
	margin-right:48upx;
}
.total{
	height:86upx;
	line-height:86upx;
	color:#B3B3B3;
	font-size:26upx;
}
.total-sum{
	color:#FF7C36;
	font-size:30upx;
	font-weight:bold;
	display: inline-block;
	margin-left:49upx;
}
.total>button{
	width:178upx;
	height:52upx;
	line-height: 52upx;
	border-radius: 26upx;
	background:#11D6D3;
	color:#fff;
	font-size:26upx;
	display: inline-block;
	vertical-align: middle;
	margin-left:200upx;
}
</style>
