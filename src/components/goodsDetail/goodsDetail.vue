<template>
	<transition name="fade">
		<div class="goodsDetail" v-show="show">
			<div class="detail-hd">
				<img :src="food.image" alt="">
				<div class="back icon-prev" @click="show=false"></div>
			</div>
			<div class="detail-bd">
				<div class="food-basic">
					<h2>{{food.name}}</h2>
					<p class="sale"><span>月售{{food.sellCount}}</span> <span>好评率{{food.rating}}</span></p>
					<p class="price"><strong>￥{{food.price}}</strong> <span v-if="food.oldPrice">￥{{food.oldPrice}}</span></p>
					<div class="carControlWrapper">
						<mt-carControl :food="food"></mt-carControl>
					</div>
					<transition name="fadeAddBuyCar">
						<div class="buy" v-show="!food.count||food.count===0" @click="addFirst(food,$event)">
							加入购物车
						</div>
					</transition>
				</div>
				<div class="food-info" v-show="food.info">
					<p class="title">商品信息</p>
					<p class="info">{{food.info}}</p>
				</div>
				<div class="food-eval">
					<div class="eval">商品评价</div>
					<div class="wrap">
						<p class="icon-support"><i>28</i></p>
						<p class="icon-oppose"><i>3</i></p>
						<div class="progress"></div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	//引入加减(CarControl)组件
  	import CarControl from '../CarControl/CarControl'
  	//引入Vue
  	import Vue from 'vue'
	export default{
		props : {
			food: {
				type : Object,
			}
		},
		data(){
			return{
				show:false,
			}
		},
		methods:{
			showFood(){
				this.show=true;
			},
			addFirst(food,$event){
				Vue.set(food,'count',1);
			}
		},
		components:{
			'mt-carControl':CarControl
		},
		created(){
			
		},
		mounted(){
			var bar = new ProgressBar.Line('.progress', {
			  	strokeWidth: 5,
			 	easing: 'easeInOut',
			  	duration: 1400,
			  	color: '#FFEA82',
			  	trailColor: '#eee',
			  	trailWidth: 5,
			  	svgStyle: {width: '100%', height: '100%',borderRadius:'5px'},
			  	text: {
			    style: {
			      // Text color.
			      // Default: same as stroke color (options.color)
			      	color: '#999',
			      	position: 'absolute',
			      	right: '0',
			      	top: '30px',
			      	padding: 0,
			      	margin: 0,
			      	transform: null
			    },
			    	autoStyleContainer: false
			  	},
			  	from: {color: '#FFEA82'},
			  	to: {color: '#ff6633'},
			  	step: (state, bar) => {
			    	bar.setText(Math.round(bar.value() * 100) + ' %');
			    	bar.text && (bar.text.style.left = 45+'%'); 
			  	}
			});
			bar.animate(0.97);  // Number from 0.0 to 1.0
		},
	}
</script>

<style lang="less" scoped>
	.goodsDetail{
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 46px;
		background-color: #fff;
		z-index: 10;
		.detail-hd{
			img{
				width: 100%;
				height: 300px;
			}
			.icon-prev{
				color: #fff;
				width: 20px;
				height: 20px;
				font-size: 20px;
				position: fixed;
				top: 20px;
				left: 20px;
			}
		}
		.detail-bd{
			width: 100%;
			box-sizing: border-box;
			padding: 0 20px;
			.food-basic{
				position: relative;
				padding-bottom: 10px;
				border-bottom: 1px solid rgb(239,239,239);
				h2{
					font-size: 16px;
					font-weight: bold;
					line-height: 30px;
					margin-top: 10px;
				}
				p.sale{
					font-size: 12px;
					color: #a3a3a3;
					line-height: 20px;
					span{
						margin-right: 6px;
					}
				}
				p.price{
					strong{
						font-size: 16px;
						color: green;
						line-height: 30px;
						font-weight: bold;
						margin-right: 6px;
					}
					span{
						font-size: 12px;
						color: #a3a3a3;
						text-decoration: line-through;
					}
				}
				.carControlWrapper{
					position: absolute;
					right: 12px;
					bottom: 12px;
				}
				.buy{
					position: absolute;
					right: 18px;
					bottom: 18px;
					z-index: 11;
					height: 24px;
					line-height: 24px;
					padding: 0 12px;
					box-sizing:border-box;
					color: #fff;
					background-color: rgb(0,120,60);
					border-radius: 12px;
					font-size: 10px;
				}
			}
			.food-info{
				.title{
					font-size: 12px;
					color: #a3a3a3;
					border-left: 2px solid green;
					padding-left: 4px;
					margin-bottom: 15px;
					margin-top: 15px;
				}
				.info{
					font-size: 12px;
					color: #454545;
					line-height: 20px;
					text-indent: 24px;
				}
			}
			.food-eval{
				.eval{
					font-size: 12px;
					color: #a3a3a3;
					border-left: 2px solid green;
					padding-left: 4px;
					margin-top: 15px;
					margin-bottom: 15px;
				}
				.wrap{
					position: relative;
					background-color: red;
					.icon-support{
						position: absolute;
						top: 11px;
						left: 20px;
						width: 12px;
						height: 12px;
						color: #ff6633;
						font-size: 16px;
						i{
							font-size: 12px;
						}
					}
					.icon-oppose{
						position: absolute;
						top: 13px;
						right: 20px;
						width: 12px;
						height: 12px;
						color: #b9b9b9;
						font-size: 12px;
						i{
							font-size: 12px;
						}
					}
					.progress{
						margin: 20px;
	  					width: 80%;
	  					height: 8px;
	 					position: absolute;
	 					top: 5px;

	 					/* 
	 					div.progressbar-text{
	 						position: absolute;
	 						top: -24px!important;
	 						right: 117px!important;
	 					} */
					}
				}
			}
		}
	}
	//页面的消失出现的过渡动画设置
	.fade-enter-active,.fade-leave-active{
		transition:all 0.4s;
	}
	.fade-enter,.fade-leave-active{
		transform:translateX(100%);
		opacity: 0;
	}

	//加入购物车这5个字出现消失的动画
	.fadeAddBuyCar-enter-active,.fadeAddBuyCar-leave-active{
		transition:all .5s;
	}
	.fadeAddBuyCar-enter,.fadeAddBuyCar-leave-active{
		opacity: 0;
	}
</style>