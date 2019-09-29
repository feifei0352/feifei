<template>
	<view class="center">
		<!-- <uni-nav-bar status-bar="true" right-icon="bars"></uni-nav-bar> -->
		<view class="person-head">
			<view class="" style="text-align: center;padding-top:100upx">
				<text class="wallet-balance" style="font-size:28upx;font-weight:500">账户余额</text>
				<text class="wallet-balance" style="font-size:60upx;font-weight:bold">{{balance}}</text>
			</view>
		</view>
		<uni-list class="wallet-list" v-for="(item, key) in list" :key="key">
			<uni-list-item :title="item.title" :thumb="item.themb" @click="goDetailPage(item.url,item.type)"></uni-list-item>
		</uni-list>
		<view class="contractDetailBottom">
			<view class="behaviour">
				<span @click="openType0">提现</span>
				<span @click="terminate">充值</span>
				<action ref="action" @itemClick="itemClick" @titleClick="titleClick"></action>
			</view>
		</view>
	</view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import action from '../../components/shufei-action/action.vue';
export default {
	components: {
		uniList,
		uniListItem,
		action
	},
	data() {
		return {
			list: [
				{
					title: '我的银行卡',
					themb: '../../static/other/yue_card.png',
					url: 'chooseBankCard',
					type:'1',
				},
				// {
				// 	title: '待结算金额',
				// 	themb: '../../static/other/yue_tixian.png',
				// 	url: 'people',
				// 	type:'2',
				// }
			],
			type: '',
			balance:0,
		};
	},
	methods: {
		onShow(){
			uni.showLoading();
			this.loading();
		},
		onNavigationBarButtonTap(e) {
			console.log(e.index);
			uni.navigateTo({ url: '/pages/ohter/balance' });
		},
		goDetailPage(url,type) {
			uni.navigateTo({ url: '/pages/ohter/' + url + '?typ='+type});
		},
		async loading(){
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
		itemClick(index, type) {
			//这里根据不同的类型点击的索引值,做对应的逻辑处理
			console.log(index)
			if(index==0){
				uni.navigateTo({
					url: `/pages/ohter/withdraw?type=${index}&balance=${this.balance}`
				});
			}else{
				uni.navigateTo({
					url: `/pages/ohter/AlipayCash?balance=${this.balance}`
				});
			}
		},
    openType0() {
      this.$refs.action.actionConfig = {
        title: '提现到',
        list: ['银行卡', '支付宝'],
        type: 0,
        isBorderColor: false,
		isCloseCancel:true,
        specClass: 'show'
      };
    },
    terminate() {
      uni.navigateTo({
        url: 'reCharge'
      });
    }
  }
};
</script>
<style>
.person-head {
	height: 374upx;
	width: 100%;
	background: #099c99;
}
.example {
	padding: 0 30upx 30upx;
}
.person-list {
	line-height: 0;
}
.wallet-list {
	background-color: #ffffff;
	margin-bottom: 20upx;
}
.wallet-balance {
	display:block;
	color:#fff;
	margin-bottom:30upx
}
.contractDetailBottom {
	height: 132upx;
}
.behaviour {
	width: 100%;
	height: 132upx;
	line-height: 132upx;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #fff;
	text-align: center;
	border-top: 1upx solid rgba(225, 230, 229, 1);
}
.behaviour > span {
	display: inline-block;
	width: 324upx;
	height: 88upx;
	border-radius: 4upx;
	text-align: center;
	line-height: 88upx;
	font-size: 32upx;
	color: #fff;
	margin: 0 15upx;
}
.behaviour > span:nth-child(1) {
	background: #c8e6e5;
	color: #099c99;
}
.behaviour > span:nth-child(2) {
	background: #2cc3be;
}
.uni-list::before{
	height:0
}
.uni-list-item__container:after,.uni-list:after{
	height: 0!important;
}
</style>
