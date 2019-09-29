<template>
	<view>
		<view class="login-logo">
			<image class="logo" src="../../static/other/loginpage_bg.png"></image>
		</view>
		<view class="input-box">
			<!-- <view class="input-item">
				<view class="input-body"><input v-model="idcard" maxlength="18" type="text" placeholder="请输入身份证号" class="input" /></view>
			</view> -->
			<view class="input-item">
				<view class="input-body">
					<input v-model="phone" maxlength="11" type="number" style="margin-right: 160upx;" placeholder="请输入手机号" class="input" />
				</view>
			</view>
			<view class="input-item" v-if="isPassword">
				<view class="input-body" style="width:100% ">
					<input v-model="password" maxlength="20" type="password" style="margin-right:0;" placeholder="请输入8-16位含数字和字母的密码" class="input" />
					<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
				</view>
			</view>
			<view class="input-item" v-else>
				<view class="input-body">
					<input placeholder="请输入验证码" type="number" v-model="code" maxlength="6" class="input" />
					<button :disabled="!isCanSendCode" class="btn-code" @click="sendCode" size="mini">{{ sendMsg }}</button>
				</view>
			</view>
		</view>
		<button class="button" :style="{background:btn_color,opacity:opacity}" @click="submit">登录</button>
		<view class="input-box">
			<view class="select" :style="{justifyContent:isPassword?'space-between':'center'}">
				<span  v-show="isPassword" @click="forgetPassword">忘记密码？</span>
				<span  @click="changeStyle()">{{isPassword?'切换至验证码登录':'切换至账户密码登录'}}</span>
			</view>
		</view>
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
		    <view class="oauth-image" v-for="provider in providerList" :key="provider.value">
		        <image :src="provider.image" @tap="oauth(provider.value)"></image>
		    </view>
		</view>
		<view style="text-align: center;margin-top: 40upx;font-size: 28upx;">
			点击登录即表示同意<span style="color: #0DBFBC;" @click="agreement">《E租客用户协议》</span>
		</view>
	</view>
