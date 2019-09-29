<!-- 
*   周晨辉
*   2019/6/26
*  -->
<template>
	<view>
		<view class="request-contain">
			<view class="choose-date" @click="name">
				<view class="tuizu" v-if="type === '0'">
					选择退租日期
					<view class="zhi">
						{{ date2 }}
						<uni-icon type="forward" size="26"></uni-icon>
					</view>
				</view>
				<view v-else>
					<view class="qizu">
						起租日期
						<text>{{date1}}</text>
					</view>
					<view class="daozu">
						到租日期
						<view class="zhi">
							{{inputValue}}
							<uni-icon type="forward" size="26"></uni-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="reason">
				<text>{{ requestData.reasonTitle }}</text>
				<textarea value="" :placeholder="requestData.placeholder" v-model="text" />
				<button class="submit" :style="styleObj" @click="submit">提交</button>
			</view>
		</view>
		<view class="request-message">
			<view class="request-warn" v-for="(item, index) in requestData.message" :key="index">{{ item }}</view>
		</view>
		<sen-set-picker ref="setpicker" :shixian="shixian" @quxiaoButton="quxiaobutton" @quedingButton="quedingbutton"></sen-set-picker>
	</view>
</template>
<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import senSetPicker from '@/components/sen-pickerview/picker-view-set.vue';
export default {
	components: {
		uniIcon,
		senSetPicker
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			requestData: {},
			startDate:'',
			inputValue: '',
			shixian: false,
			type: '',
			text: '',
			styleObj: '',
			tenantId: '',
			uid: '',
			tenancyNum: '',
			date1:'',
			date2:'',
		};
	},
	watch: {
		text(val) {
			if (this.type === '0') {
				if (val != '') {
					this.styleObj = 'background:#2FC8D6';
				} else {
					this.styleObj = '';
				}
			}
		}
	},
	onLoad(options) {
		this.type = options.type;
		this.tenantId = options.tenantId;
		this.uid = options.uid;
		this.tenancyNum = options.tenancyNum;
		this.inputValue=options.endDate;
		this.date2=options.endDate;
		this.startDate=options.startDate;
		//续租请求起始日
		var date1=this.util.addDate(options.endDate,1);
		this.date1=date1;
		//续租请求到期日
		var days=this.util.subtract(options.endDate,options.startDate)
		this.inputValue=this.util.addDate(date1,days);	
		if (options.type === '0') {
			uni.setNavigationBarTitle({
				title: '退租请求'
			});
			this.requestData = {
				message: [
					'1、提前退租请求将发送至房东进行确认处理',
					'2、发送退租请求后，注意查收房东确认消息',
					'3、一当提前退租，租房合同终止',
					'4、提前退租不予退还押金，务必谨慎'
				],
				reasonTitle: '退租理由',
				placeholder: '请填写退租理由(工作调动、出国等) 200字以内'
			};
		} else {
			uni.setNavigationBarTitle({
				title: '续租请求'
			});
			this.requestData = {
				message: ['1、续租请求将发送至房东进行确认', '2、发送续租请求后，注意查收房东确认消息', '3、由房东操作续租，一当续租成功，新的续租合同即刻生效'],
				reasonTitle: '备注',
				placeholder: '续租后新的合同，房租要求等(200字以内)'
			};
			this.styleObj = 'background:#2FC8D6';
		}
	},
	methods: {
		//通过传来的参数判断是退租请求还是续租请求,改变pages里的title
		async show(url, obj) {
			let res = await this.util.request({
				url: url,
				method: 'post',
				data: obj
			});
			if (res.code == '0') {
				uni.showToast({
					title: res.msg
				});
				setTimeout(function() {
					uni.navigateBack({
						delta: 1
					});
				}, 1500);
			}
		},
		submit() {
			var url, obj;
			if (this.type === '0') {
				url = '/etenantsvr/tenant/sendSurrenderRequest';
				obj = { tenantId: this.tenantId, uid: this.uid, tenancyNum: this.tenancyNum, surrenderTime: this.date2, cause: this.text };
			} else {
				url = '/etenantsvr/tenant/sendReletRequest';
				obj = { tenantId: this.tenantId, uid: this.uid, tenancyNum: this.tenancyNum, startDate: this.startDate, endDate: this.inputValue, remark: this.text };
			}
			if(this.text!=''){
				this.show(url, obj);
			}
		},
		name: function() {
			if(this.type==0){
				this.$refs.setpicker.confirm(this.date2);
			}else{
				this.$refs.setpicker.confirm(this.inputValue);
			}
			this.shixian = true;
		},
		//取消选择，返回默认状态
		quxiaobutton: function() {
			this.shixian = false;
		},
		//确定日期
		quedingbutton: function(bangdingyear, bangdingmonth, bangdingday) {
			this.shixian = false;
			if(this.type==0){
				this.date2 = bangdingyear + '-' + bangdingmonth + '-' + bangdingday;
			}else{
				this.inputValue = bangdingyear + '-' + bangdingmonth + '-' + bangdingday;
			}
		},
		//获取当天日期作为选择日期里的默认日期
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			} else if (type === 'now') {
				year = year;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;

			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style>
page {
	background: #f5f5f5;
}
.request-contain {
	background: #fff;
	padding: 0 36upx 42upx 36upx;
	margin-top: 40upx;
}
.choose-date {
	width: 100%;
	font-size: 32upx;
	line-height: 100upx;
	color: #999999;
	border-bottom: 1upx solid #ebebeb;
}
.reason {
	padding-top: 36upx;
	color: #999999;
}
.reason > textarea {
	font-size: 30upx;
	color: #000;
	margin-top: 20upx;
}
.submit {
	width: 678upx;
	height: 88upx;
	background: rgba(222, 224, 224, 1);
	border-radius: 4px;
	color: #fff;
	font-size: 32upx;
}
.request-message {
	padding: 36upx;
	color: #999999;
	font-size: 28upx;
}
.request-warn {
	margin: 10upx 0;
}
.zhi {
	display: inline-block;
	float: right;
	color: #000;
}
.qizu > text {
	display: inline-block;
	float: right;
	color: #000;
}
.hint {
	width: 166upx;
	height: 166upx;
	background: rgba(0, 0, 0, 0.4);
	text-align: center;
	color: #fff;
	font-size: 28upx;
	border-radius: 30upx;
	position: absolute;
	margin: auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
.hint > image {
	width: 56upx;
	height: 40upx;
	margin-top: 40upx;
}
</style>
