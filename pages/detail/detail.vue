<template>
	<view class="content">
		<uni-swiper-dot :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content" v-if="banner">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item, index) in info" :key="index">
					<view class="swiper-item">
						<image :src="item" />
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="detail-coordinates" @click="map">
			<image src="../../static/other/more.png" mode=""></image>
			<image src="../../static/other/details_address.png" mode=""></image>
			<view class="" style="padding: 1rem;padding-bottom: 0.5rem;">
				<span style="padding-right: 1rem;">{{ list.communityName }}</span>
				<view class="detail-state" v-if="list.tenancyFlag=='1'">在租</view>
				<view class="dated" v-else>已到期</view>
			</view>
			<p class="detail-date">{{list.startDate}} 至 {{list.endDate}}</p>
			<view class="empty"></view>
		</view>
		<view class="">
			<view class="detail-address">
				<image src="../../static/other/address_details_icon.png" mode=""></image>
				<span>{{ list.buildingNumber }}栋{{ list.unitNumber }}单元{{ list.houseNumber }}{{list.roomNumber?'-'+list.roomNumber:''}}</span>
				<span>{{ list.bedroom }}室{{ list.livingRoom }}厅{{ list.kitchen }}厨{{ list.bathroom }}卫{{ list.balcony }}阳台</span>
			</view>
			<view class="empty"></view>
		</view>
		<view class="">
			<view class="detail-content" v-for="(item, index) in contentData" :key="index.item">
				<view class="content-left">{{ item }}</view>
				<view class="content-right">{{ contentDatas[index] }}</view>
			</view>
		</view>
		<view class="gray"></view>
		<view class="detail-configuration">
			<view class="">
				<view class="configuration">房屋配置</view>
				<view class="configuration-content">{{ houseConfiguration }}</view>
			</view>
		</view>
		<view class="gray"></view>
		<view class="detail-houseUser">
			<p>房东</p>
			<view class="houseUser" @click="landlordDetail(list.uid,list.id)">
				<image src="../../static/other/landlord_head.png" mode=""></image>
				<view class="landlordname">{{list.truename}}</view>
			</view>
		</view>
		<view class="gray"></view>
		<view class="detail-pretend">
			<p>租友（{{ pretend.length }}）</p>
			<view class="pretend" v-for="(item, index) in pretend" :key="index" @click="friendDetail(item.tenancyFlag,item.tenantId,item.sex)">
				<!-- <image class="pretend-img" :src="item.url" mode=""></image> -->
				<image class="pretend-img" v-if="item.tenancyFlag==1" :src="item.photo" mode=""></image>
				<image class="pretend-img" v-else src="../../static/other/pretendfri_girl_gary.png" mode=""></image>
				<view class="pretend-name">{{ item.tenant }}</view>
			</view>
		</view>
		<view class="gray"></view>
		<view class="detail-contract" v-if="rentobj.tenancyTerm">
			<span>{{rentobj.tenancyTerm}}</span>
			<a href="" @click.prevent="hetongdetail(rentobj.contractId,0)">查看合同详情<span class="rightIcon"></span></a>
		</view>
		<view class="detail-contract" v-else>
			<span>尚未添加合同</span>
		</view>
		<view class="gray"></view>
		<view class="detail-contract" v-if="rentobj.fixedCosts">
			<span>月租金{{rentobj.fixedCosts}}元</span>
			<a href="" @click.prevent="rentdetail(tenancyNum)">更多租赁信息<span class="rightIcon"></span></a>
		</view>
		<view class="detail-contract" v-else>
			<span>尚未设置租金</span>
		</view>
	</view>
