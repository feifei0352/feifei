<!-- 
*   周晨辉
*   2019/6/25
*  -->
<template>
	<view>
		<scroll-view scroll-x class="top">
			<view class="contact-tabbar" :class="{ 'tabbar-bottom': currentTab == index }" v-for="(item, index) in tabBar" :key="index" @click="clickTab(index)">
				{{ item.title }}
			</view>
		</scroll-view>
		<swiper :current="currentTab" @change="changeTab">
			<swiper-item>
				<view>
					<view class="contact-item" v-for="(item, index) in List2" :key="index">
						<view class="contact-item-area">
							<image src="../../static/other/address_orangepoint.png"></image>
							{{ item.rentedHouse }}
						</view>
						<view class="contact-item-year" @click="toDetail(item.contractId,0)">
							<view class="contact-item-y">{{ item.tenancyTerm }}</view>
							<view class="contact-item-t">{{ item.startDate }}至{{ item.leaseTime }}</view>
						</view>
					</view>
				</view>
				<view class="none" v-if="List2.length == '0'">
					<view><image src="../../static/other/renants_notes.png"></image></view>
					<view>房东暂未添加合同</view>
				</view>
			</swiper-item>
			<swiper-item>
				<ul>
					<li class="contact-item" v-for="(item, index) in List" :key="index">
						<view class="contact-item-area">
							<image src="../../static/other/address_orangepoint(1).png"></image>
							{{ item.rentedHouse }}
						</view>
						<view class="contact-item-year" @click="toDetail(item.contractId,1)">
							<view class="contact-item-y">{{ item.tenancyTerm }}</view>
							<view class="contact-item-t">{{ item.leaseTime }}到期</view>
						</view>
					</li>
				</ul>
				<view class="none" v-if="List.length == '0'">
					<view><image src="../../static/other/renants_notes.png"></image></view>
					<view>房东暂未添加合同</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
export default {
	data() {
		return {
			tabBar: [
				{
					title: '当前'
				},
				{
					title: '到期'
				}
			],
			List: [],
			length1:'1',
			length2:'2',
			List2: [],
			list3: ['1', '2', '3'],
			currentTab: 0
		};
	},
	onReady() {
		this.show();
	},
	methods: {
		clickTab(e) {
			this.currentTab = e;
		},
		changeTab(e) {
			this.currentTab = e.mp.detail.current;
		},
		toDetail(id, type) {
			uni.navigateTo({
				url: `./contractDetail?id=${id}&type=${type}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		async show() {
			var identityNumber=this.$store.state.identityNumber;
			let res = await this.util.request({
				url: '/etenantsvr/leaseContract/queryLeaseContractList',
				method: 'post',
				data: {
					identityNumber: identityNumber
				}
			});
			if (res.code == '0') {
				for (var item of res.data.list) {
					if (item.tenancyFlag == '0') {
						this.List.push(item.contractDtoList[0]);
					} else if(item.tenancyFlag == '1'){
						this.List2.push(item.contractDtoList[0]);
					}
				}
			}
		}
	}
};
</script>

<style>
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
	color: #2196f3;
	border-bottom: 2px solid #2196f3;
}
.contact-item {
	background: #fff;
	margin: 30upx 0;
}
swiper,
swiper-item {
	height: 900upx;
}
.contact-item-area {
	font-size: 30upx;
	font-weight: 500;
	color: rgba(102, 102, 102, 1);
	padding: 36upx 39upx;
	border-bottom: 1px solid rgba(235, 235, 235, 1);
}
.contact-item-area > image {
	width: 25upx;
	height: 25upx;
	margin-right: 12upx;
}
.contact-item-year {
	padding: 36upx 39upx;
}
.contact-item-y {
	font-size: 30upx;
	color: #333333;
	margin-bottom: 10upx;
}
.contact-item-t {
	font-size: 30upx;
	color: #999999;
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
</style>
