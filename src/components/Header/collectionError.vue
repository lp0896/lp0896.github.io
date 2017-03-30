<template>
	<div class="collectionOk">
		<i class="icon-starEmpty"></i>
		<p>取消收藏</p>
	</div>
</template>

<script>
	
</script>

<style lang="less" scoped>
	.collectionOk{
		width:90px;
		background:rgba(0,0,0,0.5);
		position: fixed;
		left: 50%;
		top:50%;
		border-radius: 10px;
		margin:-25px 0 0 -45px;
		z-index: 100;
		text-align: center;
		i{
			color: #19c719;
			font-weight: bold;
			display: inline-block;
			width: 100%;
			height: 20px;
			line-height: 20px;
		}
		p{
			font-size: 12px;
			color: #fff;
			height: 25px;
			line-height: 25px;
		}
	}
</style>