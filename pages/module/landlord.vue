<!-- /
* 史科厅 
* createtime:2019-06-27
* / -->
<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<scroll-view scroll-x class="top">
				<div class="contact-tabbar" :class="{'tabbar-bottom':currentTab==index}" v-for="(item,index) in tabBar" :key="index"
				 @click="clickTab(index)">
					<span>{{item.title}}</span>
				</div>
			</scroll-view>
			<swiper :style="'height:'+swiperHeight" :current="currentTab" @change="changeTab">
					<swiper-item>
						<ul>
							<li class="list" v-for="item in list" :key="item.uid" 
								@click="detail(item.uid,1,item.tenancyNum,item.messageNum,item.houseId,item.tenantId)" v-if='item.tenancyFlag==1'>
								<img src="../../static/other/landlord_head.png"/>
								<uni-badge v-if="item.messageNum>0" :text="item.messageNum" type="error"></uni-badge>
								<span>{{item.truename}}</span>
								<p>
									<image src="../../static/icon/address.png" class="location"></image>
									{{item.communityName}}{{item.buildingNumber?item.buildingNumber+'栋':''}}{{item.unitNumber?item.unitNumber+'单元':''}}
									{{item.houseNumber}}
									{{item.roomNumber?'-'+item.roomNumber:''}}
								</p>
							</li>
						</ul>
						<!-- <view class="none" v-if="!item.uid">
							<view>
								<image src="../../static/other/landlord_head2.png"></image>
							</view>
							<view>暂无当前房东</view>
						</view> -->
					</swiper-item>
					<swiper-item>
						<ul>
							<li class="list" v-for="item in list" :key="item.uid" 
								@click="detail(item.uid,0,item.tenancyNum,item.messageNum,item.houseId,item.tenantId)" v-if='item.tenancyFlag==0'>
								<img src="../../static/other/landlord_head2.png"/>
								<span>{{item.truename}}</span>
								<p><image src="../../static/icon/address.png" class="location"></image>
									{{item.communityName}}{{item.buildingNumber?item.buildingNumber+'栋':''}}{{item.unitNumber?item.unitNumber+'单元':''}}
									{{item.houseNumber}}
									{{item.roomNumber?'-'+item.roomNumber:''}}
								</p>
							</li>
						</ul>
						<!-- <view class="none" v-if="!item.uid">
							<view>
								<image src="../../static/other/landlord_head2.png"></image>
							</view>
							<view>暂无历史房东</view>
						</view> -->
					</swiper-item>
			</swiper>
		</view> 	
	</view>
</template>

<script>
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	export default {
		components: {
			uniBadge,
		},
		data() {
			return {
				tabBar: [{
						"title": "当前"
					},
					{
						"title": "历史"
					},
				],
				swiperHeight:'',
				list:[],
				currentTab: 0,
			}
		},
		methods: {
			async onLoad(option) { //option为object类型，会序列化上个页面传递的参数
				// 获取屏幕高度
				let windowHeight=uni.getSystemInfoSync().windowHeight;
				// 设置纵向滑动容器高度
				this.swiperHeight=windowHeight-42+'px';
				uni.showLoading();
				let res = await this.util.request({
					url: '/etenantsvr/landlordModule/queryLandlord',
					method: 'post',
					data:{
						identityNumber:this.$store.state.obj.identityNumber,
					},
				});
				console.log(JSON.stringify(res.data.list));
				if(res.code==0){
					this.list=res.data.list;
				}
			},
			clickTab(e) {
				this.currentTab = e;
			},
			changeTab(e) {
				this.currentTab = e.mp.detail.current;
			},
			detail(uid,type,tenancyNum,messageNum,houseId,tenantId){
				uni.navigateTo({
					url:`landlord/landlord_detail?uid=${uid}&type=${type}&tenancyNum=${tenancyNum}&houseId=${houseId}&messageNum=${messageNum}&tenantId=${tenantId}`,
				});
			}
		}
	}
</script>

<style>
	page {
		background: #f2f2f2;
	}

	.top {
		width: 100%;
		text-align: center;
		line-height: 84upx;
		white-space: nowrap;
		position: relative;
		background: #fff;
	}
	.contact-tabbar {
		width: 50%;
		font-size: 36upx;
		height: 84upx;
		display: inline-block;
		color: #000;
	}

	.tabbar-bottom>span {
		border-bottom: 8upx solid #22C7C7;
		padding-bottom: 12upx;
	}

	.contact-item {
		background: #fff;
		margin: 30upx 0;
	}
	swiper,swiper-item {
		/* min-height: 600px; */
		overflow-y: auto;
	}

	.contact-item>p {
		font-size: 30upx;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		padding: 36upx 39upx;
		border-bottom: 1px solid rgba(235, 235, 235, 1);
	}

	.contact-item-year {
		padding: 36upx 39upx;
	}

	.contact-item-year>h3 {
		font-size: 30upx;
		color: #333333;
		margin-bottom: 10upx;
	}

	.contact-item-year>p {
		font-size: 30upx;
		color: #999999
	}
	ul{
		padding: 0;
	}
	.list{
		margin-top: 20upx;
		padding:40upx 20upx;
		background-color: #fff;
		list-style: none;
		padding-bottom: 60upx;
		position: relative;
		font-size: 34upx;
	}
	.list img{
		width: 120upx;
		height: 120upx;
		float: left;
		border-radius: 50%;
		margin-right: 40upx;
		margin-bottom: 40upx;
	}
	.list>span{
		line-height: 60upx;
	}
	.list>p{
		color: #999;
		font-size: 28upx;
	}
	uni-badge{
		position: absolute;
		left: 110upx;
		top: 20upx;
	}
	.none{
		text-align: center;
		font-size:30upx;
		color:#333333;
		margin-top:224upx;
	}
	.none image{
		width:169upx;
		height:169upx
	}
	.location{
		float: left;
		margin-top: 8upx;
		width: 20upx;
		height: 25upx;
		margin-right: 10upx;
	}
</style>
