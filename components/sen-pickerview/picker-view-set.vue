<template>
	<view class="zhezhao" v-show="shixian">
		<view class="xuanzeqi">
			<view class="quxiaoqueren">
				<view class="quniu" @click="quxiaobutton">取消</view>
				<view class="queniu" @click="quedingbutton">确定</view>
			</view>
			<picker-view v-if="visible" class="shigun" :indicator-style="indicatorStyle" :value="values" @change="bindChange">					
				<picker-view-column>
					<view class="itemd" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="itemd" v-for="(item,index1) in months" :key="index1">{{item > 9 ? item : '0' + item}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="itemd" v-for="(item,index2) in days" :key="index2">{{item > 9 ? item : '0' + item}}日</view>
				</picker-view-column>
			</picker-view>
		</view>	
	</view>
</template>

<script>
	export default {
		props: {
			shixian : Boolean
		},
		data() {
			const date = new Date();
			const years = [];
			const year = date.getFullYear()+10
			const months = []
			let month = date.getMonth() + 1
			const days = []
			let day = date.getDate()
			for (let i = 2015; i <= date.getFullYear()+10; i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				title: 'picker-view',
				years,
				year,
				months,
				month,
				days,
				day,
				values: [],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			};
		},
		methods: {	
			confirm(value){
				var dates = value.split("-");
				this.values[0] = dates[0] - 2015;
				this.values[1] = dates[1] - 1;
				this.values[2] = dates[2] - 1;
				this.year = dates[0];
				this.month = dates[1];
				this.day = dates[2];
			}, 
			bindChange: function (e) {
				const val = e.detail.value
				if( val.length > 0 ){
					this.year = this.years[val[0]]
					// this.month = this.months[val[1]] > 9 ? this.month : '0' + this.months[val[1]];
					if (this.months[val[1]] > 9) {
						this.month = this.months[val[1]];
					}else{
						this.month = '0' + this.months[val[1]];
					}
					// this.day = this.days[val[2]] > 9 ? this.month : '0' + this.days[val[2]];
					if (this.days[val[2]] > 9) {
						this.day = this.days[val[2]];
					}else{
						this.day = '0' + this.days[val[2]];
					}
				}				
			},
			quxiaobutton () {
				this.values = [9999, this.month - 1, this.day - 1];
				this.$emit('quxiaoButton');
			},
			quedingbutton () {

				this.values = [9999, this.month - 1, this.day - 1];
				console.log(this.year,this.month,this.day)
				this.$emit('quedingButton',this.year,this.month,this.day);	
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.zhezhao{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0upx;
		right: 0upx;
		bottom: 0upx;
		left: 0upx;
		-webkit-transition: 0.15s;
		background: rgba(0,0,0,.5);
		z-index: 10;
	}
	.xuanzeqi{
		width: 100%;	
		background-color: #FFF;
		height: 500upx;
		position: absolute;
		bottom: 0upx;
		left: 0upx;
		z-index: 20;
		display: block;
	}
	.quxiaoqueren{
		height: 80upx;
		width: 100%;
		display: block;
		border-bottom: 1px solid #D8D8D8;
		position: relative;
		top: 0upx;
		left: 0upx;
	}
	.quniu{
		width: 80upx;
		border-radius: 6upx;
		height:50upx;
		line-height: 50upx;
		text-align: center;
		color: #000;
		float: left;
		margin-left: 20upx;
		font-size: 30upx;
		display: block;
		margin-top: 15upx;
	}
	.queniu{
		width: 80upx;
		border-radius: 6upx;
		height:50upx;
		line-height: 50upx;
		background-color: #19B955;
		text-align: center;
		color: #FFF;
		float: right;
		display: block;
		font-size: 30upx;
		margin-right: 20upx;
		margin-top: 15upx;
	}
	.shigun{
		background-color: #FFF;
		width: 80%;
		display: block;
		height: 500upx;
		margin: 0 auto;
	}
	.itemd{
		text-align: center;
		justify-content: center;
	}
</style>