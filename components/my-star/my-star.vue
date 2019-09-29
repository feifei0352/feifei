<template>
	<view class="stars">
		<text v-show="tittle" class="my-title">{{tittle}}</text>
		<image v-for="(item,index) of rate" :src="item.url" :key="index" @click="select(index)"></image>
	</view>
</template>
<script>
	export default {
		props:["tittle"],
		name:'star',
		data() {
			return{
				rate:[
					{url:'../../../static/icon/stars_lightup@2x.png'},
					{url:'../../../static/icon/stars_lightup@2x.png'},
					{url:'../../../static/icon/stars_lightup@2x.png'},
					{url:'../../../static/icon/stars_lightup@2x.png'},
					{url:'../../../static/icon/stars_lightup@2x.png'}
			    ],
				rates:0
			}	
		},
		methods:{
			select(i) {
			    for(let j = 0; j <= i; j++) {
					this.rate[j].url='../../../static/icon/stars_light@2x.png';
				}
				if(i<this.rate.length-1) {
					for(let k = i+1; k<this.rate.length;k++) {
					    this.rate[k].url='../../../static/icon/stars_lightup@2x.png';
				    }
				}
				this.rates=i+1;
				this.$emit('input',this.rates);
			}
		}
	}
</script>
<style scoped>
	.stars{
		height:100upx;
		line-height: 100upx;
	}
	.stars>image{
		width:42upx;
		height:42upx;
		margin-right:32upx;
		vertical-align: middle;
	}
	.my-title{
		vertical-align: middle;
		display:inline-block;
		font-size:32upx;
		color:#999999;
		margin-right:120upx
	}
</style>