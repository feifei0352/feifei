<template>
	<view class="">
		<view class="input-alipay">
			<view class="input-item">
				<view class="input-label" style="width: 400upx;">提现金额</view>
				<view class="input-body"><input style="width: 400upx;" v-model="money" maxlength="10" type="number" placeholder=" " @change="check()" class="input input-money" /></view>
				<view class="input-label">元</view>
			</view>
			<view class="input-item">
				<view class="input-label">姓名</view>
				<view class="input-body"><input v-model="name" maxlength="8" placeholder="提现人姓名（支付宝认证实名）" class="input" /></view>
			</view>
			<view class="input-item">
				<view class="input-label">支付宝</view>
				<view class="input-body"><input v-model="phone" style="margin-right: 160upx;" placeholder="支付宝账号（注册手机号或邮箱号）" class="input" /></view>
			</view>
		</view>
		<view class="alipay-p"><p>支付宝账号或姓名输入错误将无法提现到账</p></view>
		<view class="alipay-sure"><button type="primary" @click="submit()" :style="{background:btn_color,opacity:opacity}">确认提现</button></view>
		<view class="alipay-tips">
			<p>温馨提示：</p>
			<p>1.使用支付宝提现需要您已经注册支付宝并在支付宝中实名认证过。</p>
			<p>2.支付宝账号是您注册支付宝的手机号或者邮箱号</p>
			<p>3.我们不会保存您的姓名和支付宝账号，每次提现都需要您重新输入相关信息。</p>
			<!-- <p>4.如您在提现中遇到其他问题，请在“我的”页面进入“意见与反馈”入口，把相关问题反馈给我们。</p> -->
		</view>
	</view>
</template>

<script>
import CryptoJS from '@/common/crypto-js.js';
//秘钥
const CRYPTOJSKEY = 'abcdefgabcdefg12';
export default {
	data() {
		return {
			money:'',
			name:'',
			phone:'',
			balance:0,
			btn_color:'#099C99',
			opacity:0.3,
			
		};
	},
	methods: {
		onLoad(options){
			this.balance=options.balance;
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
		async submit(){
			if(!this.money){
				uni.showToast({
					title: '请输入提现金额',
					duration: 2000,
					icon:'none'
				});
				return false;
			}
			if(this.money<=0){
				uni.showToast({
					title: '提现金额必须大于0',
					duration: 2000,
					icon:'none',
				});
				return false;
			}
			if(this.money>this.balance){
				uni.showToast({
					title: '提现金额不能大于余额',
					duration: 2000,
					icon:'none',
				});
				return false;
			}
			var username = /^([\u4e00-\u9fa5]){2,7}$/;
		    if(!username.test(this.name)){
		        uni.showToast({
					title: '姓名格式错误',
					duration: 2000,
					icon:'none'
				});
				return false;
		    }
			if(!this.phone){
				uni.showToast({
					title: '请输入支付宝账号',
					duration: 2000,
					icon:'none'
				});
				return false;
			}
			let res = await this.util.request({
				url: '/lianjiaaccount/appPay/withdraw',
				method: 'post',
				data:{
					rememberToken:this.$store.state.obj.rememberToken,//'AVF6oIciutQ6CwmHACFNnrY92D04XkHYGNvvW7eR1un3qaaqdb',
					encryptedChecksum:null,//rsa(SHA512(SHA512(password)+salt))
					cipherText:this.encrypt(JSON.stringify({amount:this.money,type:7,operationLogId:-1,orderCode:this.$store.state.obj.userId,userId:this.$store.state.obj.userId,payeeAccount:this.phone,payeeRealName:this.name})),
					//'ioDvFmhUakSyS+Fo+AaivxzcF/eyCfo2J5GWEoSMTvg8cStYcf81Sr/dn9aoH0GG',
				},
			});
			if(res.code==0){
				uni.showToast({
					title: '提现成功',
					duration: 2000
				});
				setTimeout(function(){
					uni.navigateBack({
						delta: 1
					});
				},500)
			}
		},
		check(){
			this.money=this.money.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
		}
	},
	watch:{
		money(value){
			if(value!=''){
				this.btn_color='#11D6D3';
				this.opacity=1;
			}else{
				this.btn_color='#099C99';
				this.opacity=0.3;
			}
		},
		name(value){
			if(value!=''){
				this.btn_color='#11D6D3';
				this.opacity=1;
			}else{
				this.btn_color='#099C99';
				this.opacity=0.3;
			}
		},
		phone(value){
			if(value!=''){
				this.btn_color='#11D6D3';
				this.opacity=1;
			}else{
				this.btn_color='#099C99';
				this.opacity=0.3;
			}
		}
	}
};
</script>

<style lang="scss">
.input-alipay {
	width: 100%;
	margin-top: 5%;
	.input-item {
		display: flex;
		background: white;
		border-bottom: 1upx solid #eeeeee;
		line-height: 100upx;
		height: 100upx;
		.input-label {
			width: 186upx;
			font-size: 32upx;
			margin-left: 5%;
		}
		.input-body {
			position: relative;
			height: 100upx;
			width:100%;
			.input {
				line-height: 100upx;
				height: 100upx;
				position: relative;
				font-size: 28upx;
				width: 430upx;
			}
			.btn-code {
				position: absolute;
				right: 0upx;
				top: 50%;
				transform: translateY(-50%);
				background: none;
				color: #205592;
				width: 160upx;
				font-size: 24upx;
				box-sizing: border-box;
				text-align: right;
				padding: 0;
				height: 100upx;
				line-height: 100upx;
			}
		}
	}
}
.input-money {
	text-align: right;
}
.alipay-sure{
	width: 90%;
	margin-left: 5%;
	background:#11D6D3;
	opacity:0.5;
	border-radius:4px;
}
.alipay-p {
	display: inline-block;
	margin-left: 5%;
	margin-bottom: 10%;

	p {
		width: 600upx;
		height: 23upx;
		font-size: 24upx;
		font-weight: 500;
		color: rgba(231, 89, 70, 1);
		line-height: 30upx;
	}
}
.alipay-tips {
	width: 667upx;
	height: 510upx;
	margin: 0 auto;
	margin-top: 10%;
	p {
		margin-bottom: 5%;
		font-size: 30upx;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: #999999;
		line-height: 40upx;
	}
}
.button {
	margin: 0 100upx;
	line-height: 102upx;
	height: 80upx;
	color: white;
	font-size: 32upx;
	width: 550upx;
	height: 102upx;
	background: #11D6D3;
	opacity: 0.3;
	border-radius: 51upx;
}
button::after {
	border: none;
}
</style>