</template>
<script>
	import uniSwiperDot from '@/components/uniSwiperDot/uni-swiper-dot.vue';
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {
			uniSwiperDot,
			uniIcon
		},
		data() {
			return {
				list: [],
				identityNumber: '',
				houseId: '',
				info: [{
						url: '/static/swiper/1.jpg'
					},
					{
						url: '/static/swiper/2.jpg'
					},
					{
						url: '/static/swiper/3.jpg'
					}
				],
				current: 0,
				mode: 'indexes',
				dotsStyles: {},
				orientation: ['无', '东南', '南', '南北通透', '西南', '西', '东西通透', '西北', '北', '东北', '东'],
				decorationSituation: ['无', '毛坯', '简装', '精装', '豪华', '中装'],
				contentData: ['所在楼层', '总楼层', '使用面积', '朝向', '装修情况', '出租方式'],
				contentDatas: [],
				houseConfiguration: '',
				pretend: [

				],
				tenancyNum: '',
				rentobj: {},
				banner:''
			};
		},
		onLoad(options) {
			this.houseId = options.id;
			this.identityNumber = options.idcard;
			this.tenancyNum = options.tenancyNum;
			this.queryRentedInfo();
			this.queryRent();
		},
		methods: {
			//获取租房详情
			async queryRentedInfo() {
				let res = await this.util.request({
					url: '/etenantsvr/tenant/queryRentedInfo',
					method: 'post',
					data: {
						houseId: this.houseId,
						identityNumber: this.identityNumber
					}
				});
				this.list = res.data.obj;
				if(this.list.communityPicture==''){
					this.banner=false
				}else{
					this.banner=true
					this.info = res.data.obj.communityPicture.split(',');
				}
				this.houseConfiguration = this.list.houseConfiguration;
				var rentWay;
				if (this.list.rentWay == 1) {
					rentWay = '单间';
				} else {
					rentWay = '整租';
				}
				if(this.list.floor==0){
					this.list.floor='独栋'
				}
				if(this.list.totalFloor==0){
					this.list.totalFloor='独栋'
				}
				this.contentDatas = [
					this.list.floor,
					this.list.totalFloor,
					this.list.usageArea + '㎡',
					this.orientation[this.list.orientation],
					this.decorationSituation[this.list.decorationSituation],
					rentWay
				];
				this.queryPartnerRentingList()
			},
			//获取租友
			async queryPartnerRentingList() {
				let res = await this.util.request({
					url: '/etenantsvr/tenant/queryPartnerRentingList',
					method: 'post',
					data: {
						// houseId: this.$store.state.houseId
						houseId: this.houseId,
						startDate:this.list.startDate,
						endDate:this.list.endDate
					}
				});
				//console.log(JSON.stringify(res))
				let list = res.data.list;
				if(this.list.tenancyFlag=='0'){
					 for(var i of list){
						 i.tenancyFlag='0'
					 }
				}
				for (var item of list) {
					item.sex = this.util.transform(item.identityNumber);
					item.photo = ['../../static/other/pretendfri_boy_light.png', '../../static/other/pretendfri_girl_light.png'][item.sex]
				}
				var result = list.filter((item) => {
					return item.identityNumber != this.$store.state.identityNumber
				});
				this.pretend = result;
			},
			friendDetail(type, id, sex) {
				uni.navigateTo({
					url: `../module/friendDetail?id=${id}&type=${type}&sex=${sex}`
				})
			},
			async queryRent() {
				let res = await this.util.request({
					url: '/etenantsvr/landlordModule/queryRentalInfo',
					method: 'POST',
					data: {
						tenantId:this.$store.state.obj.id,
						tenancyNum: this.tenancyNum
					},
				});
				if (res.code == '0') {
					if (res.data.obj) {
						this.rentobj = res.data.obj;
					}
				}
			},
			hetongdetail(contractId, type) {
				uni.navigateTo({
					url: `../module/contractDetail?id=${contractId}&type=${type}`,
				});
			},
			rentdetail(tenancyNum) {
				uni.navigateTo({
					url: `../module/rates?tenancyNum=${tenancyNum}`
				})
			},
			change(e) {
				this.current = e.detail.current;
			},
			map() {
				uni.navigateTo({
					url: '/pages/detail/map'
				});
			},
			landlordDetail(uid, houseId, ) {
				var tenancyNum = this.tenancyNum;
				console.log(this.$store.state)
				var tenantId = this.$store.state.id;
				uni.navigateTo({
					// url:`/module/landlord/landlord_detail`
					url: `/pages/module/landlord/landlord_detail?uid=${uid}&type=1&tenancyNum=${tenancyNum}&houseId=${houseId}&tenantId=${tenantId}`
				})
			}
		}
	};
</script>

