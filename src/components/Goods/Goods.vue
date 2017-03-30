<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="(food,index) in item.foods" class="food-item" @click.stop="showDetail(food)">
							<div class="icon">
								<img :src="food.icon" alt="" width="57" height="57">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
								</div>
								<div class="carControlWrapper">
									<mt-carControl :food="food" :index="index" :listHeight="listHeight"></mt-carControl>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- 引入商品的详情组件 -->
		<mt-goodsDetail ref="food" :food="selectedFood"></mt-goodsDetail>
		<!-- 引入购物车组件 -->
		<mt-buyCar :selectedFoods="selectedFoods"></mt-buyCar>
	</div>
</template>

<script>
  	import axios from 'axios'
  	import BScroll from 'better-scroll'
  	//引入商品的详情组件
  	import GoodsDetail from '../goodsDetail/goodsDetail'
  	//引入购物车组件
  	import buyCar from '../buyCar/buyCar'
  	//引入加减(CarControl)组件
  	import CarControl from '../CarControl/CarControl'
	export default{
		props : {
			seller:Object,
		},
		data(){
			return{
				goods:[],
				listHeight:[],//是个数组，里面是右边foods的每个li的高度值，是每个li位置起始的高度值
				scrollY:0,
				selectedFood:{}, //当前选中的商品,是当前点击的这个food
			}
		},
		components:{
			'mt-goodsDetail':GoodsDetail,
			'mt-buyCar':buyCar,
			'mt-carControl':CarControl
		},
		computed:{
			//这个就是为了计算当你滑动的时候，计算你滑动到哪里了，从而计算在那个li范围内，这个li的index是多少。
			currentIndex(){
				for(let i=0 ;i<this.listHeight.length;i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					//!height2这里指的是i是最后一个的时候，这个时候只有height1，height是undefined，!height2的布尔值是true。
					if ( !height2 || (this.scrollY >= height1 && this.scrollY<height2)) {
						return i;
					}
				}
				return 0;
			},
			selectedFoods(){
				// 这是根据每个food的count来计算被选中就是被加入购物车的商品。
				let foods=[];
				this.goods.forEach( (good)=>{
					good.foods.forEach( (food)=>{
						if (food.count) {
							foods.push(food);
						}
					})
				});
				return foods;
			}
		},
		created(){
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			//ajax请求goods数据
			var that = this;
	      	axios.get('http://localhost:8089/api/data')
	      	.then( function(response) {
	        	that.goods = response.data.data.goods;
	        	that.$nextTick(() => {
		        	that._initScroll(); // 初始化scroll
		        	that._calculateHeight();
		      	})
	      	})
	      	.catch( function(error) {
	        	console.log(error);
	     	})
		},
		methods:{
			selectMenu(index,event){
				//当我们在pc端点击的时候，会触发两次点击事件。一次是vue派发的点击，另一次是原生js的点击事件，也就是说咱们这里用的点击事件是由vue派发出来的点击事件。我们必须得把原生的点击事件去掉才可以。
				//event._constructed原生的点击事件没有这个东西，vue派发出来的事件有，值为true。
				if (!event._constructed) {
					return;
				}
				//以下是我们vue派发的点击
				else{
					let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        			let el = foodList[index];
        			this.foodsScroll.scrollToElement(el, 200);
				}
			},
			_initScroll(){
				this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
		       		//咱们后面用到了点击事件，就是点击左边显示对应的右边，但是如果不设置这个点击事件为true就不起效果。因为better-Scroll默认会启用touch的那一堆事件，从而禁用了click事件。我们要想使用点击事件，必须开启，就是设置为true。
		       		click: true,
		      	});
		      	this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
		        	probeType: 3,
		        	click: true,
		      	});
		      	//下面这个利用了better-scroll的api，用来计算每个li的pos.y就是y轴上的位置。
		      	this.foodsScroll.on("scroll",( pos ) => {
		      		this.scrollY = Math.abs(Math.round(pos.y));
		      	})
			},
			_calculateHeight(){
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
		        let height = 0;
		        this.listHeight.push(height);
		        for (let i = 0; i < foodList.length; i++) {
		          	let item = foodList[i];
		          	height += item.clientHeight;
		          	this.listHeight.push(height);
		        }/*
		        console.log( this.listHeight );*/
			},
			showDetail(food){
				this.$refs.food.showFood();
				this.selectedFood = food;
			},
		}
	}
</script>

<style lang="less" scoped>
	.goods{
		display: flex;
		position: absolute;
		top: 166px;
		bottom:46px;
		width: 100%;/* 
		background-color: #eee; */
		overflow: hidden;
		.menu-wrapper{
			flex:0 0 80px;
			width: 80px;
			background-color: #efefef;
			//
			.menu-item{
				display: table;
				height: 54px;
				width: 56px;
				line-height: 14px;
				padding: 0 12px;
				&.current{
					position: relative;
					margin-top: -1px;
					z-index: 10;
					background-color: #fff;
					font-weight: bold;
					.text{
						border: none;
					}
				}
				.icon{
					display: inline-block;
		            vertical-align: top;
		            width: 12px;
		            height: 12px;
		            margin-right: 2px;
		            background-size: 12px 12px;
		            background-repeat: no-repeat;
		            &.decrease{
		            	background-image: url(decrease_3@2x.png);
		            }
		            &.discount{
		            	background-image: url(discount_3@2x.png);
		            }
		            &.guarantee{
		            	background-image: url(guarantee_3@2x.png);
		            }
		            &.invoice{
		            	background-image: url(invoice_3@2x.png);
		            }
		            &.special{
		            	background-image: url(special_3@2x.png);
		            }
				}
				.text{
					font-size: 12px;
					display: table-cell;
					width: 56px;
					vertical-align: middle;
					border-bottom: 1px solid rgba(7,17,27,.1);
				}
			}
		}
		.foods-wrapper{
			flex:1;
			.title{
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size: 12px;
				color: #757575;
				background-color: #f3f5f7;
			}
			ul .food-item{
				display: flex;
				margin:18px;
				border-bottom: 1px solid rgba(7,17,27,.1);
				padding-bottom: 20px;
				&:last-child{
					border-bottom: none;
					margin-bottom: 0;
				}
				.icon{
					flex:0 0 57px;
					margin-right: 10px;
				}
				.content{
					flex:1;
					position: relative;
					.name{
						margin: 2px 0 8px 0;
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						color: rgb(7,17,27);
					}
					.desc{
						margin-bottom: 8px;
						line-height: 12px;
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.extra{
						line-height: 10px;
						font-size: 10px;
						color: #757575;
						.count{
							margin-right: 12px;
						}
					}
					.price{
						font-weight: bold;
						line-height: 24px;
						margin-top: 5px;
						.now{
							margin-right: 8px;
							font-size: 14px;
							color: rgb(240,20,20);

						}
						.old{
							font-size: 10px;
							color: rgb(147,153,159);
							text-decoration: line-through;
						}
					}
					.carControlWrapper{
						position: absolute;
						right: 0;
						bottom: 12px;
					}
				}
			}
		}

	}
</style>