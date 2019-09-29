<template>
	<view class="assembly" v-if="shader">
		<!-- 遮掩层 -->
		<uni-shader></uni-shader>
		<!-- 支付层 -->
		<view class="pay_node uni-flex uni-column">
			<!-- 关闭按钮 -->
			<view class="close_icon click" hover-class="click_hover" @tap="close_view"><text class="uni-icon uni-icon-close"></text></view>
			<view class="pay_title">{{ title }}</view>
			<view class="pay_body uni-flex uni-column">
				<view class="pay-pwd-input">
					<view class="pay-pwd-grid uni-flex uni-row" v-for="(value, index) in payPwdGrid" :key="index">
						<view>{{value.text}}</view>
					</view>
				</view>
				<view class="keyboard-node">
					<view class="keyboard-12 uni-flex uni-column">
						<view class="uni-flex uni-row keyboard-row">
							<view @tap="inputPwd($event)" class="keyboard" data-char="1" hover-class="click_hover">1</view>
							<view @tap="inputPwd($event)" class="keyboard" data-char="2" hover-class="click_hover">2</view>
							<view @tap="inputPwd($event)" class="keyboard" data-char="3" hover-class="click_hover">3</view>
						</view>
						<view class="uni-flex uni-row keyboard-row">
							<view @tap="inputPwd($event)" class="keyboard" data-char="4" hover-class="click_hover">4</view>
							<view @tap="inputPwd($event)" class="keyboard" data-char="5" hover-class="click_hover">5</view>
							<view @tap="inputPwd($event)" class="keyboard" data-char="6" hover-class="click_hover">6</view>
						</view>
						<view class="uni-flex uni-row keyboard-row">
							<view @tap="inputPwd($event)" class="keyboard" data-char="7" hover-class="click_hover">7</view>
							<view @tap="inputPwd($event)" class="keyboard" data-char="8" hover-class="click_hover">8</view>
							<view @tap="inputPwd($event)" class="keyboard" data-char="9" hover-class="click_hover">9</view>
						</view>
						<view class="uni-flex uni-row keyboard-row">
							<view class="keyboard"></view>
							<view @tap="inputPwd($event)" class="keyboard" data-char="0" hover-class="click_hover">0</view>
							<view @tap="backspace()" class="keyboard" data-char="×" hover-class="click_hover">×</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniShader from '@/components/pay-pwd/uni-shader.vue';
export default {
	name: 'pay-pwd',
	components: {
		uniShader
	},
	props: {
		title: {
			type: String,
			default: '请输入支付密码'
		}
	},
	data() {
		return {
			shader: false,
			password: [],
			payPwdGrid: [
				{
					text: ''
				},
				{
					text: ''
				},
				{
					text: ''
				},
				{
					text: ''
				},
				{
					text: ''
				},
				{
					text: ''
				}
			]
		};
	},
	methods: {
		show() {
			this.password = [];
			/* 初始化输入框 */
			for (let i in this.payPwdGrid) {
				this.payPwdGrid[i].text = "";
			}
			this.shader = true;
		},
		close_view() {
			this.password = [];
			this.shader = false;
		},
		/* 小键盘输入 */
		inputPwd(e) {
			let char = e.currentTarget.dataset.char;
			let args = {
				target: this,
				data: char
			};
			this.$emit('input', args);
			let passIndex = this.password.length;
			if (passIndex < 6) {
				this.password.push(char);
				this.payPwdGrid[passIndex].text = "●";
				// 改变密码框
				if (this.password.length === this.payPwdGrid.length) {
					//长度达6位，自动验证
					this.$emit('completed', this.password.join(''));
					this.close_view();
					return;
				}
			}
		},
		/* 回退 */
		backspace() {
			let passIndex = this.password.length;
			if (this.password.length > 0) {
				// 改变密码框
				this.password = this.password.slice(0, this.password.length - 1);
				this.payPwdGrid[passIndex - 1].text = "";
				return;
			}
		}
	}
};
</script>

<style>
	page,view{
		display: flex;
	}
/* 组件样式 */
.assembly {
	display: block;
	z-index: 999;
	width: 750upx;
	position: fixed;
	bottom: 0upx;
	height: 100%;
	box-sizing: border-box;
	line-height: 100%;
	display: inline-block;
	opacity: 0.9;
}
/* 支付节点样式 */
.pay_node {
	background-color: #f7f4f4;
	z-index: 9999;
	height: 60%;
	width: 750upx;
	position: absolute;
	bottom: 0upx;
}
/* 标题样式 */
.pay_title {
	color: #000000;
	width: 750upx;
	height: 90upx;
	line-height: 90upx;
	font-size: 35upx;
	font-weight: 600;
	letter-spacing: 3upx;
	text-align: center;
	display: block;
}
/* 关闭按钮样式 */
.close_icon {
	position: absolute;
	top: 18upx;
	right: 15upx;
}
.pay_body {
	border-top: 0.1upx solid #b9dee4;
	width: 750upx;
	height: 100%;
}
.pay-pwd-input {
	width: 750upx;
	height: 190upx;
	line-height: 190upx;
}
.pay-pwd-grid {
	margin: 0upx auto;
	margin-top: 40upx;
	width: 696upx;
	height: 90upx;
	line-height: 90upx;
}
.pay-pwd-grid > view {
	width: 116upx;
	height: 90upx;
	line-height: 90upx;
	text-align: center;
	display: inline-block;
	border: #cececd solid 0.1upx;
	border-radius: 10upx;
	margin: 0upx 4upx;
	font-size: 36upx;
	font-weight: 600;
}
/* 自定义键盘 */
.keyboard-node {
	width: 750upx;
	margin-top: 120upx;
	height: 100%;
	line-height: 100%;
	box-sizing: border-box;
}
.keyboard-12 {
	width: 750upx;
	height: 100%;
	line-height: 100%;
	box-sizing: border-box;
}
.keyboard-row {
	width: 750upx;
	height: 25%;
	line-height: 25%;
	box-sizing: border-box;
}
.keyboard {
	box-sizing: border-box;
	width: 250upx;
	height: 100%;
	line-height: 100%;
	background-color: #ffffff;
	border-top: #f7f4f4 solid 0.1upx;
	border-left: #f7f4f4 solid 0.1upx;
	font-size: 40upx;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: Center;
}
.keyboard-row .keyboard:nth-child(1) {
	border-left: none;
}
.keyboard-row:nth-child(4) .keyboard:nth-child(1),
.keyboard-row:nth-child(4) .keyboard:nth-child(3) {
	background-color: #e3e8ec;
}
.click_hover {
	animation: showPopup 0.1s linear both;
}
.hovers{
	
}
@keyframes showPopup{
	0%{
		opacity: 0;
		background-color: #d8d8d8;
	}
	100%{
		opacity: 1;
	}
}
</style>
