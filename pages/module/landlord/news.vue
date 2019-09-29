<!-- /
* 史科厅 
* 邮箱：1013990898@
* 更新时间:2019-06-27 qq.com
* / -->
<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<scroll-view scroll-x class="top">
				<div class="contact-tabbar" :class="{'tabbar-bottom':currentTab==index}" v-for="(item,index) in tabBar" :key="index"
				 @click="clickTab(index)">
					<span style="position: relative;">
						{{item.title}}
						<uni-badge v-show="item.text>0" style="position: absolute;top:-50upx;right: -20upx;" :text="item.text" type="error" size="small"></uni-badge>
					</span>
				</div>
			</scroll-view>
			<swiper :style="'height:'+swiperHeight" :current="currentTab" @change="changeTab">
					<swiper-item>
						<ul class="list">
							<li v-for="item in list1" :key="item.id">
								<uni-card 
									is-full="true" 
									:title="item.title" 
									thumbnail="../../../static/icon/rentant.png" >
									<ul class="content" style="border-top:1px solid #ddd;padding-top: 20upx;">
										<li>
											退租日期：<span class="time">{{item.content.split('。')[0].substr(5)}}</span>
										</li>
										<li>
											退租理由：<span>{{item.content.split('。')[1].substr(5)}}</span>
										</li>
										<li style="padding-bottom: 20upx;">
											<span>{{item.createTime}}</span>
										</li>
									</ul>
									<view class="footer">
										 <span v-if="item.flag==1" data-position="bottom">已同意</span>
										 <span v-else-if="item.flag==2" data-position="bottom">同意</span>
										 <span v-else="" data-position="bottom" @click="tenantreply(item.content,1,item.id)">同意</span>
									     <span v-if="item.flag==2">
												<view class="uni-input">已驳回</view>
										</span>
										<span v-else-if="item.flag==1">
												<view class="uni-input">驳回</view>
										</span>
										<span v-else="" @click="dont_agree(item.id)">
												<view class="uni-input">驳回</view>
										</span>
									</view>
								</uni-card>
							</li>
						</ul>
						<view class="none" v-if="list1.length==0">
							<view>
								<image src="../../../static/other/no_news.png"></image>
							</view>
							<view>暂无消息</view>
						</view>
					</swiper-item>
					<swiper-item>
						<ul class="list">
							<li v-for="item2 in list2" :key="item2.id">
								<uni-card 
									is-full="true" 
									:title="item2.title" 
									:thumbnail="item2.flag==1||item2.flag==3?'../../../static/icon/rentant_ok.png':'../../../static/icon/rentant_no.png'" >
									<view class="describe">
										<p>{{item2.content}}<span class="time">{{item2.timeStr}}</span>
											<button v-if="item2.flag==0||item2.flag==2" class="describe_btn" size="mini" @click="agree(item2.timeStr,item2.requestType,item2.id)">同意</button>
											<button v-if="item2.flag==3" class="describe_btn" size="mini">已同意</button>
										</p>
										<span class="footer_right">{{item2.createTime}}</span>
									</view>
								</uni-card>
							</li>
						</ul>
						<view class="none" v-if="list2.length==0">
							<view>
								<image src="../../../static/other/no_news.png"></image>
							</view>
							<view>暂无回复信息</view>
						</view>
					</swiper-item>
			</swiper>
		</view> 
			<uni-popup :show="type === 'bottom-share'" position="bottom" @hidePopup="hidePopup('')">
				<view class="bottom-title">
					<image src="../../../static/other/tixian_ok.png" style="width:180upx;height: 180upx;" mode="aspectFit"></image>
				</view>
				<view class="bottom-content">
					{{title}}<span style="color:#09B8B5">{{time}}</span>
				</view>
				<view class="bottom-btn">
					<button type="primary" size="mini" @click="gohome()">返回首页</button>
					<button type="primary" size="mini" @click="hidePopup('')">留在此页</button>
				</view>
			</uni-popup>
			<sen-set-picker ref="setpicker" :shixian="shixian" @quxiaoButton="quxiaobutton" @quedingButton="quedingbutton"></sen-set-picker>
	</view>
</template>

