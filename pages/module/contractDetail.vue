<!-- 
*  周晨辉 
*  2019/6/25
*  -->
<template>
	<view>
		<view class="detail-contain">
			<h3 class="detail-status">合同状态
			   <text class="contract-status" id="usable" v-if="usable">当前有效</text>
			   <text class="contract-status" id="disable" v-else>到期失效</text>
			</h3>
			<p class="information">房东<text>{{contract.truename}}</text></p>
			<p class="information">所租房屋 <text>{{contract.rentedHouse}}</text></p>
			<p class="information">合同有效期 <text>{{contract.startDate}}至{{contract.leaseTime}}</text></p>
			<view class="contract-picture">
				<image v-for="(item,index) in contract.imgList" :key="index" :src="item" v-if="index==listIndex"></image>
			</view>
			<view class="page">
		         <span>
					 <uni-icon type="back" size="30" @click="back"></uni-icon>
				 </span>
		         <span>{{Number(listIndex)+1}}/{{contract.imgList.length}}</span>
		         <span>
					 <uni-icon type="forward" size="30" @click="forward"></uni-icon>
				 </span>
			</view>
		</view>
		<view class="contractDetailBottom" v-if="usable">
			<view class="behaviour">
				<span @click="terminate(contract.tenantId,contract.uid,contract.tenancyNum,contract.startDate,contract.leaseTime,0)">退租</span>
				<span @click="terminate(contract.tenantId,contract.uid,contract.tenancyNum,contract.startDate,contract.leaseTime,1)">续租</span>
		    </view>
		</view>
		
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components: {uniIcon},
		data(){
			return{
				contract:{},
				listIndex:0,
				id:'',
				type:'',
				usable:'',
			}
		},
		onLoad(options){
			this.id=options.id;
			this.type=options.type;
			if(this.type==0){
				this.usable=true;
			}else{
				this.usable=false;
			}	
		},
		onReady(){
			this.show()
		},
		methods:{
			back(){
				if(this.listIndex==0){
					this.listIndex=this.contract.imgList.length-1;
				}else{
					this.listIndex--;
				}
			},
			forward(){
				if(this.listIndex==this.contract.imgList.length-1){
					this.listIndex=0;
				}else{
					this.listIndex++;
				}
			},
			terminate(tenantId,uid,tenancyNum,startDate,endDate,type){
				uni.navigateTo({
				  url:`./request?tenantId=${tenantId}&uid=${uid}&tenancyNum=${tenancyNum}&startDate=${startDate}&endDate=${endDate}&type=${type}`,
				  success: res => {},
				  fail: () => {},
				  complete: () => {}
				});
			},
			async show(){
				let res = await this.util.request({
					url: '/etenantsvr/tenant/queryContractInfo',
					method: 'post',
					data: {
						id:this.id
					}
				});
				this.contract=res.data.obj;
				this.contract.imgList=res.data.obj.contractPhoto.split(',');
			}
		}
	}
</script>

<style>
	.detail-contain{
	  padding:40upx 37upx 50upx 37upx;
	}
	.detail-status{
	  font-family:PingFang-SC-Bold;
	  font-size:32upx;
	  color:#333333;
	  font-weight:bold;
	  height:42upx;
	  line-height:42upx;
	  margin-bottom:40upx
	}
     .contract-status{
		display:inline-block;
		width:142upx;
		height:42upx;
		border-radius:4px;
		font-size:24upx;
		line-height:42upx;
		font-weight:bold;
		text-align:center;
		margin-left:32upx;
	 }
	 #disable{
		 color:#ADADAD;
		 background:#F0F0F0
	 }
	 #usable{
		 color:#E89827;
		 background:rgba(252,241,225,1);
	 }
	 .information{
		height:70upx;
		font-size:32upx;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(173,173,173,1);
		line-height:70upx;
	 }
	 .information>text{
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-left:49upx
	 }
	 .contract-picture,.contract-picture image{
		width:640upx;
		height:864upx;
		margin:0 auto;
		background:rgba(211,211,211,1);
		border-radius:6upx;
	 }
	 .page{
		 text-align:center;
		 margin-top:40upx;
	 }
	 .page>span{
		 margin:0 30upx 
	 }
	 .contractDetailBottom{
		 height:132upx;
	 }
	 .behaviour{
		 width:100%;
		 height:132upx;
		 line-height:132upx;
		 position:fixed;bottom:0;left:0;
		 background:#fff;
		 text-align:center;
		 border-top:1upx solid rgba(225,230,229,1);
	 }
	 .behaviour>span{
		 display:inline-block;
		 width:324upx;
		 height:88upx;
		 background:#2FC8D6;
		 border-radius:4upx;
		 text-align:center;
		 line-height:88upx;
		 font-size:32upx;
		 color:#fff;
		 font-weight:bold;
		 margin:0 15upx;
	 }
</style>
