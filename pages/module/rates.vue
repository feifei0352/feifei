 <template>
	<view class="uni-padding-wrap uni-common-mt">
		<view v-if="list.rentingFeeDto.deposit">
			<view class="top">
				<view>
					<p>月租金（元）</p>
					<span>{{list.rentingFeeDto.fixedCosts}}</span>
				</view>
				<view>
					<p>支付方式</p>
					<span style="font-size: 32upx;">{{list.rentingFeeDto.paymentType}}</span>
				</view>
			</view>
			<view class="deposit">
				<view>
					押金 <span>￥{{list.rentingFeeDto.deposit}}</span>
				</view>
				<view>
					<button v-if="list.rentingFeeDto.isDeposit==0" size="mini" @click="select_payment('payment',list.rentingFeeDto.deposit,8)">交押金</button>
					<span v-else class="status">
						{{list.rentingFeeDto.isDeposit==1?'已缴纳':'已退还'}}
					</span>
				</view>
			</view>
			<view class="rent">
				<view class="rent_top">
					<span>租金</span>
					<span @click="explain('explain')"><uni-icon type="help" color="#BBBBBB" size="20"></uni-icon>交租说明</span>
				</view>
				<ul class="list">
					<li v-for="(item,index) in list.rentPlanList" :key="index">
						<view class="topleft"></view>
						<span class="topleft_span">{{index+1}}期</span>
						<view class="center">
							<span>￥{{item.amount}}</span>
							<p>交租截止日期{{item.payMentTime}}</p>
						</view>
						<button v-if="item.isArrival==0" size="mini" @click="select_payment('payment',item.amount,9,item.payMentTime)">交租</button>
						<button v-else size="mini" style="border-color:#fff;color:#12CDDE;background-color: #fff;">已缴纳</button>
					</li>
				</ul>
			</view>
			<uni-popup :show="type === 'explain'" position="middle" mode="fixed" @hidePopup="explain('')">
				<view class="middle-title" style="margin-top: -10px;">
					交租说明
				</view>
				<view class="middle-content">
					1.交租金前需先交押金。
					<br>
					2.分期交租，每期租金可在交租截止日期前进行提前缴纳，但在前一期租金未交情况下，不可先交后一期租金。
					<br>
					3.交租截止日期后3天以内交租，视作延迟补交，依然可正常缴纳，但信用度会受到一定的影响。交租截止日期后3-7天交租，视作延迟补交，依然可正常缴纳，但需额外支付滞纳金（30元/天计）。
					<br>
					4.超过交租截止日期7天后仍未交租，视作违约，强制终止租房合同且押金不予退还。
					<br>
					5.交押金或租金时，从账户余额、支付宝、微信支付3种支付方式中任选其一，支付成功后可查看账单进行确认。
				</view>
				<view class="middle-btn">
					<button type="default" @click="explain('')">ok，我知道了</button>
				</view>
			</uni-popup>
			<uni-popup :show="type2 === 'payment'" position="bottom" @hidePopup="select_payment('')">
				<view class="middle-title">
					<uni-icon type="closeempty" color="#BBBBBB" size="30" @click="select_payment('')"></uni-icon>
					选择付款方式
					<span @click="payment()">确定</span>
				</view>
				<view class="content">
					<radio-group @change="radioChange">
					<ul class="select_payment">
						<li>
							<image src="../../static/other/zhye_icon.png" mode="widthFix"></image>
							<span style="line-height:50upx;">
								账户余额
								<a style="font-size: 28upx;color: #999;">账户余额{{balance}}元</a>
							</span>
							<radio class="radio" value="1" color="#09B8B5"/>
						</li>
						<li>
							<image src="../../static/other/alipay.png" mode="widthFix"></image>
							<span>
								支付宝
							</span>
							<radio class="radio" value="2" color="#09B8B5"/>
						</li>
						<!-- <li>
							<image src="../../static/other/wx_icon.png" mode="widthFix"></image>
							<span>
								微信
							</span>
							<radio class="radio" value="3" color="#09B8B5"/>
						</li> -->
					</ul>
					</radio-group>
				</view>
			</uni-popup>
		</view>
		<view class="none" v-else>
			<view>
				<image src="../../static/other/renants_noinfo.png"></image>
			</view>
			<view>房东暂无设置租费</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import CryptoJS from '@/common/crypto-js.js';
	//秘钥
	const CRYPTOJSKEY = 'abcdefgabcdefg12';
	export default {
		components: {
			uniIcon,
			uniPopup,
		},
		data() {
			return {
				type:'',
				type2:'',
				list:'',
				paymentType:'',
				balance:0,
				amount:0,
				type3:'',
				payMentTime:'',
				tenancyNum:'',
			}
		},
		methods: {
			onLoad(option) { //option为object类型，会序列化上个页面传递的参数
				this.tenancyNum=option.tenancyNum;//房东id
				this.loading();
			},
			// 租费信息
			async loading(){
				uni.showLoading();
				let res = await this.util.request({
					url: '/etenantsvr/tenant/queryRentingFeeDetail',
					method: 'post',
					data:{
						// tenantId:'1077',
						// tenancyNum:'TN2019070416174523444',
						tenantId:this.$store.state.obj.id,
						tenancyNum:this.tenancyNum,//'TN2019062613530267457',
						uid:this.$store.state.obj.userId,
					}
				});
				if(res.code==0){
					this.list=res.data;
				}
			},
			onNavigationBarButtonTap(){
				uni.navigateTo({
					url: `bill`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			explain(explain){
				this.type=explain;
			},
			async select_payment(payment,amount,type,payMentTime){
				this.type2=payment;
				this.amount=amount;
				this.type3=type;
				this.payMentTime=payMentTime;
				// 获取余额
				let res = await this.util.request({
					url: '/etenantsvr/myModule/queryAccountBalance',
					method: 'post',
					data:{
						identityCardNo:this.$store.state.obj.identityNumber,
					}
				});
				if(res.code==0){
					this.balance=res.data.obj.balance;
				}
			},
			radioChange(evt){
				this.paymentType=evt.target.value;
			},
			//加密
			encrypt(plaintText) {
				var plaintText = plaintText;
				var options = {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				};
				var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
				var encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
				var encryptedBase64Str = encryptedData.toString();//.replace(/\//g, '_');
				// encryptedBase64Str = encryptedBase64Str.replace(/\+/g, '-');
				return encryptedBase64Str;
			},
			async payment(){
				if(this.paymentType==1){
					if(this.amount>this.balance){
						uni.showToast({
							title: '余额不够，请充值',
							duration: 2000,
							icon:'none'
						});
					}else{
						uni.showLoading();
						let res = await this.util.request({
							url: '/lianjiaaccount/appPay/insertAccountBalancePaymentFee',
							method: 'post',
							data:{
								rememberToken:this.$store.state.obj.rememberToken,//'AVF6oIciutQ6CwmHACFNnrY92D04XkHYGNvvW7eR1un3qaaqdb',
								encryptedChecksum:null,
								cipherText:this.encrypt(JSON.stringify({amount:this.amount,type:this.type3,userId:this.$store.state.obj.userId,payMentTime:this.payMentTime})),//'ioDvFmhUakSyS+Fo+Aaiv0s85M5lgr+ZJCoWSxQroPPANte+BVJM4ZsciXqkDNVz',
								//{amount:this.amount,type:this.type3,uid:$store.state.obj.userId}
							}
						});
						if(res.code==0){
							setTimeout(function(){
								uni.showToast({
									title: '支付成功',
									duration: 2000,
								});
							},500)
							this.loading();
							this.select_payment('');
						}
					}
				}else if(this.paymentType==2){
					uni.showLoading();
					let res = await this.util.request({
						url: '/lianjiaaccount/appPay/pay',
						method: 'post',
						data:{
							rememberToken:this.$store.state.obj.rememberToken,//'AVF6oIciutQ6CwmHACFNnrY92D04XkHYGNvvW7eR1un3qaaqdb'
							encryptedChecksum:null,
							cipherText:this.encrypt(JSON.stringify({amount:this.amount,type:this.type3,orderCode:this.$store.state.obj.userId,userId:this.$store.state.obj.userId,payMentTime:this.payMentTime,title:this.type3==8?'支付押金':'支付租金'})),
							//'ioDvFmhUakSyS+Fo+AaivxzcF/eyCfo2J5GWEoSMTvh/8J2jtUl0GxDpsDOMwXwzeT/roSDyMsHtCgkek2YM4Q0DBXWhKuPqTMUnBhcNkAY=',
							//{amount:this.amount,type:this.type3,orderCode:$store.state.obj.userId,userId:$store.state.obj.userId,title:this.type3==8?'支付押金':'支付租金'}
						}
					});
					let that=this;
					uni.requestPayment({
						provider: 'alipay',
						orderInfo: res.data.obj, //微信、支付宝订单数据
						success: function (res) {
							// console.log('success:' + JSON.stringify(res));
							that.loading();
							that.paymentType='';
							that.type2='';
						},
						fail: function (err) {
							that.loading();
							that.paymentType='';
							that.type2='';
						}
					});
				}else{
					uni.showToast({
						title: '请选择支付方式',
						duration: 2000,
						icon:'none',
					});
				}
			}
		}
	}
</script>

<style>
	.uni-padding-wrap{
		background-color: #F5F5F5;
		height: 100%;
	}
	.top{
		height: 240upx;
		width: 100%;
		background-color: #2CC3BE;
		display: flex;
		flex-direction: row;
	}
	.top>view{
		width: 49%;
		height: 100upx;
		margin: auto 0;
		color: #fff;
		text-align: center;
	}
	.top>view>p{
		font-size: 28upx;
		color: #77EDEB;
	}
	.top>view>span{
		line-height: 100upx;
		font-size: 46upx;
		font-weight: bold;
	}
	.top>view:first-child{
		border-right:1px solid #6CD9D7;
	}
	.deposit{
		display: flex;
		flex-direction: row;
		background: #fff;
	}
	.deposit>view{
		background: #fff;
		height: 180upx;
		line-height: 180upx;
		padding-left:40upx;
	}
	.deposit>view:first-child{
		width: 60%;
	}
	.deposit>view>span{
		color: #F69D1F;
		margin-left: 20upx;
	}
	.deposit>view>button{
		color: #11D6D3;
		background-color: #fff;
		border:1px solid #11D6D3;
		border-radius: 5upx;
		padding: 6upx 40upx;
		margin-top: 50upx;
	}
	.deposit>view>span.status{
		color: #11D6D3;
		padding: 6upx 40upx;
		margin-top: 50upx;
		font-size: 32upx;
	}
	.rent{
		padding: 60upx 40upx;
	}
	.rent_top>span:last-child{
		color: #BBBBBB;
		float: right;
	}
	.list li{
		margin-top: 30upx;
		height: 200upx;
		background: #fff;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items:center;
	}
	.topleft {
		width: 0;
		height: 0;
		border-top: 100upx solid #F5D77F;
		border-right: 100upx solid transparent;
		position: absolute;
		left: 0;
		top: 0;
	}
	.topleft_span{
		position: absolute;
		left: 10upx;
		top: 10upx;
		color: #fff;
		font-size: 28upx;
	}
	.center{
		margin-left: 90upx;
	}
	.list li button{
		float: right;
		background-color: #12CDDE;
		padding: 6upx 30upx;
		color: #fff;
		margin-right: 20upx;
	}
	.list li view{
		height: 100upx;
	}
	.list li view>span{
		font-size: 50upx;
		font-weight: bold;
		color: #333333;
	}
	.list li view>p{
		color: #333;
		font-size: 28upx;
	}
	.middle-content{
		width: 500upx;
		/* height: 500upx; */
		overflow-y: auto;
		font-size: 32upx;
		padding: 20upx 0;
	}
	.middle-title{
		height: 80upx;
		width: 100%;
		line-height: 80upx;
		border-bottom: 1px solid #ddd;
		text-align: center;
	}
	.middle-btn>button{
		background-color: #11D6D3;
		color: #fff;
		width: 460upx;
	}
	.middle-title>uni-icon{
		float: left;
		margin-top: 10upx;
		margin-left: 20upx;
	}
	.middle-title>span{
		float: right;
		color: #09B8B5;
		font-size: 32upx;
		margin-right: 40upx;
	}
	.select_payment li{
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px solid #ddd;
		text-align: left;
		padding:10upx 0;
	}
	.select_payment li:first-child{
		padding-bottom:0;
	}
	.select_payment li image{
		width: 80upx;
		float: left;
		margin-top: 10upx;
	}
	.select_payment li span{
		display: inline-block;
		margin-left: 30upx;
		line-height: 80upx;
	}
	.select_payment li .radio{
		float: right;
	}
	.select_payment li span p{
		height: 0;
		font-size: 28upx;
		color: #999999;
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
