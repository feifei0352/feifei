<template>
	<view>
		<view class="forms">
			<view class="people-information" v-for="(item, index) in list" :key="index">
				<view class="common-left">
					<text class="common-text">{{ item.name }}</text>
				</view>
				<view class="common-right">
					<input v-if="item.type==0" v-model="data[index]" type="text" :placeholder="item.plac" @blur="check(item.type)" @input="changeColor()"/>
					<input v-if="item.type==1" v-model="data[index]" type="number" :placeholder="item.plac" @blur="check(item.type)" @input="changeColor()"/>
					<text v-else style="line-height: 60upx;">{{item.backName}}</text>
				</view>
			</view>
		</view>
		<view class="submit"><button :style="{background:background}" @click="submit()">绑定</button></view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			state: 0,
			addon: '请选择',
			list: [
				{
					type: 0,
					name: '持卡人',
					plac: '请输入持卡人姓名'
				},
				{
					type: 1,
					name: '卡号',
					plac: '请输入银行卡号'
				},
				{
					type: 2,
					name: '银行',
					backName:"",
				}
			],
			data:['',''],
			background:'#2cc3be',
		};
	},
	methods: {
		async changeColor(){
			if(this.data[0]&&this.data[1]){
				this.background='#11D6D3';
			  }else{
				this.background='#2cc3be';
			  }
			if(this.data[1].length==8){
				let res = await this.util.request({
					url: '/etenantsvr/myModule/bankName',
					method: 'post',
					data:{
						cardNum:this.data[1],
					},
				});
				if(res.code==0){
					this.list[2].backName=res.data.obj;
				}else{
					this.list[2].backName='';
					uni.showToast({
						title: '银行卡格式有误',
						duration: 2000,
						icon:'none'
					});
				}
			}
		},
		check(type){
			if(type==0){
			  var username = /^([\u4e00-\u9fa5]){2,7}$/;
		      if(!username.test(this.data[0])){
		          uni.showToast({
					title: '姓名格式错误',
					duration: 2000,
					icon:'none'
				});
		      }
			}else if(type==1){
				if(this.data[1].length==0){
					uni.showToast({
						title: '银行卡号不能为空',
						duration: 2000,
						icon:'none'
					});
					return false;
				}
				if(this.data[1].length<6){
					uni.showToast({
						title: '银行卡号至少6位',
						duration: 2000,
						icon:'none'
					});
					return false;
				}
			}
		},
		async submit(){
			 var username = /^([\u4e00-\u9fa5]){2,7}$/;
		    if(!username.test(this.data[0])){
		        uni.showToast({
					title: '姓名格式错误',
					duration: 2000,
					icon:'none'
				});
				return false;
		    }
			if(this.data[1].length==0){
				uni.showToast({
					title: '银行卡号不能为空',
					duration: 2000,
					icon:'none'
				});
				return false;
			}
			if(this.data[1].length<6){
				uni.showToast({
					title: '银行卡号至少6位',
					duration: 2000,
					icon:'none'
				});
				return false;
			}
			let res2 = await this.util.request({
				url: '/etenantsvr/myModule/bankName',
				method: 'post',
				data:{
					cardNum:this.data[1],
				},
			});
			if(res2.code==0){
				this.list[2].backName=res2.data.obj;
				let res = await this.util.request({
					url: '/etenantsvr/myModule/bindBankCard',
					method: 'post',
					data:{
						bankCardNum:this.data[1],
						bankCardName:this.list[2].backName,
						settleAcctNm:this.data[0],
						identityCardNo:this.$store.state.obj.identityNumber,
					},
				});
				if(res.code==0){
					uni.showToast({
						title: '添加成功！',
						duration: 2000,
					});
					setTimeout(function(){
						uni.navigateBack({
							delta: 1
						});
						// uni.redirectTo({
						// 	url: 'chooseBankCard'
						// });
					},500)
				}
			}
		},
	},
};
</script>

<style>
.forms{
  margin-top:22upx;		
}
.people-information {
	background: #fff;
	border-bottom: 1upx solid #f0f0f0;
}
.common-left {
	display: inline-block;
	width: 30%;
	height: 80upx;
	font-size: 32upx;
	background-color: #ffffff;
	line-height: 80upx;
}
.common-text {
	position: absolute;
	left: 50upx;
}

.common-right {
	position: absolute;
	display: inline-block;
	width: 70%;
	height: 80upx;
	background-color: #ffffff;
	border-color: transparent;
	text-align: right;
	font-size: 32upx;
}
.common-right input,.common-right text{
	height: 60upx;
	position: absolute;
	right: 30upx;
	top: 10upx;
}
.submit {
	margin-top: 58upx;
}
.submit > button {
	width: 678upx;
	height: 88upx;
	border-radius: 4upx;
	opacity: 0.5;
	color: #fff;
}
</style>
