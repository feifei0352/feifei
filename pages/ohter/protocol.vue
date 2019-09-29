<template>
	<view v-html="protocol"></view>
</template>

<script>
	export default{
		data(){
			return{
				protocol:''
			}
		},
		onLoad(){
			this.show()
		},
		methods:{
			async show(){
				let res=await this.util.request({
					url: '/lianjiauser/public/queryUserAgreement',
					method: 'POST',
					data: {appType:'3'},
				});
				this.protocol=res.data.obj.content
			}
		}
	}
</script>

<style>
	body{
		background:#fff
	}
	view{
		width:94%;
		margin:30upx auto
	}
</style>
