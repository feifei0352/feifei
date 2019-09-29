<!-- 
*  周晨辉
*  2019/6/27
*  -->
<template>
	<view class="pretendfriends-contain">
		<view class="present" v-if="present.communityName">
                <view  class="pretendfriend-house" v-if="present.renterList.length>0">
					<image src="../../static/other/address_orangepoint.png"></image>
					{{present.communityName}}{{present.buildingNumber}}栋{{present.unitNumber}}单元{{present.houseNumber}}
					<text>租友{{present.num-1}}人</text>
				</view>
				<cmd-cell-item v-for="(item,index) in present.renterList" :key="index" :title="item.tenant" slot-left :addon="item.houseNumber +'-'+ item.roomNumber" arrow="true" @click="toDetail(item.tenancyFlag,item.tenantId,item.sex)">
					<image style="width:130upx;height:130upx;vertical-align: middle;" v-if="item.tenancyFlag==1" :src="sexPic[item.sex]"></image>
					<image class="gray" style="width:130upx;height:130upx;vertical-align: middle;" v-else :src="sexPic[item.sex]"></image>
				</cmd-cell-item>
		</view>
		<view class="dated" v-for="(item,index) in dated" :key="index">
			    <view  class="pretendfriend-house" v-if="item.renterList.length>0">
					<image src="../../static/other/address_orangepoint(1).png"></image>
					{{item.communityName}}{{item.buildingNumber}}栋{{item.unitNumber}}单元{{item.houseNumber}}
					<text>已到期</text>
				</view>
				<cmd-cell-item v-for="(user,i) in item.renterList" :key="i" :title="user.tenant" slot-left :addon="user.houseNumber+'-'+user.roomNumber" arrow="true"  @click="toDetail(user.tenancyFlag,user.tenantId,user.sex)">
					<image class="gray" style="width:130upx;height:130upx;vertical-align: middle;" :src="sexPic[user.sex]"></image>
				</cmd-cell-item>
		</view>
	</view>
</template>
<script>
	import cmdAvatar from '@/components/cmd-avatar/cmd-avatar.vue'
	import cmdIcon from '@/components/cmd-icon/cmd-icon.vue'
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	export default{
		components:{
			cmdAvatar,		
			cmdCellItem,		
			cmdIcon
		},
		data(){
			return{
				present:{
					// communityName:'',
					// buildingNumber:'',
					// unitNumber:'',
					// houseNumber:'',
					// num:''
				},
				dated:[
						
				],
				sexPic:[
					'../../static/other/pretendfri_boy_light.png',
					'../../static/other/pretendfri_girl_light.png'
				]
			}
		},
		onLoad(){
			this.show()
		},
		methods:{
			toDetail(type,id,sex){
				uni.navigateTo({
				  url:`./friendDetail?id=${id}&type=${type}&sex=${sex}`,
				});
			},
			async show(){
				var identityNumber=this.$store.state.identityNumber;
				let res = await this.util.request({
					url: '/etenantsvr/partnerRenting/queryPartnerRentList/',
					method: 'post',
					data: {
						identityNumber:identityNumber
					}
				});
               var friendList=res.data.list;
			   console.log(identityNumber)
			   for(var item of friendList){
				   item.renterList=item.renterList.filter((i)=>{return i.identityNumber!=identityNumber})
				   for(var i of item.renterList){
						   i.sex=this.util.transform(i.identityNumber) 
				   }
				   if(item.isRelet=='0'){
					   this.dated.push(item)
				   }else{
					   this.present=item
				   }
			   }
			}
		}
	}
</script>

<style>
	page{
		background:#F5F5F5
	}
	.pretendfriends-contain{
		height:100upx;
		line-height: 100upx;
		border-bottom:1upx solid rgba(235,235,235,1);
		width:100%;
		font-size: 30upx;
		margin-top:24upx;
	}
   .pretendfriend-house{
	   color:#666666;
	   font-seight:500upx;
	   padding:0 32upx;
   }
   .pretendfriend-house>text{
	   height:60upx;
	   text-align: center;
	   padding-left:20upx;
	   line-height: 60upx;
	   margin-top:24upx;
	   display:inline-block;
	   float:right;
	   color:#2FC38D;
	   border-left: 1px solid rgba(235,235,235,1);
   }
   .dated .pretendfriend-house>text{
	   color:#999999
   }
  .pretendfriend-house>image{
	  width:30upx;
	  height:30upx;
	  vertical-align:middle;	  
  }
  .dated,.present{
	  background:#fff
  }
  .dated{
	  margin-top:18upx;
  }
  .gray { 
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);   
    filter: grayscale(100%);
    filter: gray;
   }
</style>
