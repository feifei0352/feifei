<template>
	<view class="">
		<view class="person-list">
			<cmd-cell-item title="关系" :addon="addon" slot-left arrow @click="goDetailPage()"></cmd-cell-item>
		</view>
		<view class="people-information" v-for="(item, index) in list" :key="index">
			<view class="common-left">
				<text class="common-text">{{ item.name }}</text>
			</view>
			<view class="common-right">
				<input v-if="item.type==1" type="text" v-model="data[index]" :maxlength="item.maxlength" :placeholder="item.plac"  />
				<input v-else type="number" :maxlength="item.maxlength" v-model="data[index]" :placeholder="item.plac" 
				 />
			</view>
		</view>
		<view class="picture">
			<text class="picture-title">身份证照片（非必填）</text>
			<image class="upload-pos" :src="pic1" mode="" @click.stop="chooseImg(0)"></image>
			<image class="upload-opp" :src="pic2" mode="" @click.stop="chooseImg(1)"></image>
		</view>
		<button style="background:#2CC3BE;color:#fff" @click.stop="submit" v-if="tabbar">{{button}}</button>
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
				addon: '请选择',
				list: [{
						name: '姓名',
						plac: '请输入同住人姓名',
						type: 1,
						maxlength: 4
					},
					{
						name: '手机号',
						plac: '请输入同住人电话',
						type: 0,
						maxlength: 11
					},
					{
						name: '身份证号',
						plac: '请输入同住人身份证号',
						type: 1,
						maxlength: 18
					}
				],
				data: [],
				editlist: [],
				cardImage: [],
				pic1: '../../static/other/upload_position.png',
				pic2: '../../static/other/upload_opposite.png',
				button: '保存',
				type: 1,
				tabbar: true,
				windowHeight: ''
			};
		},
		onLoad(options) {
			uni.getSystemInfo({
				success: (res) => {
					this.windowHeight = res.windowHeight;
				}
			});
			uni.onWindowResize((res) => {
				if (res.size.windowHeight < this.windowHeight) {
					this.tabbar = false
				} else {
					this.tabbar = true
				}
			})

			if (options.index) {
				uni.setNavigationBarTitle({
					title: '编辑同住人'
				});
				var obj = JSON.parse(options.index)
				this.addon = obj.relation;
				this.editlist = obj;
				this.data = [obj.addName, obj.mobilePhone, obj.idCard];
				if (obj.idCardFront != '') {
					this.pic1 = obj.idCardFront;
				}
				if (obj.idCardBack != '') {
					this.pic2 = obj.idCardBack;
				};
				this.type = 2
			}
			// 	if (JSON.parse(options.index).code == 0) {
			// 	this.editlist = JSON.parse(options.index);
			// 	this.state = 1;
			// 	this.getinit();
			// }
			// if (this.state == 1) {
			// 	uni.setNavigationBarTitle({
			// 		title: '同住人'
			// 	});
			// }
		},

		methods: {
			getinit() {
				this.addon = this.editlist.relation;
				let edit = [this.editlist.addName, this.editlist.mobilePhone, this.editlist.idCard];
				for (let i in this.list) {
					this.data[i] = edit[i];
				}
			},
			goDetailPage() {
				var itemList = ['配偶', '父母', '子女', '祖父母', '子孙女', '兄弟姐妹', '其它亲属', '朋友', '其它'];
				uni.showActionSheet({
					itemList: itemList,
					success: e => {
						this.addon = itemList[e.tapIndex];
					}
				});
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
								if (id == 0) {
									_self.pic1 = JSON.parse(res.data).data.obj
								} else {
									_self.pic2 = JSON.parse(res.data).data.obj
								}
							}
						});
					}
				});
			},
			// showTabbar() {
			// 	this.tabbar = true;
			// },
			// hideTabbar() {
			// 	this.tabbar = false;
			// },
			async submit() {
				let url = '';
				let params = {};
				if (this.type == 2) {
					url = '/etenantsvr/fellow/resident/updateInfo';
					//console.log(this.editlist)
					params = {
						id: this.editlist.id,
						tenantId: this.$store.state.obj.id,
						addResidentId: this.$store.state.obj.identityNumber,
						fellowResidentName: this.$store.state.obj.tenant,
						residentId: this.data[2],
						relation: this.addon,
						addName: this.data[0],
						mobilePhone: this.data[1],
						idCard: this.data[2],
						idCardFront: this.pic1,
						idCardBack: this.pic2,
						delFlag: 0
					};
				} else {
					url = '/etenantsvr/fellow/resident/insertInfo';
					params = {
						tenantId: this.$store.state.obj.id,
						addResidentId: this.$store.state.obj.identityNumber,
						fellowResidentName: this.$store.state.obj.tenant,
						mobilePhone: this.data[1],
						idCard: this.data[2],
						idCardFront: this.pic1=='../../static/other/upload_position.png'?'':this.pic1,
						idCardBack: this.pic2=='../../static/other/upload_opposite.png'?'':this.pic2,
						relation: this.addon,
						residentId: this.data[2],
						addName: this.data[0],
						addMobilePhone: this.$store.state.obj.tenantPhone,
						addIdCard: this.$store.state.obj.identityNumber,
						addIdCardFront: this.$store.state.obj.idCardPhoto,
						addIdCardBack: this.$store.state.obj.idCardPhoto
					};
				}
				if (params.mobilePhone && params.idCard && params.addName && params.relation != '请选择') {
					if (params.mobilePhone.length != 11) {
						uni.showToast({
							title: '手机格式错误'
						})
					} else if (params.idCard.length != 18) {
						uni.showToast({
							title: '身份证格式不正确'
						})
					} else {
						let res = await this.util.request({
							url: url,
							method: 'post',
							data: params
						});
						console.log(res)
						if (res.code == '0') {
							if (this.type == 1) {
                               uni.showToast({
                               	    title:'添加同住人成功'
                               })
							} else {
								uni.showToast({
									title: '编辑同住人成功'
								})
							}

							setTimeout(function() {
								uni.navigateBack({
									delta: -1
								})
							}, 1500)
						}
					}
				} else {
					uni.showToast({
						title: '请输入完整信息'
					})
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

	button {
		width: 90%;
		bottom: 10upx;
		left: 5%;
		position: fixed;
		bottom: 15upx;
	}
</style>
