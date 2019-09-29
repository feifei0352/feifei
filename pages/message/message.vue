<template>
	<view class="message-contain">
		<cmd-cell-item title="插槽" slot-left addon="附加文案">
			<cmd-avatar icon='user' :size="50" :make="{'color':'#2f86f6','background':'#111a34'}"></cmd-avatar>
		</cmd-cell-item>
	</view>
</template>

<script>
	import cmdAvatar from '@/components/cmd-avatar/cmd-avatar.vue'
	import cmdIcon from '@/components/cmd-icon/cmd-icon.vue'
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	export default {
		components:{
			cmdAvatar,
			cmdIcon,
			cmdCellItem
		},
		data(){
			return{
				
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
