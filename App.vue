<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
body {
	background-color: #f5f5f5;
}

.login-logo {
	text-align: center;
}
.logo {
	height: 500upx;
	width: 100%;
}
.input-box {
	padding: 36upx;
	font-size: 30upx;
	.input-item {
		display: flex;
		background: white;
		border-bottom: 1upx solid #eeeeee;
		line-height: 100upx;
		height: 100upx;
		.input-label {
			// width: 116px;
		}
		.input-body {
			position: relative;
			height: 100upx;
			width: calc(100% - 150upx);
			.input {
				line-height: 100upx;
				height: 100upx;
				position: relative;
				font-size: 32upx;
			}
			.eye {
				position: absolute;
				height: 50upx;
				width: 50upx;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
			}
			.btn-code {
				position: absolute;
				right: -150upx;
				top: 50%;
				transform: translateY(-50%);
				background: none;
				// color: #205592;
				// width: 160upx;
				font-size: 24upx;
				// box-sizing: border-box;
				// text-align: right;
				padding: 10upx 20upx;
				// height: 100upx;
				// line-height: 100upx;
			}
		}
	}
	.select {
		margin-top: -20upx;
		display: flex;
		font-size: 14px;
		color: #10BEE5;
	}
	.select span:hover{
		animation: onclick 1s;
		-moz-animation: onclick 1s;	/* Firefox */
		-webkit-animation: onclick 1s;	/* Safari 和 Chrome */
		-o-animation: onclick 1s;	/* Opera */
	}
}
.hover span:hover{
	animation: onclick 1s;
	-moz-animation: onclick 1s;	/* Firefox */
	-webkit-animation: onclick 1s;	/* Safari 和 Chrome */
	-o-animation: onclick 1s;	/* Opera */
}
@keyframes onclick
{
from {background: #ccc;}
to {background: #fff;}
}
.button {
	margin: 0 50upx;
	line-height: 102upx;
	height: 80upx;
	color: white;
	font-size: 32upx;
	width: 650upx;
	height: 102upx;
	background: rgba(9, 156, 153, 1);
	// opacity: 0.3;
	border-radius: 51upx;
}
button::after {
	border: none;
}
</style>
