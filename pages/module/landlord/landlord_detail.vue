<!-- /
* 史科厅 
* createtime:2019-06-27
* / -->
<template>
	<view class="uni-padding-wrap uni-common-mt" style="background-color: #F5F5F5;">
		<view class="top" style="border-top: 1px solid #ddd;padding: 30px 0;">
			<image v-if="type==1" src="../../../static/other/landlord_head.png"></image>
			<image v-else src="../../../static/other/landlord_head2.png"></image>
			<p>{{detail.truename}}<image src="../../../static/other/man.png" class="gender"></image></p>
			<p class="address" v-show="detail.communityName">{{detail.communityName}}{{detail.buildingNumber}}栋{{detail.unitNumber}}单元{{detail.houseNumber}}{{detail.roomNumber?'-'+detail.roomNumber:''}}</p>
		</view>
		<scroll-view scroll-x class="top" style="margin-top: 10px;">
			<div class="contact-tabbar" :class="{'tabbar-bottom':currentTab==index}" v-for="(item,index) in tabBar" :key="index"
			 @click="clickTab(index)">
				<span>{{item.title}}</span>
			</div>
		</scroll-view>
		<swiper :current="currentTab" @change="changeTab">
			<swiper-item>
				<ul class="info">
					<li>
						<span class="left">手机号</span>{{detail.phone}}<image @click="call(detail.phone)" class="phone" src="../../../static/other/phone.png" mode=""></image>
					</li>
					<!-- <li>
						<span class="left">身份证号</span>500＊＊＊＊＊＊＊＊＊＊＊8935
					</li>
					<li>
						<image class="idimg" src="../../../static/other/positive.jpg" mode="scaleToFill"></image>
						<image class="idimg" src="../../../static/other/timg.jpg" mode="scaleToFill"></image>
					</li> -->
				</ul>
			</swiper-item>
			<swiper-item>
				<ul class="info" v-show="rent.startDate">
					<li>
						<span class="left">起租日</span>{{rent.startDate}}
					</li>
					<li>
						<span class="left">到租日</span>{{rent.leaseTime}}
					</li>
				</ul>
				<ul v-show="rent.startDate">
					<li v-if="rent.tenancyTerm" class="ht_list">{{rent.tenancyTerm}}
						<span @click="contract(rent.contractId)">查看合同详情
							<uni-icon type="forward" color="#ddd" size="20"></uni-icon>
						</span>
					</li>
					<li v-else class="ht_list" style="color:#ADADAD;">
						尚未添加合同
					</li>
					<li v-if="rent.fixedCosts" class="ht_list">月租金{{rent.fixedCosts}}元
						<span @click="rates()">更多租费信息<uni-icon type="forward" color="#ddd" size="20"></uni-icon></span>
					</li>
					<li v-else class="ht_list" style="color:#ADADAD;">
						尚未设置租费
					</li>
				</ul>
				<view class="none" v-show="!rent.startDate">
					<view>
						<image src="../../../static/other/no_news.png"></image>
					</view>
					<view>暂无租赁信息</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="bottom" v-if="type==1">
			<button style="background-color: #12CDDE;border: 1px solid #12CDDE;" size="mini" @click="terminate(0)">退租</button>
			<button style="background-color: #11D6D3;border: 1px solid #11D6D3;" size="mini" @click="terminate(1)">续租</button>
			<button style="background-color: ##FFFFFF;border: 1px solid #0AD1CE;color:#0AD1CE;position: relative;" size="mini" @click="look_news()">
				<image src="../../../static/icon/news.png" class="news"></image>消息
				<uni-badge v-if="unRead>0" :text="unRead" type="error" size="small"></uni-badge>
			</button>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	export default {
		components: {
			uniIcon,
			uniBadge,
		},
		data() {
			return {
				tabBar: [{
						"title": "个人信息"
					},
					{
						"title": "租赁信息"
					},
				],
				currentTab: 0,
				type:1,
				uid:'',
				tenancyNum:'',
				detail:{
					truename:'',
					buildingNumber:'',
					unitNumber:'',
					houseNumber:'',
					roomNumber:'',
					phone:'',
				},
				rent:'',
				messageNum:'',
				houseId:'',
				unRead:0,
			}
		},
		methods: {
			async onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			    console.log(option)
				this.uid=option.uid;//房东id
				this.type=option.type;//房东类型
				this.tenancyNum=option.tenancyNum;//租赁编号
				this.houseId=option.houseId;//房屋id
				console.log(JSON.stringify(option))
				// 租赁信息
				uni.showLoading();
				let res = await this.util.request({
					url: '/etenantsvr/landlordModule/queryRentalInfo',
					method: 'post',
					data:{
						tenantId:this.$store.state.obj.id,
						tenancyNum:this.tenancyNum,
					}
				});
				console.log(JSON.stringify(res.data));
				if(res.code==0){
					this.rent=res.data.obj;
				}
				// 房东信息
				let res2 = await this.util.request({
					url: '/etenantsvr/tenant/queryLandlordInfo',
					method: 'post',
					data:{
						tenantId:option.tenantId,
						houseId:this.houseId
					}
				});
				console.log(JSON.stringify(res2));
				if(res2.code==0){
					this.detail=res2.data.landlordInfo;
					this.unRead=res2.data.unRead;
				}
				// 未读消息数
				// let res3 = await this.util.request({
				// 	url: '/etenantsvr/homePage/unreadMessage',
				// 	method: 'post',
				// 	data:{
				// 		identityNumber:'412326199500000000'
				// 	}
				// });
				// // console.log(JSON.stringify(res3));
				// if(res3.code==0){
				// 	this.messageNum=res3.data.obj;
				// }
			},
			clickTab(e) {
				this.currentTab = e;
			},
			changeTab(e) {
				this.currentTab = e.mp.detail.current;
			},
			update_type(type){
				
			},
			// 跳转信息
			look_news(){
				uni.navigateTo({
					url: `news?uid=${this.uid}&tenantId=${this.$store.state.obj.id}&tenancyNum=${this.tenancyNum}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 跳转合同
			contract(contractId){
				uni.navigateTo({
					url: `../contractDetail?id=${contractId}&type=${this.type-1}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 跳转到租费
			rates(){
				uni.navigateTo({
					url: `../rates?tenancyNum=${this.tenancyNum}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 退租续租
			terminate(type){
				if(!this.rent.startDate){
					return false;
				}
				console.log(this.rent)
				uni.navigateTo({
					url: `../request?tenantId=${this.rent.tenantId}&uid=${this.uid}&tenancyNum=${this.tenancyNum}&startDate=${this.rent.startDate}&endDate=${this.rent.leaseTime}&type=${type}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			call(phoneNumber){
				uni.makePhoneCall({
					phoneNumber: phoneNumber //仅为示例
				});
			}
		}
	}
</script>

<style>
	ul{
		padding-left: 0;
	}
	ul li{
		list-style: none;
		padding-left: 40upx;
		background: #fff;
	}
	.top{
		padding: 10px 0;
		text-align: center;
	}
	image{
		width: 100px;
		height: 100px;
	}
	.top p{
		line-height: 25px;
		font-size: 18px;
	}
	.top .address{
		font-size: 14px;
		color: #666;
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
	
	.tabbar-bottom>span {
		border-bottom: 4px solid #22C7C7;
		padding-bottom: 6px;
	}
	.gender{
		width: 14px;
		height: 15px;
	}
	.info{
		padding-left: 0;
		font-size: 16px;
		background-color: #fff;
		padding:30upx 0;
	}
	.info .left{
		color: #ADADAD;
		margin-right: 40upx;
		line-height: 80upx;
	}
	.info .phone{
		height: 100upx;
		width: 100upx;
		vertical-align:middle;
		margin-bottom: 10upx;
	}
	.idimg{
		width: 45%;
		margin-right: 5%;
		margin-top: 30upx;
	}
	swiper{
		background-color: #fff;
		min-height: 300px;
		max-height: 400px;
		background: #F5F5F5;
	}
	.ht_list:before{
		height: 20upx;
		background-color: #F5F5F5;
	}
	.ht_list{
		/* font-weight: bold; */
		line-height: 100upx;
		padding-right: 50upx;
		margin-top: 20upx;
		font-size: 16px;
	}
	.ht_list span{
		float: right;
		color: #09B8B5;
	}
	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		padding: 20upx 0;
	}
	.bottom>button{
		font-size: 32upx;
		margin-left: 25upx;
		border-radius: 2upx;
		color: #FFF;
		width: 22%;
	}
	.bottom>button:nth-child(3){
		width: 40%;
	}
	uni-page-wrapper{
		background-color: #F5F5F5;
	}
	uni-badge{
		position: absolute;
		left:35%;
		top: -20upx;
	}
	.none{
		text-align: center;
		font-size:30upx;
		color:#333333;
		margin-top:124upx;
	}
	.none image{
		width:169upx;
		height:169upx
	}
	.news{
		width: 35upx;
		height: 35upx;
		margin-bottom: -10upx;
		margin-right: 10upx;
	}
</style>
