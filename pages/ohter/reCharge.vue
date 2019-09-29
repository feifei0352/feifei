<template>
	<view class="withdraw-contain">
		<view style=" margin-top:53upx;">
			<view class="withdraw-title">充值余额</view>
			<view class="widthdraw-input">
				<text>￥</text>
				<input @change="check" type="number" v-model="money" />
			</view>
		</view>
		<view class="withdraw-submit"><button @click="charge" type="primary" formType="submit" :style="{background:submit_readonly,opacity:opacity}">充值</button></view>
		<view>
			<uni-popup :show="type === 'payment'" position="bottom" @hidePopup="select_payment('')">
				<view class="middle-title">
					确定充值金额
					<uni-icon type="closeempty" color="#BBBBBB" size="30" @click="select_payment('')"></uni-icon>
				</view>
				<view class="amount">￥{{money}}</view>
				<view class="content">
					<view class="chooseWay">选择充值方式</view>
					<radio-group @change="radioChange">
						<ul class="select_payment">
							<li>
								<image src="../../static/other/alipay.png" mode="widthFix"></image>
								<span>支付宝</span>
								<radio class="radio" value="2" color="#09B8B5" checked="checked"/>
							</li>
							<!-- <li>
								<image src="../../static/other/wx_icon.png" mode="widthFix"></image>
								<span>微信</span>
								<radio class="radio" value="3" color="#09B8B5" />
							</li> -->
						</ul>
					</radio-group>
					<button class="reCharge-charge" @click="recharge">立即充值</button>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniIcon from '../../components/uni-icon/uni-icon.vue'
import CryptoJS from '@/common/crypto-js.js';
//秘钥
const CRYPTOJSKEY = 'abcdefgabcdefg12';
export default {
	components: {
		uniPopup,
		uniIcon
	},
	data() {
		return {
			usermessage: {},
			isCard: true,
			type: '',
			money:'',
			submit_readonly:'#2CC3BE',
			paymentType:'2',
			opacity:0.3,
		};
	},
	methods: {
		onLoad(options) {
			if (options.type == 0) {
				this.isCard = true;
				this.usermessage = {
					title: '银行卡提现',
					account: '工商银行'
				};
			} else {
				this.isCard = false;
				this.usermessage = {
					title: '支付宝提现',
					account: '186***7889'
				};
			}
		},
		charge(){
			if(this.money<=0){
				uni.showToast({
					title: '充值金额必须大于0',
					duration: 2000,
					icon:'none'
				});
				return false;
			}
			this.type="payment"
		},
		selectCard() {},
		select_payment(payment) {
			this.type = payment;
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
		async recharge(){
			if(this.paymentType==2){
				let res = await this.util.request({
					url: '/lianjiaaccount/appPay/pay',
					method: 'post',
					data:{
						rememberToken:this.$store.state.obj.rememberToken,//'AVF6oIciutQ6CwmHACFNnrY92D04XkHYGNvvW7eR1un3qaaqdb',
						encryptedChecksum:null,//rsa(SHA512(SHA512(password)+salt))
						cipherText:this.encrypt(JSON.stringify({amount:this.money,type:6,orderCode:this.$store.state.obj.userId,userId:this.$store.state.obj.userId,title:'余额充值'})),
						//'ioDvFmhUakSyS+Fo+AaivxzcF/eyCfo2J5GWEoSMTvg8cStYcf81Sr/dn9aoH0GG',
						//{amount:this.money,type:6,orderCode:$store.state.obj.userId,userId:$store.state.obj.userId,title:'余额充值'}
					}
				});
				if(res.code!=0){
					return false;
				}
				console.log(JSON.stringify(res.data.obj))
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: res.data.obj, //微信、支付宝订单数据
					success: function (res) {
						console.log('success:' + JSON.stringify(res));
						setTimeout(function(){
							uni.navigateBack({
								delta: 1
							});
						},500)
					},
					fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
						uni.showToast({
							title: err.errMsg,
							duration: 2000,
							icon:'none'
						});
					}
				});
			}else{
				uni.showToast({
					title: '请选择充值方式',
					duration: 2000,
					icon:'none',
				});
			}
		},
		check(event){
			this.money=this.money.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
		}
	},
	watch:{
		money(value){
			if(value!=''){
				this.submit_readonly='#11D6D3';
				this.opacity=1;
			}else{
				this.submit_readonly='#2CC3BE';
				this.opacity=0.3;
			}
		}
	}
};
</script>

<style>
.withdraw-title {
	font-size: 28upx;
	margin: 0 36upx;
}
.widthdraw-input {
	height: 150upx;
	margin: 36upx 36upx 54upx 36upx;
	border-bottom:1upx solid #CED1D6;
}
.widthdraw-input>text{
	font-size:68upx;
	font-weight:600;
	height:150upx;
	line-height: 150upx;
	vertical-align: middle;
}
.widthdraw-input > input {
	width:80%;
	display:inline-block;
	height: 100upx;
	line-height: 100upx;
	vertical-align: middle;
	font-size: 80upx;
}
.withdraw-account {
	height: 100upx;
}
.withdraw-submit {
	margin-top: 65upx;
}
.withdraw-submit > button {
	width: 678upx;
	height: 88upx;
	background: #2CC3BE;
	opacity: 0.5;
	border-radius: 4upx;
}

.middle-title {
	height: 80upx;
	width: 100%;
	line-height: 80upx;
	text-align: center;
}
.middle-btn > button {
	background-color: #11d6d3;
	color: #fff;
	width: 460upx;
}
.middle-title > uni-icon {
	float: left;
	margin-top: 10upx;
	margin-left: 20upx;
}
.middle-title > span {
	float: right;
	color: #09b8b5;
	font-size: 32upx;
	margin-right: 40upx;
}
.amount{
	font-size:72upx;
	font-weight:bold;
}
.select_payment li {
	width: 90%;
	margin: 0 auto;
	border-bottom: 1px solid #ddd;
	text-align: left;
	padding: 10upx 0;
}
.select_payment li:first-child {
	padding-bottom: 0;
	border-top:1px solid #ddd;
}
.select_payment li image {
	width: 80upx;
	float: left;
	margin-top: 10upx;
}
.select_payment li span {
	display: inline-block;
	margin-left: 30upx;
	line-height: 80upx;
}
.select_payment li .radio {
	float: right;
}
.select_payment li span p {
	height: 0;
	font-size: 28upx;
	color: #999999;
}
.reCharge-charge{
	background-color: #11d6d3;
	color: #fff;
	width: 678upx;
	height:88upx;
	line-height: 88upx;
	margin:46upx auto;
}
.chooseWay{
	text-align:left;
	margin-left:30upx;
	color:#999;
}
</style>
