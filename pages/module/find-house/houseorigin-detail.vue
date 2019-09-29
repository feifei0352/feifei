<template>
	<view>
		<uni-nav-bar @click-left="back" @click-right="inform" left-icon="back" backgroundColor="rgba(255,255,255,0)" rightText="举" color="#fff"  style="width:96%;position:fixed;top:50upx;left:0">
			<view  slot="right">报</view>
		</uni-nav-bar>
        <image style="width:100%;height:426upx;" src="http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg"></image>
		
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				
			}
		},
		methods: {
            back() {
				uni.navigateBack({
					delta:-1
				})
			},
			inform() {
				uni.navigateTo({
					url:'inform'
				})
			}
		}
	}
</script>

<style>
</style>
