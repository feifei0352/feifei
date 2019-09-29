<template>
	<view>
		<view class="cardList">
			<view class="cards" @click="choosecard(item.bankCardNum,item.bankCardName,item.id)"
				v-for="(item, index) in cardList"
				:key="index"
				:style="{ background: (index + 1) % 3 == 0 ? '#2CC3BE' : (index + 1) % 3 == 2 ? '#2FC8D6' : '#F2C23F' }">
				<view class="bankName">
					{{ item.bankCardName }}
					<image class="chosenIcon" v-if="chosen == index" src="../../static/other/yhk_chosen.png"></image>
					<image v-if="item.bankCardNum==nowbank" src="../../static/icon/yhk_chosen.png" class="yhk_chosen"></image>
				</view>
				<view class="bankType">{{ item.bankCardType }}</view>
				<view class="cardNumber">
					<text>****</text>
					<text>****</text>
					<text>****</text>
					<text>{{ item.bankCardNum.substr(-4, 4) }}</text>
				</view>
			</view>
		</view>
		<view class="addCard">
			<image src="../../static/other/yhk_add.png" @click="addCard"></image>
			<view>添加银行卡</view>
			<action ref="action" @itemClick="itemClick" @titleClick="titleClick"></action>
		</view>
	</view>
</template>

<script>
import action from '../../components/shufei-action/action.vue';
export default {
	components: {
		action
	},
	data() {
		return {
			color: [1, 2, 3],
			cardList: [
				// {
				// 	bank: '工商银行',
				// 	type: '储蓄卡',
				// 	number: '5156158465841110'
				// },
				// {
				// 	bank: '招商银行',
				// 	type: '储蓄卡',
				// 	number: '3542648168722220'
				// },
			],
			type: 1,
			selectbank:'',
			balance:0,
			nowbank:'',
		};
	},
	methods: {
		onLoad(option){
			this.type=option.type;
			this.balance=option.balance;
			if(option.type==2){
				this.nowbank=option.bankCardNum;
				uni.setNavigationBarTitle({
					title: '选择银行卡'
				});
			}else{
				uni.setNavigationBarTitle({
					title: '我的银行卡'
				});
			}
			this.loading();
		},
		onShow(){
			this.loading();
		},
		// 点击银行卡事件
		choosecard(bankCardNum,bankCardType,cardId) {
			if(this.type==2){
				uni.navigateBack({
					delta: 2,
					"animationType": "none",
				});
				uni.navigateTo({
					url: `withdraw?bankCardNum=${bankCardNum}&bankCardType=${bankCardType}&type=0&cardId=${cardId}&balance=${this.balance}`,
					"animationType": "none",
				});
			}else{
				this.$refs.action.actionConfig = {
					title: '',
					list: ['解绑'],
					type: 0,
					isBorderColor: false,
					specClass: 'show'
				};
				this.selectbank=bankCardNum;
			}
		},
		// 解绑银行卡
		itemClick(index, type) {
			//这里根据不同的类型点击的索引值,做对应的逻辑处理
			let that=this;
			if(index==0){
				uni.showModal({
					title: '提示',
					content: '是否要解绑这张银行卡',
					success: function (res) {
						if (res.confirm) {
							that.unbindBankCard()
						}
					}
				});
			}
		},
		async unbindBankCard(){
			uni.showLoading();
			let res = await this.util.request({
				url: '/etenantsvr/myModule/unbindBankCard',
				method: 'post',
				data:{
					identityCardNo:this.$store.state.obj.identityNumber,
					bankCardNum:this.selectbank,
				}
			});
			if(res.code==0){
				setTimeout(function(){
					uni.showToast({
						title: '解绑成功',
						duration: 2000
					});
				})
				this.loading();
			}
		},
		// 银行卡列表
		async loading(){
			uni.showLoading();
			let res = await this.util.request({
				url: '/etenantsvr/myModule/queryBankCard',
				method: 'post',
				data:{
					identityCardNo:this.$store.state.obj.identityNumber,	
				}
			});
			if(res.code==0){
				this.cardList=res.data.bankCardList;
			}
			// console.log(JSON.stringify(res));
		},
		addCard() {
			uni.navigateTo({
				url: 'addCard'
			});
		}
	}
};
</script>

<style>
.cards {
	width: 578upx;
	height: 224upx;
	border-radius: 20upx;
	background: #2cc3be;
	margin: 36upx auto 0;
	color: #fff;
	padding: 38upx 50upx;
}
.bankName {
	font-size: 34upx;
	font-weight: bold;
	height: 50upx;
}
.chosenIcon {
	width: 50upx;
	height: 50upx;
	vertical-align: middle;
	float: right;
}
.bankType {
	font-size: 28upx;
	margin-top: 20upx;
}
.cardNumber {
	font-size: 50upx;
	margin-top: 50upx;
}
.cardNumber > text {
	margin-right: 40upx;
}
.cardList{
	padding-bottom:160upx;
}
.addCard {
	width: 100%;
	height: 126upx;
	text-align: center;
	color: #333333;
	background: #fff;
	font-size: 30upx;
	position: fixed;
	bottom: 0;
	border-top: 2upx solid #ccc;
	padding-top: 2upx;
}
.addCard > image {
	width: 66upx;
	height: 66upx;
	margin-top: 10upx;
}
.yhk_chosen{
	width: 40upx;
	height: 40upx;
	float: right;
	/* margin-right: 30upx; */
}
</style>