<style>
	.content {
		background-color: #ffffff;
	}

	.swiper-box {
		height: 400upx;
	}

	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #eee;
		color: #fff;
	}

	.swiper-item image {
		width: 100%;
		height: 100%;
	}

	.detail-state,
	.dated {
		text-align: center;
		display: inline-block;
		width: 96upx;
		height: 46upx;
		background-color: #fcf1e1;
		line-height: 46upx;
		color: #e89827;
		font-size: 24upx;
		border-radius: 6upx;
	}

	.dated {
		background: rgba(240, 240, 240, 1);
		color: #ADADAD;
	}

	.detail-date {
		font-size: 24upx;
		margin-left: 1rem;
		color: #888888;
		letter-spacing: 1upx;
	}

	.detail-coordinates {
		width: 100%;
	}

	.empty {
		margin: 20upx auto;
		width: 678upx;
		height: 1px;
		background: rgba(235, 235, 235, 1);
	}

	.gray {
		height: 18upx;
		width: 100%;
		background-color: #f5f5f5;
	}

	.detail-coordinates image:nth-child(1) {
		float: right;
		width: 56upx;
		height: 56upx;
		margin-top: 60upx;
		margin-right: 20upx;
	}

	.detail-coordinates image:nth-child(2) {
		float: right;
		width: 28upx;
		height: 32upx;
		margin-top: 70upx;
		margin-right: 50upx;
	}

	.detail-address {
		padding: 0.2rem 0;
		margin-left: 1rem;
	}

	.detail-address image {
		width: 28upx;
		height: 24upx;
	}

	.detail-address span {
		font-size: 30upx;
		color: #333333;
		letter-spacing: 1upx;
		margin-left: 10upx;
	}

	.detail-address span:nth-child(3) {
		margin-left: 100upx;
	}

	.detail-content {
		display: inline-block;
		width: 45%;
	}

	.content-left,
	.content-right {
		display: inline-block;
		width: 130upx;
		font-size: 26upx;
		color: #adadad;
		margin-left: 1rem;
		margin-bottom: 0.5rem;
	}

	.detail-configuration {
		margin: 18upx 0;
	}

	.configuration {
		font-size: 30upx;
		color: #adadad;
		display: inline-block;
		width: 20%;
		margin-left: 1rem;
		height: 68upx;
		line-height: 68upx;
		vertical-align: top;
	}

	.configuration-content {
		margin-right: 0.5rem;
		font-size: 30upx;
		color: #333333;
		display: inline-block;
		width: 68%;
		line-height: 68upx;
	}

	.detail-houseUser {
		margin-bottom: 0.5rem;
	}

	.detail-houseUser p {
		font-size: 32upx;
		padding: 0.5rem;
		padding-left: 1rem;
	}

	.houseUser {
		width: 100%;
		/* height: 116upx; */
	}

	.houseUser image {
		vertical-align: middle;
		margin-left: 1.5rem;
		width: 116upx;
		height: 116upx;
	}

	.houseUser span {
		font-size: 30upx;
		color: #09b8b5;
		line-height: 116upx;
		margin-left: 0.5rem;
	}

	.detail-pretend {
		white-space: nowrap;
		overflow-x: auto;
		margin-bottom: 20upx;
	}

	.detail-pretend p {
		font-size: 32upx;
		padding: 0.5rem;
		padding-left: 1rem;
	}

	.pretend {
		text-align: center;
		height: 116upx;
		display: inline-block;
	}

	.pretend-img {
		margin-left: 1.5rem;
		width: 116upx;
		height: 116upx;
	}

	.pretend-name {
		margin-left: 1.5rem;
		font-size: 26upx;
	}

	.detail-contract {
		height: 100upx;
		line-height: 100upx;
	}

	.detail-contract span {
		font-size: 32upx;
		margin-left: 1rem;
		color: #999;
	}

	.detail-contract a {
		font-size: 32upx;
		display: inline-block;
		float: right;
		margin-right: 1rem;
		color: #09b8b5;
	}

	.landlordname {
		font-size: 26upx;
		margin-left: 50upx
	}
	span.rightIcon{
		display:inline-block;
		vertical-align: middle;
		width:20upx;
		height:20upx;
		border-top:1upx solid #ccc;
		border-right:1upx solid #ccc;
		margin-left:16upx;
		margin-bottom:7upx;
		transform:rotate(45deg);
		-ms-transform:rotate(45deg); /* IE 9 */
		-webkit-transform:rotate(45deg); /* Safari and Chrome */
	}
</style>