</template>
<script>
	import {
		checkPhone,
		checkCode,
		checkIdCard
	} from '@/common/common.js';

	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex';

	import CryptoJS from '@/common/crypto-js.js';
	//秘钥
	const CRYPTOJSKEY = 'abcdefgabcdefg12';
	// 加密

	export default {
		data() {
			return {
				isPassword:false,
				btn_color:'#099C99',
				opacity:0.3,
				providerList:[],
				positionTop: 0,
				hasProvider: false,
				phone: '',//'17855842166',//18857220352',//'15808061346',
				// idcard: '',//'339684666876134976',//330481199703075218',//'330781199010101726',
				sendMsg: '发送验证码',
				password:'',
				isCanSendCode: true,
				// isHidePassword:true,
				code: '',
				obj: {
					createTime: 1561521431000,
					deleteFlag: '1',
					deposit: 1000,
					endDate: 1561478400000,
					houseId: 350,
					id: 1025,
					idCardPhoto: '',
					identityNumber: '412326199500000000',
					remark: '',
					startDate: 1561564800000,
					tenant: '王旭',
					tenantPhone: '13673843277',
					userId: 2911,
					rememberToken:'AVF6oIciutQ6CwmHACFNnrY92D04XkHYGNvvW7eR1un3qaaqdb',
				}
			};
		},
		onReady() {
		    this.initPosition();
		    this.initProvider();
		},
		methods: {
			//解密
			decrypt(encryptedBase64Str) {
				var vals = encryptedBase64Str.replace(/\-/g, '+').replace(/_/g, '/');
				var options = {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				};
				var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
				var decryptedData = CryptoJS.AES.decrypt(vals, key, options);
				var decryptedStr = CryptoJS.enc.Utf8.stringify(decryptedData);
				return decryptedStr;
			},
			encrypt(plaintText) {
				var plaintText = plaintText;
				var options = {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				};
				var key = CryptoJS.enc.Utf8.parse('CRYPTOJSKEY');
				var encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
				var encryptedBase64Str = encryptedData.toString();//.replace(/\//g, '_');
				// encryptedBase64Str = encryptedBase64Str.replace(/\+/g, '-');
				return encryptedBase64Str;
			},
			initProvider() {
			    const filters = ['weixin', 'qq', 'sinaweibo'];
			    uni.getProvider({
			        service: 'oauth',
			        success: (res) => {
			            if (res.provider && res.provider.length) {
			                for (let i = 0; i < res.provider.length; i++) {
			                    if (~filters.indexOf(res.provider[i])) {
			                        this.providerList.push({
			                            value: res.provider[i],
			                            image: '../../static/other/' + res.provider[i] + '.png'
			                        });
			                    }
			                }
			                this.hasProvider = true;
			            }
			        },
			        fail: (err) => {
			            console.error('获取服务供应商失败：' + JSON.stringify(err));
			        }
			    });
			},
			initPosition() {
			    /**
			     * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			     * 反向使用 top 进行定位，可以避免此问题。
			     */
			    this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			//第三方登录
			oauth(value) {
			    uni.login({
			        provider: value,
			        success: (res) => {
						uni.navigateTo({
						  url: 'bindPhone'
						});
			        },
			        fail: (err) => {
			            console.error('授权登录失败：' + JSON.stringify(err));
			        }
			    });
			},
			setCodeInterval() {
				//设置验证码重新发送定时器
				let time = 60;
				clearInterval(timer);
				timer = setInterval(() => {
					time--;
					this.isCanSendCode = false;
					this.sendMsg = time + 's';
					if (time <= 0) {
						this.isCanSendCode = true;
						this.sendMsg = '重新获取';
						clearInterval(timer);
					}
				}, 1000);
			},
			clearCodeInterval() {
				clearInterval(timer);
				this.codemsg = '获取验证码';
			},
			//切换登录方式
			changeStyle(){
				if(this.isPassword==true){
					this.isPassword=false;
				}else{
					this.isPassword=true;
				}
			},
			async sendCode() {
				//发送验证码
				if (!checkPhone(this.phone)) {
					return;
				}
				/*
				 * 发送验证码逻辑
				 */
				if(this.sendMsg=='发送验证码'||this.sendMsg=='重新获取'){
				}else{
					return false;
				}
				let res = await this.util.request({
					url: '/lianjiauser/getcode',
					method: 'post',
					data: {
						phone:this.phone,
						phoneMd:CryptoJS.MD5(this.phone+"hjhdf423retSDJH32sdf").toString(),//'027e86ee6fee02389cb191abdc6b5875',
					}
				});
				if(res.code==0){
					var s=60;
					this.sendMsg=s+'秒';
					let that=this;
					var int=setInterval(function(){
						if(s<=0){
							console.log(1)
							that.sendMsg='重新获取';
							setTimeout(function(){
								clearInterval(int);
							})
						}else{
							that.sendMsg=s+'秒';
							s--;
						}
					},1000)
				}
			},
			async submit() {
// 				if (!checkIdCard(this.idcard)) {
// 					return;
// 				}
// 				if (!checkPhone(this.phone)) {
// 					return;
// 				}
// 
// 				if (!checkCode(this.code)) {
// 					return;
// 				}
// 				uni.showLoading();
// 				var that = this;
// 				let res = await this.util.request({
// 					url: '/lianjiauser/user/codeLogin',
// 					method: 'post',
// 					data: {
// 						secretStr: 'abcdefgabcdefg12',
// 						identityNumber: this.idcard,
// 						phone: this.phone,
// 						code: this.code,
// 						// cipherText:this.encrypt(JSON.stringify({secretStr: 'abcdefgabcdefg12',identityNumber:this.idcard,phone: this.phone,code: this.code}))
// 					}
// 				});
// 				if(res.code==0){
// 					console.log(res.data.obj);
// 					that.obj = JSON.parse(that.decrypt(res.data.obj))
// 					// this.$store.commit('update', ['isLogin', true, '1', '2', '3']);
// 					// this.$store.commit('login', this.obj);
// 					uni.setStorage({
// 						key: 'login_info',
// 						data: this.obj,
// 						success: function() {
// 							uni.showToast({
// 								title: '登录成功！',
// 								duration: 2000,
// 							});
// 						}
// 					});
// 					uni.setStorage({
// 						key: 'launchFlag',
// 						data: true
// 					});
// 					uni.reLaunch({
// 						url: '/pages/index/index'
// 					});
// 				}
				uni.setStorage({
					key: 'login_info',
					data: this.obj,
					success: function() {
						uni.showToast({
							title: '登录成功！',
							duration: 2000,
						});
					}
				});
				uni.setStorage({
					key: 'launchFlag',
					data: true
				});
			},
			agreement(){
				uni.navigateTo({
				  url: 'agreement'
				});
			}
		},
		watch:{
			phone(value){
				if(value!=''){
					this.btn_color='#11D6D3';
					this.opacity=1;
				}else{
					this.btn_color='#099C99';
					this.opacity=0.3;
				}
			},
			code(value){
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
<style>
	body {
		background-color: #ffffff;
	}
	.input-box{
		width: 80%;
		margin: 0 auto;
	}
	button.btn-code{
		border:1px solid #11D6D3;
		color: #11D6D3;
		float: right;
		width: 200upx;
	}
	.oauth-row {
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	}
	
	.oauth-image {
	    width: 100upx;
	    height: 100upx;
	    /* border: 1upx solid #dddddd; */
	    border-radius: 100upx;
	    margin: 0 40upx;
	    background-color: #ffffff;
	}
	
	.oauth-image image {
	    width: 100upx;
	    height: 100upx;
	    margin: 20upx;
	}
</style>
