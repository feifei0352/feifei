<!-- 
*   史科厅
*   2019-7-3
*  -->
<template>
	<view>
		<scroll-view scroll-x class="top">
			<view class="contact-tabbar" :class="{ 'tabbar-bottom': currentTab == index }" v-for="(item, index) in tabBar" :key="index" @click="clickTab(index)">
				<span>{{ item.title }}</span>
			</view>
		</scroll-view>
		<swiper :current="currentTab" @change="changeTab">
			<swiper-item>
				<view class="contact">
					<view class="contact-item" v-for="(item, index) in List" :key="index" @longpress="handles" @click="houseDetail">
						<view class="contact-item-area">
							<image src="../../../static/other/address_orangepoint.png"></image>
							<text>{{ item.street }}</text>
							<span style="color:#2FC38D;">{{ item.rentWay==1?'单间':'整租' }}</span>
						</view>
						<view class="contact-item-year">
							<!-- <cover-image src="../../static/icon/jio.png"></cover-image> -->
							<image src="../../../static/icon/pipeifangdong@3x.png"></image>
							<view class="contact-item-y">
								<p>{{ item.communityName }}</p>
								<p class="roomPosition">{{ item.buildingNumber }}栋{{ item.unitNumber }}单元{{ item.houseNumber }}{{ item.roomNumber?'-'+item.roomNumber:'' }}</p>
							</view>
							<span class="contact-item-right">
								<uni-icon type="forward" color="#ddd" size="24"></uni-icon>
							</span>
						</view>
					</view>
				</view>
				<!-- <view class="none" v-if="List.length=='0'">
					<view>
						<image src="../../static/other/renants_notes.png"></image>
					</view>
					<view></view>
				</view> -->
			</swiper-item>
			<swiper-item>
				<ul>
					<li class="contact-item" v-for="(item, index) in expire" :key="index" @longpress="handles" @click="houseDetail">
						<view class="contact-item-area">
							<image src="../../../static/other/address_orangepoint(1).png"></image>
							<text>{{ item.street }}</text>
							<span>{{ item.rentWay==1?'单间':'整租' }}</span>
						</view>
						<view class="contact-item-year">
							<cover-image src="../../../static/icon/jio.png"></cover-image>
							<view class="contact-item-y">
								<p>{{ item.communityName }}</p>
								<p>{{ item.buildingNumber }}栋{{ item.unitNumber }}单元{{ item.houseNumber }}</p>
							</view>
							<span class="contact-item-right">
								<uni-icon type="forward" color="#ddd" size="20"></uni-icon>
							</span>
						</view>
					</li>
				</ul>
				<view class="none" v-if="expire.length == '0'">
					<view><image src="../../../static/icon/renants_jio.png"></image></view>
					<view>暂无到期租房</view>
				</view>
			</swiper-item>
		</swiper>
		<button class="add-button" @click="addHouse"><image src="../../../static/icon/jio@3x.png"></image>添加我的租房</button>
		<view class="shade" v-show="showShade" @tap="hidePop">
			<view class="pop" :style="popStyle" :class="{'show':showPop}">
				<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu(item)" :data-index="index">{{item}}</view>
			</view>
		</view>
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
					title: '在租'
				},
				{
					title: '到期'
				}
			],
			List: [
				{
					street:'杭州市滨江区春晓路',
					rentWay:1,
					communityName:'东方郡',
					buildingNumber:'东11',
					unitNumber:'5',
					houseNumber:'1',
					roomNumber:'01'
				},
				{
					street:'杭州市滨江区春晓路',
					rentWay:1,
					communityName:'东方郡',
					buildingNumber:'东11',
					unitNumber:'5',
					houseNumber:'1',
					roomNumber:'01'
				},
				{
					street:'杭州市滨江区春晓路',
					rentWay:1,
					communityName:'东方郡',
					buildingNumber:'东11',
					unitNumber:'5',
					houseNumber:'1',
					roomNumber:'01'
				},
				{
					street:'杭州市滨江区春晓路',
					rentWay:1,
					communityName:'东方郡',
					buildingNumber:'东11',
					unitNumber:'5',
					houseNumber:'1',
					roomNumber:'01'
				}
			],
			expire: [],
			currentTab: 0,
			/* 窗口尺寸 */
			winSize: {},
			/* 显示遮罩 */
			showShade: false,
			/* 显示操作弹窗 */
			showPop: false,
			/* 弹窗按钮列表 */
			popButton: ["删除该房源","设置首页默认"],
			/* 弹窗定位样式 */
			popStyle: "",
			/* 选择的用户下标 */
			pickerUserIndex: -1
		};
	},
	onLoad() {
		this.getlist();
	},
	methods: {
		// async getlist() {
		// 	let res = await this.util.request({
		// 		url: '/etenantsvr/tenant/queryRentedList',
		// 		method: 'post',
		// 		data: {
		// 			identityNumber: this.$store.state.obj.identityNumber
		// 		}
		// 	});
		// 	this.List = res.data.inRent;
		// 	this.expire = res.data.expire;
		// },
		clickTab(e) {
			this.currentTab = e;
		},
		changeTab(e) {
			this.currentTab = e.mp.detail.current;
		},
		// toDetail(id,tenancyNum) {
		// 	uni.navigateTo({
		// 		url: `../detail/detail?id=`+id+'&idcard=' + this.$store.state.obj.identityNumber+'&tenancyNum='+tenancyNum,
		// 	});
		// }
		handles(e) {
			let [touches, style, index] = [e.touches[0], "", e.currentTarget.dataset.index];

			/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
			if (touches.clientY > (this.winSize.height / 2)) {
				style = `bottom:${this.winSize.height-touches.clientY}px;`;
			} else {
				style = `top:${touches.clientY}px;`;
			}
			if (touches.clientX > (this.winSize.witdh / 2)) {
				style += `right:${this.winSize.witdh-touches.clientX}px`;
			} else {
				style += `left:${touches.clientX}px`;
			}

			this.popStyle = style;
			this.pickerUserIndex = Number(index);
			this.showShade = true;
			this.$nextTick(() => {
				setTimeout(() => {
					this.showPop = true;
				}, 10);
			});
		},
		/* 隐藏弹窗 */
		hidePop() {
			this.showPop = false;
			this.pickerUserIndex = -1;
			setTimeout(() => {
				this.showShade = false;
			}, 250);
		},
		pickerMenu(item){
			// console.log(`确认${item}吗?`)
			uni.showModal({
				content:`确认${item}吗?`
			})
		},
		addHouse() {
			uni.navigateTo({
				url:'addHouse'
			})
		},
		houseDetail() {
			uni.navigateTo({
				url:'houseDetail'
			})
		}
	}
};
</script>

