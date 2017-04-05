<template>
	<div class="prevInfo">
		<div class="header">
			<h2>{{disInfo.name}}</h2>
			<div class="starGrade">
				<!-- 注意這裡使用了star組件 -->
				<mt-star :size="36" :score="disInfo.score" class="star"></mt-star>
			</div>
			<div class="delivery">
				<span class="rightBorder">{{disInfo.minDeliveryInfo}} <em>￥</em>{{disInfo.minDelivery}}</span>
				<span class="rightBorder">{{disInfo.deliveryPriceInfo}} <em>￥</em>{{disInfo.deliveryPrice}}</span>
				<span>{{disInfo.deliveryTime}}</span>
				<p>{{disInfo.deliveryTimePeriodInfo}}: {{disInfo.deliveryTimePeriod}}</p>
			</div>
		</div>
		<div class="centerLine">
			<div class="left"></div>
			<div class="center">{{disInfo.discountInfo}}</div>
			<div class="right"></div>
		</div>
		<div class="item">
			<div><i class="subtract"></i>{{disInfo.subtract}}</div>
	        <div><i class="special"></i>{{disInfo.special}}</div>
	        <div><i class="discount"></i>{{disInfo.discount}}</div>
		</div>
	</div>
</template>

<script>
	//注意這裡
	//引入star組件
	import Star from '../star/star'
	export default{
		props:{
			disInfo:Object,
		},
		methods:{

		},
		components:{
			// 注意這裡
	      'mt-star':Star
	    },
	}
</script>

<style lang="less" scoped>
	.prevInfo{
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 30;
		padding: 80px 15px;
		background-image:-webkit-linear-gradient(180deg, #a49faa,#a59092,#a6837b,#a47764,#945e4b,#7e4f3d,#643c33,#533329);
		.header{
			padding-bottom: 40px;
			h2{
				width: 100%;
				text-align: center;
				font-size: 16px;
				color: #fff;
				font-weight: bold;
				height: 30px;
				line-height: 30px;
				//添加star评级后要删掉的
				margin-bottom: 10px;
			}
			.starGrade{
				.star{
					text-align: center;
					height: 30px;
				}
			}
			.delivery{
				text-align: center;
				height: 30px;
				color: #cfc1bd;
				font-size: 12px;
				.rightBorder{
					display: inline-block;
					padding-left: 2px;
					padding-right: 5px;
					border-right: 1px solid #cfc1bd;
				}
				p{
					margin-top: 15px;
				}
			}
		}
		.centerLine{
			display: flex;
			margin-bottom: 20px;
			.left{
				flex:2;
				border-bottom: 1px solid #fff;
			}
			.center{
				flex:1;
				position: relative;
				top: 6px;
				text-align: center;
			}
			.right{
				flex:2;
				border-bottom: 1px solid #fff;
			}
		}
		.item{
			div{
				height: 24px;
				line-height: 24px;
				font-size: 12px;
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
</style>