<script>
	import uniCard from "@/components/uni-card/uni-card.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import senSetPicker from "@/components/sen-pickerview/picker-view-set.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	export default {
		components: {uniCard,uniPopup,senSetPicker,uniBadge},
		data() {
			return {
				tabBar: [{
						"title": "请求",
						"text":'',
					},
					{
						"title": "回复",
						"text":'',
					},
				],
				title:"你的到租日期已变更为",
				list1:[],
				list2:[],
				swiperHeight:'',
				currentTab: 0,
				type:'',
				shixian:false,
				inputValue:'',
				uid:'',
				tenantId:'',
				tenancyNum:'',
				time:'',
				messageId:'',
			}
		},
		onBackPress() {
			if (this.type !== '') {
				this.type = '';
				return true;
			}
		},
		methods: {
			onLoad(option) { //option为object类型，会序列化上个页面传递的参数
				// 获取屏幕高度
				let windowHeight=uni.getSystemInfoSync().windowHeight;
				// 设置纵向滑动容器高度
				this.swiperHeight=windowHeight-42+'px';
				this.uid=option.uid;
				this.tenantId=option.tenantId;
				this.tenancyNum=option.tenancyNum;
				this.loading();
				this.$refs.setpicker.confirm(this.getDate());
			},
			async loading(){
				uni.showLoading();
				let res = await this.util.request({
					url: '/etenantsvr/tenant/queryMessageList',
					method: 'post',
					data:{
						uid:this.uid,
						tenantId:this.tenantId,
						messageType:1,
					}
				});
				if(res.code==0){
					this.list1=res.data.tenantMessage;
					this.tabBar[0].text=res.data.requestCount;
				}
				let res2 = await this.util.request({
					url: '/etenantsvr/tenant/queryMessageList',
					method: 'post',
					data:{
						uid:this.uid,
						tenantId:this.tenantId,
						messageType:2,
					}
				});
				if(res2.code==0){
					this.list2=res2.data.tenantMessage
					this.tabBar[1].text=res2.data.requestCount;
				}
			},
			clickTab(e) {
				this.currentTab = e;
			},
			changeTab(e) {
				this.currentTab = e.mp.detail.current;
			},
			// 驳回
			dont_agree(id){
				// 请求id
				this.messageId=id;
				this.shixian = true;
			},
			agree(time,requestType,id){
				let that=this;
				uni.showModal({
					content: `确定更改退租日期为${time}`,
					success: function (res) {
						if (res.confirm) {
							that.agreeReject(time,requestType,id);
						} else if (res.cancel) {
							
						}
					}
				});
			},
			// 同意驳回退租或租续
			async agreeReject(time,requestType,id){
				var url='';
				if(requestType==1){
					this.title="你的到租日期已变更为";
					url='/etenantsvr/tenant/agreeSurrenderTime';
				}
				if(requestType==2){
					this.title="你的续租日期已变更为";
					url='/etenantsvr/tenant/agreeReletTime';
				}
				let res = await this.util.request({
					url: url,
					method: 'post',
					data:{
						messageId:id,
						tenantId:this.tenantId,
						uid:this.uid,
						tenancyNum:this.tenancyNum,
					}
				});
				if(res.code==0){
					this.time=time;
					this.type = 'bottom-share';
				}
				console.log(JSON.stringify(res))
			},
			async tenantreply(time,type,id){
				if(type==1){
					this.title="你的到租日期已变更为";
					var data={
								tenant:this.$store.state.obj.tenant,
								uid:this.uid,
								tenancyNum:this.tenancyNum,
								tenantId:this.tenantId,
								messageId:id,
							};
				}else{
					var data={
								tenant:this.$store.state.obj.tenant,
								uid:this.uid,
								tenancyNum:this.tenancyNum,
								tenantId:this.tenantId,
								surrenderTime:time,
								messageId:this.messageId,
							};
				}
				let res = await this.util.request({
					url: '/etenantsvr/tenant/tenantReplySurrender',
					method: 'post',
					data:data
				});
				if(res.code==0){
					if(type==1){
						this.hidePopup('bottom-share',time);
					}else{
						uni.showToast({
							title: "已发至房东"
						})
					}
					this.loading();
				}
				console.log(JSON.stringify(res))
			},
			// 模态框弹出
			hidePopup(type,time) {
				if(time){
					this.time=time.split('。')[0].substr(5);
				}
				this.type = type;
			},
			// 跳转首页
			gohome(){
				this.type = '';
				setTimeout(function(){
					uni.navigateBack({
						delta: 4
					});
				},500)
			},
			//取消选择，返回默认状态
			quxiaobutton : function () {
					this.shixian = false;
			},
			//确定日期
			quedingbutton : function(bangdingyear,bangdingmonth,bangdingday){
				this.shixian = false;
				this.inputValue = bangdingyear + "-" + bangdingmonth + "-" + bangdingday;
				this.tenantreply(this.inputValue,2);
			},
			//获取当天日期作为选择日期里的默认日期
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}else if(type === 'now') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
			
				return `${year}-${month}-${day}`;
			},
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
	.list>li{
		padding: 40upx;
	}
	.list span{
		color: #C7C7C7;
	}
	.list span.time{
		color: #09B8B5;
	}
	.list li{
		font-size: 32upx;
	}
	.content li{
		padding:0 30upx;
		line-height: 60upx;
	}
	.footer span{
		display: inline-block;
		width: 49%;
		text-align: center;
		border-top:1px solid #ddd;
		padding: 20upx 0;
	}
	.footer span:first-child{
		border-right: 1px solid #ddd;
		color: #09B8B5;
	}
	.describe{
		font-size: 32upx;
		color: #777;
		padding-left: 20upx;
	}
	.uni-card:after{
		border:none;
	}
	.describe>p{
		line-height: 80upx;
		margin-bottom: 30upx;
	}
	.describe span.footer_right{
		padding-top: 16upx;
		border-top: 1px solid #eee;
		display: inline-block;
		width: 100%;
		text-align: right;
		font-size: 28upx;
	}
	.describe_btn{
		background-color: #fff;
		border:1px solid #09B8B5;
		color: #09B8B5;
		border-radius: 10upx;
		float: right;
		margin-top: 10upx;
		margin-bottom: 10upx;
	}
	.bottom-title{
		padding-top: 40upx;
	}
	.bottom-btn button{
		background: #FFF;
		border:1px solid #09B8B5;
		color:#09B8B5 ;
	}
	.bottom-btn button:first-child{
		margin-right: 40upx;
	}
	.bottom-btn button:last-child{
		margin-left: 40upx;
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
</style>
