<template>
	<view class="">
		<view class="people-information" v-for="(item, index) in list" :key="index">
			<view class="common-left">
				<text class="common-text">{{ item.name }}</text>
			</view>
			<view class="common-right"><input type="text" disabled="true" v-model="data[index]" :placeholder="item.plac" /></view>
		</view>
		<view class="picture">
			<text class="picture-title">身份证照片（非必填）</text>
			<image class="upload-pos" :src="pic1" mode="" @click="chooseImg(0)"></image>
			<image class="upload-opp" :src="pic2" mode="" @click="chooseImg(1)"></image>
		</view>
	</view>
</template>

<script>
import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue';
export default {
	components: {
		cmdCellItem
	},
	data() {
		return {
			state: 0,
			list: [
				{
					name: '姓名',
					plac: '请输入姓名'
				},
				{
					name: '手机号',
					plac: '请输入租客电话'
				},
				{
					name: '身份证号',
					plac: '请输入租客身份证号'
				}
			],
			data: [],
			editlist: [],
			cardImage: [],
			pic1:'../../static/other/upload_position.png',
			pic2:'../../static/other/upload_opposite.png',
		};
	},
	onLoad() {
       this.show()
	},

	methods: {
		async show(){
			var that=this;
			let res=await this.util.request({
				url:'/etenantsvr/myModule/queryPersonalInfoDetail',
				method:'post',
				data:{userId:that.$store.state.id}
			});
			var obj=res.data.obj;
			that.data=[obj.tenant,obj.tenantPhone,obj.identityNumber];
			if(obj.idCardPhotoList[0].slice(2)!=''){
				that.pic1=obj.idCardPhotoList[0].slice(2);
			}
			if(obj.idCardPhotoList[1].slice(2)!=''){
				that.pic2=obj.idCardPhotoList[1].slice(2);
			}
			
		},
		getinit() {
			this.addon = this.editlist.relation;
			let edit = [this.editlist.addName, this.editlist.mobilePhone, this.editlist.idCard];
			for (let i in this.list) {
				this.data[i] = edit[i];
			}
		},
		chooseImg(id) {
			let _self = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera', 'album'], //从相册选择
				success: function(res) {
					var filepaths = res.tempFilePaths.map((value, index) => {
						return {
							name: 'file',
							uri: value
						};
					});
					uni.uploadFile({
						url: 'http://192.168.1.32/picturesvr/upload',
						files: filepaths,
						success: res => {
							if(id==0){
								_self.pic1=JSON.parse(res.data).data.obj
							}else{
								_self.pic2=JSON.parse(res.data).data.obj
							}
						}
					});
				}
			});
			console.log(_self.pic[0])
		},
		async onNavigationBarButtonTap() {
			var id=this.$store.state.id;
			this.pic1=this.pic1=='../../static/other/upload_position.png'?'':this.pic1;
			this.pic2=this.pic2=='../../static/other/upload_opposite.png'?'':this.pic2;
			var photoList='1:'+this.pic1+','+'2:'+this.pic2;
			let res=await this.util.request({
				url:'/etenantsvr/myModule/editPersonalInfo',
				method:'post',
				data:{
					id:id,
					idCardPhoto:photoList
				}
			});
			if(res.code=='0'){
				uni.showToast({
					title:res.msg
				})
				setTimeout(function(){
					uni.navigateBack({
					delta:-1
				})
				},1500)	
			}
		}
	}
};
</script>

<style>
.person-list {
	background-color: #ffffff;
	margin: 20upx 0;
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
.common-right input {
	height: 60upx;
	position: absolute;
	right: 30upx;
	top: 10upx;
}
.picture {
	width: 100%;
	background-color: #ffffff;
	height: 338upx;
	position: relative;
}
.picture-title {
	display: block;
	padding-top: 20upx;
	margin-left: 50upx;
	color: #999999;
	font-size: 32upx;
	font-weight: 500;
}
.upload-pos {
	position: absolute;
	width: 328upx;
	height: 204upx;
	left: 50upx;
	top: 100upx;
}
.upload-opp {
	position: absolute;
	top: 100upx;
	width: 328upx;
	height: 204upx;
	right: 30upx;
}
</style>
