<template>
	<view>		
		<view class="set">
			<button type="primary" @click="name">选择日期</button>
			<view class="zhi">{{inputValue}}</view>
		</view>
		
		
		<!-- 放入页面调用 -->
		<sen-set-picker ref="setpicker" :shixian="shixian" @quxiaoButton="quxiaobutton" @quedingButton="quedingbutton"></sen-set-picker>
		
	</view>
</template>

<script>
	// 引入组件
	import senSetPicker from '../../components/sen-pickerview/picker-view-set.vue'
	export default {
		components: {
			senSetPicker
		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				inputValue : currentDate,
				shixian : false
			}
		},
		methods: {
			name : function () {
					this.$refs.setpicker.confirm(this.inputValue);
					this.shixian = true;				
			},
			quxiaobutton : function () {
					this.shixian = false;
			},
			quedingbutton : function(bangdingyear,bangdingmonth,bangdingday){
					this.shixian = false;
					this.inputValue = bangdingyear + "-" + bangdingmonth + "-" + bangdingday;
				
			},
			getDate(type) {
				const date = new Date();
			
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}else if(type === 'now') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
			
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>
	
<style>
	.set{
		width: 100%;
	}
	.set button{
		width: 50%;
		float: right;
		line-height:60upx;
	}
	.zhi{
		width: 50%;
		float: left;
		line-height: 60upx;
	}
</style>