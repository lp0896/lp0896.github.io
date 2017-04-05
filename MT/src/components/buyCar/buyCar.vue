<template>
	<div>
		<div class="buyCar">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo" :class="{'highlight':totalCount>0}">
							<span class="icon-buyCar" :class="{'highlight':totalCount>0}"></span>
						</div>
						<div class="num" v-show="totalCount>0">
							<!-- 注意计算属性的用法 -->
							{{totalCount}}
						</div>
					</div>
					<div class="price" :class="{'highlight':totalCount>0}">
						<em>￥</em>{{totalPrice}}
					</div>
					<div class="desc">
						另需配送费 <em>￥</em>{{seller.deliveryPrice}}元
					</div>
				</div>
				<div class="content-right" @click.stop="pay" :class="payClass" ref="contentRight">
					{{payDesc}}
				</div>
			</div>
			<!-- <div class="ball-container">
				<transition name="drop">
					<div v-for="ball in balls" v-show="ball.show" class="ball">
						<div class="inner"></div>
					</div>
				</transition>
			</div> -->
			<transition name="fold">
				<div class="buyCarList" v-show="listShow">
					<div class="listHead">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="listContent" ref="listContent">
						<ul>
							<li class="food" v-for="food in selectedFoods">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>￥{{food.price*food.count}}</span>
								</div>
								<div class="carControlWrapper">
									<mt-carControl :food="food"></mt-carControl>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="fade">
			<div class="listMask" v-show="listShow" @click="hideList"></div>
		</transition>
	</div>
</template>

<script>
  	import axios from 'axios'
  	import BScroll from 'better-scroll'
  	//引入加减(CarControl)组件
  	import CarControl from '../CarControl/CarControl'
	export default{
		props:{
			/*这个选中的商品是你点击加减按钮的时候，你往购物车加进去的那些商品*/
			selectedFoods:{
				type:Array,
				default(){
					return [];
				}
			}
		},
		data(){
			return{
				seller:{},
				balls:[
					{
						show:false,
					},
					{
						show:false,
					},
					{
						show:false,
					},
					{
						show:false,
					},
					{
						show:false,
					}
				],
				fold:true,
			}
		},
		components:{
			'mt-carControl':CarControl
		},
		created(){
		    var that = this;
		    axios.get('http://localhost:8089/api/data')
		    .then( function(response) {
		      	that.seller = response.data.data.seller;
		    })
		    .catch( function(error) {
		      	console.log(error);
		    })
	    },
	    computed:{
	    	totalPrice(){
	    		let total=0;
	    		// 利用你加进购物车里面的所有商品，来遍历这些商品，每个商品就是一个对象，总的商品就是一个大数组。以下叫遍历数组。数组的每个元素是一个对象。
	    		this.selectedFoods.forEach( (food)=>{
	    			total+=food.price * food.count;
	    		} )
	    		return total;
	    	},
	    	totalCount(){
	    		let count=0;
	    		this.selectedFoods.forEach( (food)=>{
	    			count += food.count;
	    		} )
	    		return count;
	    	},
	    	payDesc(){
	    		if (this.totalPrice===0) {
	    			let price=this.seller.minDelivery;
	    			return `￥${price}元起送`
	    		}
	    		else if( this.totalPrice < this.seller.minPrice){
	    			let diff = this.seller.minPrice - this.totalPrice;
	    			return `还差￥${diff}元起送`
	    		}
	    		else{
	    			return `去结算`;
	    		}
	    	},
	    	payClass(){
	    		if (this.totalPrice < this.seller.minPrice) {
	    			return 'not-enough';
	    		}
	    		else{
	    			return 'enough';
	    		}
	    	},
	    	//判断购物车列表是显示还是折叠
	    	listShow(){
	    		//这是判断总数为0的情况，那就折叠
	    		if (!this.totalCount) {
	    			this.fold = true;
	    			return false;
	    		}
	    		let show=!this.fold;
	    		if (show) {
	    			this.$nextTick( ()=>{
	    				if (!this.scroll) {
	    					//如果这个this.scroll不存在，才new，存在了，就不new
	    					this.scroll=new BScroll(this.$refs.listContent,{
		    					click: true
		    				});
	    				}
	    				else{
	    					//如果已经new了这个this.scroll，我们就必须要再new了，直接利用bs的一个api：refresh就可以了。
	    					this.scroll.refresh();
	    				}
	    			});
	    		}
	    		return show;
	    	}
	    },
	    methods:{
	    	toggleList(){
	    		//这就是为0的时候，就是购物车没有商品的时候。
	    		if (!this.totalCount) {
	    			return;
	    		}
	    		this.fold=!this.fold;
	    		//有内容时，一点击下面的内容，fold就是false。同时，listshow就是true。就是让列表显示，就是让他往上进来。其实，这个列表默认在上面的。一点击，就是让他进来。
	    	},
	    	empty(){
	    		this.selectedFoods.forEach( (food)=>{
	    			food.count=0;
	    		})
	    	},
	    	hideList(){
	    		this.fold = true;
	    	},
	    	pay(){
	    		if (this.totalPrice<this.seller.minPrice) {
	    			return;
	    		}
	    		else{
	    			alert(`去支付${this.totalPrice}元`)
	    		}
	    	},
	    }
	}
