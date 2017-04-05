<template>
	<div class="swiper">
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide"><i class="subtract"></i>新注册用户下单立减15元，首次使用银行卡支付最高再减3元</div>
		        <div class="swiper-slide"><i class="special"></i>{{info.special}}</div>
		        <div class="swiper-slide"><i class="discount"></i>{{info.discount}}}</div>
		    </div>
		</div>
		<div class="activityCount">
			<div class="activityWrap">
				<em>{{info.activityCount}}</em><i class="icon-nextSmall"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			info:Object
		},
		data(){
			return{
				//弹出层的判断条件
				showDiscountInfo:false,
			}
		},
		mounted(){
			var mySwiper = new Swiper ('.swiper .swiper-container', {
			    loop: true,
			    //分页器
			    direction : 'vertical',
			    autoplay : 1000, //自动轮播
			    autoplayDisableOnInteraction : false, //用户操作之后还可以自动轮播
			});
			$('.swiper .swiper-container').on("touchstart",function(){
				mySwiper.stopAutoplay();
			});
			$('.swiper .swiper-container').on("touchend",function(){
				mySwiper.startAutoplay();
			})
		},
		components:{

		},
		methods:{

		}
	}
</script>

<style lang="less" scoped>
	.swiper{
		display: flex;
		margin: 0 10px 0 10px;
		font-size: 12px;
		.swiper-container{
			flex:4;
			.swiper-wrapper{
				height:30px;
				.swiper-slide{
					height: 30px;
					line-height: 30px;
					white-space:nowrap;
					text-overflow:ellipsis;
					overflow: hidden;
					i{
						display: inline-block;
						width: 12px;
						height: 12px;
						margin-right: 4px;
						position: relative;
						top: 2px;
					}
					.discount{
						background-image:url(discount_1@2x.png);
						background-size:12px 12px;
					}
					.subtract{
						background-image:url(decrease_1@2x.png);
						background-size:12px 12px;
					}
					.special{
						background-image:url(special_1@2x.png);
						background-size:12px 12px;
					}
				}
			}
		}
		.activityCount{
			flex:1;
			.activityWrap{
				float: right;
				height: 30px;
				line-height: 30px;
				i{
					position: relative;
					top: 1px;
				}
			}
		}
	}
</style>