<template>
	<view class="about-contant">
		<p class="title">公司简介</p>

		<p>杭州恋家网络科技有限公司成立于2017年，是专注于住房租赁市场智慧生态圈构建的一家新型互联网企业。</p>
		<p>公司创始团队拥有丰富的互联网从业经验，且在房产行业深耕多年。公司成立以来，产品不断优化，业务模式不断得到验证，用户数量实现稳步增长。</p>
		<p>
			恋家科技是行业内首家提出构建租房市场智慧生态圈的企业，瞄准住房租赁市场未来的巨大潜力，立足于我国住房租赁市场现阶段不规范、效率低、发展缓慢的现状，深入洞察租房市场各方的痛点，整合行业上下游资源，通过E房东、E房东（企业版）、E租客和E工长四大核心产品，独特性地开创租客转租客的租房新模式，聚焦并赋能个人房东，打造C2C的去中介化服务模式。
		</p>
		<p>
			恋家科技立志做租房界的“大众点评”，通过租房管理体系、信用体系、积分体系、评价体系将租房与服务相结合，由租房后市场切入，进而转租前，用云端智慧助力房东解决租前、租后的管理难题，进而解决长租市场虚假房源信息多、出租双方信息匹配低的难题，有效地解决行业痛点，极大地释放行业活力，提升行业服务标准。
		</p>
		<p>
			恋家科技一直秉承着“让人们住得更美好”的经营理念，未来，将凭借独特的创新模式和丰富的行业内外资源，将租房生态圈延伸到整个居家生活生态圈，充分利用积累的大数据资源，切入社交领域，拓展人工智能服务，成为用户的智能生活管家，构建全新的智慧居家生活服务平台。
		</p>
		<p style="margin-top:40upx">使命：</p>
		<p>幸福居家每一天</p>
		<p>愿景：</p>
		<p>构建居家生活智慧生态圈</p>
		<p>核心价值观：</p>
		<p>客户为尊，开放进取，诚信务实，共享协作</p> 
	</view>
</template>
<script>
	export default{
		data(){
			return{
				aboutUs:''
			}
		},
		onLoad(){
			this.show()
		},
		methods:{
			async show(){
				let res= await this.util.request({
					url:'/lianjiauser/public/aboutUs',
					methods:'post',
				});
				this.aboutUs=res.data.obj.aboutUs
			}
		}
	}
</script>
<style>
body{
	background:#fff
}
p {
	font-size: 34upx;
	line-height:50upx;
}
p.title{
	margin-bottom:50upx;
}
.about-contant{
	width: 94%;
	margin-left: 3%;
	padding:50upx 0;
}
</style>
