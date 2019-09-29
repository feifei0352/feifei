<!-- 
*  周晨辉 
*  2019/6/28
*  -->
<template>
	<view class="complain-contain">
		<view class="complain-title">请选择投诉理由(可多选):</view>
		<view class="complain-reasons">
			<view v-for="(item, index) in reasons" :class="{ checked: checkedList.includes(index) }" :key="index" @click="choose(index)">{{ item }}</view>
		</view>
		<view class="complain-morereasons">
			<text class="wordwrap">{{ textLength }}/50</text>
			<textarea cols="30" rows="5" :maxlength="maxlength" placeholder="更多投诉详情(非必填)" v-model="text" ref="description"></textarea>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				reasons: [
					'不讲（公共）卫生',
					'大声喧哗吵闹，影响他人休息',
					'不讲秩序，霸占公共区域',
					'浪费水、电、气等公共资源',
					'态度蛮横，难以沟通',
					'经常带人回家，影响正常居住',
					'其他'
				],
				text: '',
				textLength: 0,
				maxlength: 50,
				checkedList: [],
				content: '',
				id: '',
				uid: '',
				showPopup: true
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.uid = options.uid
		},
		methods: {
			back() {
				uni.navigateTo({
					url: './friendDetail',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			async onNavigationBarButtonTap() {
				for (var item of this.checkedList) {
					this.content += this.reasons[item]
				}
				var tenantId = this.$store.state.id;
				if (this.content != '') {
					let res = await this.util.request({
						url: '/etenantsvr/tenant/tenantComplain',
						method: 'post',
						data: {
							tenantId: tenantId,
							uid: this.uid,
							content: this.content,
							complainDetail: this.text,
							complainTenantId: this.id
						}
					});
					uni.showToast({
						title: res.msg
					});
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						});
					}, 1500)
				}else{
					uni.showToast({
						title:'请选择投诉理由',
						icon:'none'
					});
				}
			},
			choose(i) {
				//判断选项是否被选中，即选中的数组里是否存在改选项
				if (this.checkedList.includes(i)) {
					this.checkedList = this.checkedList.filter(function(ele) {
						return ele != i;
					});
				} else {
					this.checkedList.push(i);
				}
			}
		},
		watch: {
			text(value) {
				this.textLength = value.length;
			}
		}
	};
</script>

<style>
	.complain-contain {
		padding: 40upx 36upx;
		font-size: 32upx;
		color: #b5b5b5;
	}

	.complain-title {
		color: #333333;
		margin-bottom: 40upx;
		margin-top: 40upx;
	}

	.complain-reasons>view {
		border: 1px solid rgba(194, 194, 194, 1);
		height: 88upx;
		line-height: 88upx;
		border-radius: 4px;
		text-align: center;
		margin-bottom: 20upx;
	}

	.complain-morereasons {
		border: 1px solid rgba(194, 194, 194, 1);
		border-radius: 4px;
		margin-top: 70upx;
	}

	.wordwrap {
		float: right;
		margin: 270upx 8upx 0 0;
	}

	.checked {
		background: #fff8ed;
		color: #f2a43d;
		border: 1px solid rgba(252, 174, 71, 1);
	}
</style>