<style lang="scss" soped>
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
	height: 900upx;
	overflow: scroll;
}
.contact-item-area {
	font-size: 32upx;
	font-family:PingFang SC;
	font-weight: 600;
	color: #333333;
	padding: 36upx 39upx;
	border-bottom: 1px solid rgba(235, 235, 235, 1);
}
.contact-item-area > image {
	width: 32upx;
	height: 32upx;
	margin-right: 18upx;
	float: left;
}
.contact-item-area span {
	float: right;
	font-weight:500
}
.contact-item-year {
	padding: 36upx 39upx;
}
.contact-item-year>image{
	width:36upx;
	height:36upx;
	margin-top:5upx;
	vertical-align: top;
	margin-right:10upx
}
.contact-item-y {
	font-size: 30upx;
	color: #333333;
	margin-bottom: 10upx;
	display: inline-block;
}
.contact-item-y > p {
	font-size: 32upx;
	color: #333333;
	line-height: 40upx;
}
.contact-item-y .roomPosition{
	color:#999999
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
text{
	display: inline-block;
	width: 80%;
	word-wrap:break-word;
}
.add-button{
	margin-top:56upx;
	color: #0DBFBC;
	font-size: 34upx;
	width: 690upx;
	height: 100upx;
	line-height: 100upx;
	border: 2upx solid #0DBFBC;
	border-radius: 48upx;
}
.add-button>image{
	width:34upx;
	height:34upx;
	vertical-align: middle;
	margin-bottom:8upx;
	margin-right:12upx
}

.active{
	background:#E9EDF0
}
.shade {
		position: fixed;
		z-index: 100;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		-webkit-touch-callout: none;

		.pop {
			position: fixed;
			z-index: 101;
			width: 200upx;
			box-sizing: border-box;
			font-size: 28upx;
			text-align: left;
			color: #333;
			background-color: #fff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
			line-height: 80upx;
			transition: transform 0.15s ease-in-out 0s;
			user-select: none;
			-webkit-touch-callout: none;
			transform: scale(0, 0);

			&.show {
				transform: scale(1, 1);
			}

			&>view {
				padding: 0 20upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				user-select: none;
				-webkit-touch-callout: none;

				&:active {
					background-color: #f3f3f3;
				}
			}
		}
	}
</style>