</script>

<style lang="less" scoped>
	.buyCar{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 20;
		width: 100%;
		height: 46px;
		.content{
			display: flex;
			background-color: #141d27;
			height: 46px;
			.content-left{
				flex:1;
				font-size: 0;/* 
				background-color: red; */
				position: relative;
				.logo-wrapper{
					display: inline-block;
					position: absolute;
					top: -12px;
					margin: 0 12px;
					padding: 6px;
					width: 56px;
					height: 56px;
					box-sizing: border-box;
					vertical-align: top;
					border-radius: 50%;
					background-color: #141d27;
					.logo{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background-color: #2b343c;
						text-align: center;
						&.highlight{
							background-color: rgb(0,160,220);
						}
						.icon-buyCar{
							font-size: 24px;
							color: #80858a;
							line-height: 44px;
							&.highlight{
								color: #fff;
							}
						}
					}
					.num{
						position: absolute;
						top: 0;
						right: 0;
						width: 24px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-size: 9px;
						font-weight: bold;
						color: #fff;
						background-color: rgb(240,20,20);
						box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
					}
				}
				.price{
					display: inline-block;
					position: absolute;
					left: 70px;
					vertical-align: top;
					padding-right: 10px;
					margin-top: 16px;
					line-height: 16px;
					box-sizing: border-box;
					border-right: 1px solid rgba(255,255,255,.5);
					color: rgba(255,255,255,.4);
					font-size: 16px;
					font-weight: bold;
					&.highlight{
						color: #fff;
						font-size: 18px;
					}
				}
				.desc{
					display: inline-block;
					position: absolute;
					right: 30px;
					vertical-align: top;
					line-height: 24px;
					margin-left: 12px;
					margin-top: 12px;
					color: rgba(255,255,255,.4);
					font-size: 10px;
				}
			}
			.content-right{
				flex:0 0 105px;
				width: 105px;
				background-color: #2b333b;
				vertical-align: top;
				color: rgba(255,255,255,.4);
				margin-left: 12px;
				font-size: 12px;
				font-weight: bold;
				line-height: 46px;
				text-align: center;
				&.not-enough{
					background-color: #2b333b;
				}
				&.enough{
					background-color: #00b43c;
					color: #fff;
				}
			}
		}
		/* .ball-container{
			.ball{
				position: fixed;
				left:32px;
				bottm:22px;
				z-index:200;
				&.drop-transition{
					transition:all 0.4s;
					.inner{
						width: 16px;
						height: 16px;
						border-radius: 50%;
						background-color: rgb(0,160,220);
						transition:all 0.4s;
					}
				}
			}
		} */
		.buyCarList{
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: -1;
			width: 100%;
			padding-bottom: 46px;
			.listHead{
				height: 40px;
		        line-height: 40px;
		        padding: 0 18px;
		        background-color: orange;
		        /* background: #f3f5f7; */
		        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		        .title{
					float: left;
	          		font-size: 14px;
	          		color: rgb(7, 17, 27);
				}
	        	.empty{
	        		float: right;
	          		font-size: 12px;
	          		color: rgb(0, 160, 220);
	        	}
			}
			.listContent{
				padding: 0 18px;
				max-height: 196px;
				overflow: hidden;
				background: #fff;
				.food{
					position: relative;
					padding: 12px 0;
					box-sizing: border-box;
					border-bottom: 1px solid rgba(7, 17, 27, 0.1);
					.name{
		         		line-height: 24px;
		            	font-size: 14px;
		            	color: rgb(7, 17, 27);
		         	}
		         	.price{
		            	position: absolute;
		            	right: 90px;
		            	bottom: 12px;
		            	line-height: 24px;
		            	font-size: 14px;
		            	font-weight: 700;
		            	color: rgb(240, 20, 20);
		            }
		            .carControlWrapper{
		            	position: absolute;
			            right: 0;
			            bottom: 6px;
		            }
				}
			}
		}
	}
	.listMask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		opacity: 1;
      	background: rgba(7, 17, 27, 0.6);
		backdrop-filter: blur(10px);
	}

	//购物车展开折叠的动画
	.fold-enter-active,.fold-leave-active{
		transition : all 1s;
	}
	.fold-enter,.fold-leave-active {
		transform : translate3d(0,100%,0);
	}
	//购物车展开的时候，上面的遮罩层出现消失的动画
	.fade-enter-active,.fade-leave-active{
		transition : all 1s;
	}
	.fade-enter,.fade-leave-active {
		opacity: 0;
      	background: rgba(7, 17, 27, 0);
	}
	//分析
	//起始位置：位于最下面，最左面，最底层。你一点击，想让他上去，向上就是进来，
	//就是设置listshow为true。
	//
	//
	////必须保证点击内容第一次是进来，再点击才是出去。
</style>