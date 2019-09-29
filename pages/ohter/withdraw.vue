<template>
	<view class="withdraw-contain">
		<view style="border-bottom:1upx solid #EBEDF0; margin-top:53upx;">
			<view class="withdraw-title">输入提现金额</view>	
			<view class="widthdraw-input">
				<input  type="number" @change="check()" v-model="account">
			</view>
		</view>
		<cmd-cell-item class="withdraw-account" :title="usermessage.title" slot-left :addon="usermessage.account" arrow="true" @click="selectCard">
			<image style="width:42upx;height:34upx;vertical-align: middle;" v-if="isCard" src="../../static/other/yue_card.png"></image>
		</cmd-cell-item>
		<view class="withdraw-submit">
			<button type="primary" formType="submit" :style="{background: submit_readonly,opacity:opacity}" @click="submit">提现</button>
		</view>
	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import cmdAvatar from '@/components/cmd-avatar/cmd-avatar.vue'
	export default{
		components:{
			cmdCellItem,
			cmdAvatar
		},
		data(){
			return{
				usermessage:{},
				isCard:true,
				bankCardNum:'',
				bankCardType:'',
				account:'',
				cardId:'',
				balance:'0',
				submit_readonly:'',
				opacity:'',
			}
		},
		methods:{
			onLoad(options){
				this.balance=options.balance;
				if(options.type==0){
					if(!options.bankCardNum){
						this.loading();
					}else{
						this.bankCardNum=options.bankCardNum;
						this.bankCardType=options.bankCardType;
						this.cardId=options.cardId;
						this.isCard=true;
						this.usermessage={
							title:'银行卡提现',
							account:this.bankCardType,
						}
					}
				}else{
				    this.isCard=false;
					this.usermessage={
						title:'支付宝提现',
						account:'186***7889'
					}
				}
			},
			selectCard(){
				if(this.isCard===true){
					uni.navigateTo({
						url:`chooseBankCard?type=2&balance=${this.balance}&bankCardNum=${this.bankCardNum}`,
					});
				}
			},
			// 银行卡列表
			async loading(){
				let res = await this.util.request({
					url: '/etenantsvr/myModule/queryBankCard',
					method: 'post',
					data:{
						identityCardNo:this.$store.state.obj.identityNumber,
					}
				});
				if(res.code==0){
					this.bankCardType=res.data.bankCardList[0].bankCardName;
					this.bankCardNum=res.data.bankCardList[0].bankCardNum;
					this.cardId=res.data.bankCardList[0].id;
					if(res.data.bankCardList==0){
						this.bankCardType="请先添加银行卡";
					}
					this.isCard=true;
					this.usermessage={
						title:'银行卡提现',
						account:this.bankCardType,
					}
				}
			},
			// 提现按钮
			async submit(){
				if(!this.account){
					uni.showToast({
						title: '请输入提现金额',
						duration: 2000,
						icon:'none',
					});
					return false;
				}
				if(this.account<=0){
					uni.showToast({
						title: '提现金额必须大于0',
						duration: 2000,
						icon:'none',
					});
					return false;
				}
				if(this.account>this.balance){
					uni.showToast({
						title: '提现金额不能大于余额',
						duration: 2000,
						icon:'none',
					});
					return false;
				}
				console.log(this.account);
				let res = await this.util.request({
					url: '/lianjiaaccount/androidMember/insertWithdrawDeposit',
					method: 'post',
					data:{
						uid:this.$store.state.obj.userId,
						bankName:this.bankCardType,
						bankAccount:this.bankCardNum,
						withdrawCash:this.account,
						cardId:this.cardId,	
					}
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
				this.account=this.account.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
			}
		},
		watch:{
			account(value){
				if(value!=''){
					this.submit_readonly='#11D6D3';
					this.opacity=1;
				}else{
					this.submit_readonly='#2CC3BE';
					this.opacity=0.3;
				}
			}
		}
	}
</script>

<style>
	.withdraw-title{
		text-align:center;
		color:#999999;
		font-size:28upx;
		margin:0 36upx;
	}
	.widthdraw-input{
		text-align:center;
		height:150upx;
		border-bottom:2upx solid #CED1D6;
		margin:36upx 36upx 54upx 36upx;
	}
	.widthdraw-input>input{
		height:120upx;
		line-height: 120upx;
		font-size:100upx;
	}
	.withdraw-account{
		height:100upx;
		border-top:1upx solid #EBEDF0
	}
	.withdraw-submit{
		margin-top:65upx;
	}
	.withdraw-submit>button{
		width:678upx;
		height:88upx;
		background:rgba(44,195,190,1);
		opacity:0.5;
		border-radius:4upx;
	}
</style>
