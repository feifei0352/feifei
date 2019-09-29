<template>
	<view>
		<!-- <page-head :title="title"></page-head> -->
		<view class="uni-common-mt">
			<view><map :style="{ height: height + 'px', width: width + 'px' }" :latitude="latitude" :longitude="longitude" :markers="markers" :polyline="polyline"></map></view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			activeColor: true,
			width: '',
			height:'',
			title: 'map',
			latitude: '',//39.909,
			longitude: '',//116.39742,
			markers: [
				{
					latitude: '',//39.9085,
					longitude: '',//116.39747,
					iconPath: '../../static/location@3x.png'
				}
			]
		};
	},
	onReady() {
		var _self = this;
		uni.getSystemInfo({
			success: function(res) {
				_self.width = res.windowWidth;
				_self.height = res.windowHeight;
				
			}
		});
		uni.getLocation({
			type: 'gcj02',
			success: function (res) {
				_self.longitude=res.longitude;
				_self.latitude=res.latitude;
				_self.markers[0].longitude=res.longitude;
				_self.markers[0].latitude=res.latitude;
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
			}
		});
	},
	methods: {}
};
</script>
<style>
map {
}
</style>
