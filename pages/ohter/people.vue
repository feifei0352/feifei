<template>
	<view class="content">
		<view class="add" v-if="state == 0">
			<image class="img-people" src="../../static/other/renants_message.png" mode=""></image>
			<button class="add-people" type="primary" @click="add">马上添加</button>
		</view>
		<view v-else>
			<view class="people" v-for="(item, index) in dataList" :key="index" @click.stop="edit(item)">
				<image class="people-url" :src="item.photo" mode=""></image>
				<text class="people-text">
					{{ item.addName }}
					<text>({{ item.relation }})</text>
				</text>
				<image @click.stop="deletepeople(item.id,item.addName)" class="people-delete" src="../../static/other/livewith_delete.png" mode=""></image>
			</view>
		</view>
		<view class="none" v-if="hasPeople===0">
			<image src="../../static/other/renants_message.png"></image>
			<text>尚无同住人</text>
			<button @click="add">马上添加</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			state: 1,
			dataList: [],
			hasPeople:1
		};
	},
	onShow() {
		this.detail();
	},
	methods: {
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/ohter/addPeople'
			});
		},
		add() {
			uni.navigateTo({
				url: '/pages/ohter/addPeople'
			});
		},
		async detail() {
			let res = await this.util.request({
				url: '/etenantsvr/fellow/resident/query',
				method: 'post',
				data: {
					addResidentId: this.$store.state.obj.identityNumber
				}
			});
			this.dataList = res.data.list;
			this.hasPeople=res.data.list==''?0:1;
			//console.log(JSON.stringify(this.dataList))
			 for(var item of this.dataList){
			 	item.sex=this.util.transform(item.idCard)
				item.photo=['../../static/other/pretendfri_boy_light.png','../../static/other/pretendfri_girl_light.png'][item.sex]
			 }
		},
		deletepeople(id,name){
			var that=this;
			uni.showModal({
				title:`      确认删除同住人${name}？`,
				content:'  ',
				success:function(res){
					if(res.confirm){
						that.delelepeo(id)
					}
				}
			})
		},
		async delelepeo(id) {
			let res = await this.util.request({
				url: '/etenantsvr/fellow/resident/deleteInfo',
				method: 'post',
				data: {
					id: id
				}
			});
			if(res.code==0){
				uni.showToast({
					title:res.msg
				});
				this.detail()
			}
		},
		edit(params) {
			let param = JSON.stringify(params)
			uni.navigateTo({
				url: 'addPeople?index=' + param
			});
		}
	}
};
</script>

<style>
.add {
	text-align: center;
	display: block;
	margin: auto;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 300upx;
	height: 350upx;
}
.img-people {
	width: 169upx;
	height: 169upx;
	position: relative;
	display: block;
	margin: auto;
	vertical-align: middle;
}
.add-people {
	width: 224upx;
	height: 88upx;
	background: #11d6d3;
	border-radius: 4upx;
	font-size: 32upx;
	line-height: 88upx;
}
.people {
	height: 206upx;
	width: 100%;
	background-color: #ffffff;
	margin: 10upx;
	line-height: 206upx;
	overflow: hidden;
}
.people-url {
	width: 116upx;
	height: 116upx;
	vertical-align: middle;
	margin: 0 20upx;
}
.people-text {
	font-size: 32upx;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
}
.people-text text {
	font-weight: 500;
	color: rgba(153, 153, 153, 1);
	margin-left: 20upx;
}
.people-delete {
	height: 48upx;
	width: 69upx;
	vertical-align: middle;
	float: right;
	margin-top: 79upx;
	margin-right: 50upx;
}
.none{
	width:225upx;
	height:300upx;
	text-align:center;
	/* position:absolute;
	margin:auto;
	top:0;
	left:0;
	right:0;
	bottom:0 */
	margin:400upx auto;
}
.none>image{
	display:block;
	width:169upx;
	height:169upx;
	margin:0 auto;
}
.none>text{
	font-size:30upx;
}
.none>button{
	width:100%;
	height:88upx;
	margin-top:40upx;
	background:#11D6D3;
	color:#fff;
}
</style>
