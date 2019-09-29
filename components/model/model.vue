<template>
	<view v-if="show" @touchmove.stop.prevent>
		<view class="bg" @click="hide"></view>
		<view class="pop" ref="mypop">
			<slot></slot>
		</view>
	</view>
</template>
<script>
	export default {
		name:'model',
		props:{
		},
		data() {
			return {
				show:true
			}
		},
		methods:{
			hide() {
				this.show=false
			}
		}
	}
</script>

<style scoped>
	.pop{
		width:100%;
		background:#fff;
		position:fixed;
		z-index:101;
		bottom:0;
		padding-top:30upx;
		left:0;
		border-radius:48upx 48upx 0 0;
	}
	.pop>.config-title{
		margin-left:30upx
	}
	.pop .config-item{
		background:#fff;
	    width:20%;
		margin:20upx 0;
	}
	.bg{
		position: absolute;
		background-color: rgba(0,0,0,0.5);
		z-index: 100;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
</style>
