
<template>
	<view class="message-contain">
		<cmd-cell-item v-for="(item,index) in messageList" :key="index" class="message-messages" :title="item.behaviorName" :brief="item.resultName" slot-left @click="goTo(item.logShowMark,item.contractId,item.id)">
			<view class="message-left">
				<image class="message-icon" :src="iconList[item.logShowMark-1]"></image>
				<text class="message-dot" v-if="item.memberNotice==1"></text>
			</view>	
		</cmd-cell-item>
		<view class="none" v-if="messageList.length==0">
			<view>
				<image src="../../static/other/no_news.png"></image>
			</view>
			<view>暂无消息</view>
		</view>
	</view>
</template>
<script>
	import cmdAvatar from '@/components/cmd-avatar/cmd-avatar.vue'
	import cmdIcon from '@/components/cmd-icon/cmd-icon.vue'
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	export default {
		components:{
			cmdAvatar,
			cmdIcon,
			cmdCellItem,
		},
		data(){
			return{
				 messageList:[
					 // {
						//  type:1,
						//  title:'交租提醒',
						//  content:'东方郡东区9栋1单元1301即将到交租截止日期2019-03-18，请按时缴纳。'
					 // },
					 // {
						//  type:2,
						//  title:'交费提醒',
						//  content:'东方郡东区9栋1单元1301即将到交租截止日期2019-03-18，请按时缴纳。'
					 // },
					 // {
						//  type:3,
						//  title:'合同即将到期',
						//  content:'东方郡东区9栋1单元1301即将到交租截止日期2019-03-18，请按时缴纳。'
					 // }
				 ],
				 iconList:[
					 '../../static/icon/message01.png',
					 '../../static/icon/message01.png',
					 '../../static/icon/message01.png',
					 '../../static/icon/message01.png',
					 '../../static/icon/message01.png',
					 '../../static/icon/message01.png',
					 '../../static/icon/message01.png',
					 '../../static/icon/message01.png',//收租提醒
					 '../../static/icon/message02.png',//租客到期
					 '../../static/icon/message03.png'//合同到期
				 ],
				 url:[
					 '',
					 '',
					 '',
					 '',
					 '',
					 '',
					 '',
					 '../module/rates',//租费
					 '../module/rates',//租费
					 '../module/contractDetail',//合同
				 ],
				 options:{},
			}
		},
		methods:{
			onLoad(option) { //option为object类型，会序列化上个页面传递的参数
				setTimeout(function () {
				    console.log('start pulldown');
				}, 1000);
				uni.startPullDownRefresh();
				
			},
			onPullDownRefresh() {
				this.loading();
				setTimeout(function () {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			async loading(option){
				let res = await this.util.request({
					url: '/etenantsvr/message/queryMessageList',
					method: 'post',
					data:{
						tenantId:this.$store.state.obj.id,//租客id：this.$store.state.obj.id
						pageSize:'30',
						pageNum:'1'
					}
				});
				if(res.code==0){
					this.messageList=res.data.list;
				}
				// console.log(JSON.stringify(res));
			},
			async goTo(t,id,messageId){
				console.log(id);
				var url=`${this.url[t-1]}?id=${id}&type=0`
				uni.navigateTo({
				  url:url,
				  success: res => {},
				  fail: () => {},
				  complete: () => {}
				});
				let res = await this.util.request({
					url: '/etenantsvr/message/updateMessageStatus',
					method: 'post',
					data:{
						messageId:messageId,
					}
				});
				if(res.code==0){
					this.loading(this.option);
				}
			}
		}
	}
</script>

<style>
	page{
		background:#F5F5F5
	}
	.message-contain{
		margin-top:22upx;
		background:#fff;
		/* padding:0 36upx; */
	}
	.message-left{
		width:100upx;
		height:100upx;
		position:relative
	}
	.message-icon{
        width:100upx;
		height:100upx;
	}
	.message-dot{
		display:inline-block;
		width:16upx;
		height:16upx;
		background:rgba(230,77,69,1);
		border:2upx solid rgba(255, 255, 255, 1);
		border-radius:50%;
		position:absolute;
		top:0;
		left:80upx;
	}
	.none{
		text-align: center;
		font-size:30upx;
		color:#333333;
		margin-top:224upx;
		background-color: #F5F5F5;
	}
	.none image{
		width:169upx;
		height:169upx
	}
</style>