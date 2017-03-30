<template>
	<div class="wrapper">
		<div class="ratings"  ref="ratings">
			<div class="ratingsContent">
				<div class="overView">
					<div class="left">
						<h1 class="score">{{seller.score}}</h1>
			          	<div class="title">综合评分</div>
			          	<div class="rank">高于周边商家{{seller.rankRate}}%</div>
					</div>
					<div class="right">
						<div class="scoreWrapper">
							<span class="title">服务态度</span>
							<mt-star :size="36" :score="seller.foodScore"></mt-star>
							<span class="score">{{seller.serviceScore}}</span>
						</div>
						<div class="scoreWrapper">
				            <span class="title">商品评分</span>
				            <mt-star :size="36" :score="seller.foodScore"></mt-star>
				            <span class="score">{{seller.foodScore}}</span>
				        </div>
				        <div class="deliveryWrapper">
				            <span class="title">送达时间</span>
				            <span class="delivery">{{seller.deliveryTime}}分钟</span>
				        </div>
					</div>
				</div>
				<!-- 引入split（空白行）组件 -->
				<mt-split></mt-split>
				<div class="bigComments" @click="evalDetailShow=true">
					<div class="comments">
						<div class="left">
							大众点评： {{seller.score}}分
						</div>
						<div class="right">
							{{ratings.length}}条到店评价
							<i class="icon-nextBig"></i>
						</div>
					</div>
				</div>
				<!-- 引入split（空白行）组件 -->
				<mt-split></mt-split>
				<!-- 引入评论选择组件 -->
				<mt-ratingSelect :ratings="ratings" :selectType="selectType" :desc="desc" class="ratingsType"  @transfer="receive"></mt-ratingSelect>
				<!-- 引入split（空白行）组件 -->
				<mt-split></mt-split>
				<!-- 引入ratings-wrapper -->
				<div class="ratingWrapper">
					<ul>
						<li v-for="rating in ratings" class="ratingItem" v-show="needShow(rating.rateType)">
							<div class="avatar">
								<img :src="rating.avatar" width="28" height="28">
							</div>
							<div class="content">
								<h1 class="name">{{rating.username}}</h1>
								<div class="starWrapper">
									<mt-star :size="24" :score="rating.score"></mt-star>
									<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
								</div>
								<p class="text">{{rating.text}}</p>
								<div class="foodImg" v-show="rating.foodImg">
									<img v-for="item in rating.foodImg" :src="item" width="50" height="50" class="foodImgItem"><!-- 
									<mt-bigImage v-show="showBig" :showBigSrc="showBigSrc"></mt-bigImage> -->
								</div>
								<div class="recommend" v-show="rating.recommend&&rating.recommend.length">
									<span class="icon-support"></span>
									<span class="item" v-for="item in rating.recommend">{{item}}</span>
								</div>
								<div class="time">
									{{rating.rateTime | formatDate}}
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 先不考虑下面的动画，这个动画是完美的。 -->
		<transition name="fade">
			<div class="detail-header" v-show="evalDetailShow">
			<i class="icon-prev" @click="evalDetailShow=false"></i>
			<span>大众点评评价</span>
			</div>
		</transition>
		<div class="bigPeople">
			<mt-evalDetail v-show="evalDetailShow" @click="evalDetailShow=true" :ratings="ratings" :seller="seller"></mt-evalDetail>
		</div>
	</div>
</template>

<script>
	//要思考这里的ratings为什么不从父组件传而是去ajax请求？？？？
	//**********************************************************
	import {formatDate} from '../../../static/js/date';
	import BScroll from 'better-scroll'
	import axios from 'axios'
	//引入显示评论区大图的组件
	//import BigImage from '../bigImage/bigImage'
	//引入显示大众点评评论的组件
	import EvalDetail from '../evalDetail/evalDetail'
	//定义正面评价为0
	const POSITIVE = 0;
	//定义负面评价为0
  	const NEGATIVE = 1;
  	//所有评价为2
  	const ALL = 2;
	//引入star組件
	import Star from '../star/star'
	//引入split（空白行）组件
	import Split from '../split/split'
	//引入评论选择组件
	import ratingSelect from '../ratingSelect/ratingSelect'
	export default{
		props: {
	      seller: {
	        type: Object,
	      },
	      /*ratings:{
	      	type:Array,
	      }*/
	    },
	    data(){
	    	return{
	    		selectType:ALL,/*初始化*/
	    		/*onlyContent:false,我们不要了*/
	    		desc: {
			            all: '全部',
			            positive: '好评',
			            negative: '差评'
			    },
			    ratings:[],
			    evalDetailShow:false,

			    /*
			    showBig:false,
			    showBigSrc:'',*/
	    	}
	    },
	    components:{
	      'mt-star':Star,
	      'mt-split':Split,
	      'mt-ratingSelect':ratingSelect,
	      'mt-evalDetail':EvalDetail,
	      /*'mt-bigImage':BigImage,*/
	    },
	    methods:{
	    	receive:function(e){
	    		this.selectType=e;
	    		this.$nextTick(() => {
		          this.scroll.refresh();
		        });
	    		console.log(this.selectType);
	    	},
		    needShow(type) {
		        if (this.selectType === ALL) {
		          return true;
		        } else {
		          return type === this.selectType;
		        }
		    },
		    /*changeBig(item){
		    	this.showBig=true;
		    	this.showBigSrc=item;
		    	alert("你是想看美食还是美女？")
		    }*/
	    },
    	events: {
	       'ratingtype.select'(type) {
	        	this.selectType = type;
	        	this.$nextTick(() => {
	          		this.scroll.refresh();
	        	});
	      	}
	    },
	    filters: {
	      	formatDate(time) {
	        	let date = new Date(time);
	        	return formatDate(date, 'yyyy-MM-dd hh:mm');
	      	}
	    },
	    created(){
	      	var that = this;
	      	axios.get('http://localhost:8089/api/data')
	      	.then( function(response) {
	        	that.ratings = response.data.data.ratings;
	        	that.$nextTick(() => {/*
	        		console.log(that.$refs.ratings);*/
            		that.scroll = new BScroll(that.$refs.ratings, {
              			click: true
            		});
          		});
	      	})
	      	.catch( function(error) {
	        	console.log(error);
	      	})
	    },
	}
</script>

<style lang="less" scoped>
	.ratings{
		position: fixed;
		top: 166px;
		bottom: 0;
		left: 0;
		width: 100%;/* 
		background-color: red; */
		overflow: hidden;
		.ratingsContent{
			.overView{
				display: flex;
				padding:18px 0;
				.left{
					flex:0 0 137px;
					padding-bottom: 6px;
					/* 
					background-color: blue; */
					width: 137px;
					border-right: 1px solid rgba(7, 17, 27, 0.1);
					text-align: center;
					@media only screen and (max-width: 320px){
						flex: 0 0 120px;
          				width: 120px;
					}
					.score{
						margin-bottom: 6px;
          				line-height: 28px;
         				font-size: 24px;
          				color: rgb(255, 153, 0);
					}
        			.title{
        				margin-bottom: 8px;
          				line-height: 12px;
          				font-size: 12px;
          				color: rgb(7, 17, 27);
        			}
        			.rank{
        				line-height: 10px;
          				font-size: 10px;
          				color: rgb(147, 153, 159);
        			}
				}
				.right{
					flex:1;
					padding: 6px 0 6px 24px;
					@media only screen and (max-width: 320px){
						padding-left: 6px;
					}
					.scoreWrapper{
						margin-bottom: 8px;
          				font-size: 0;
          				.title{
          					display: inline-block;
				            line-height: 18px;
				            vertical-align: top;
				            font-size: 12px;
				            color: rgb(7, 17, 27);
          				}
          				.star{
          					display: inline-block;
            				margin: 0 12px;
            				vertical-align: top;
          				}
          				.score{
          					display: inline-block;
            				line-height: 18px;
            				vertical-align: top;
            				font-size: 12px;
            				color: rgb(255, 153, 0);
          				}
					}
					.deliveryWrapper{
						font-size: 0;
						.title{
							line-height: 18px;
            				font-size: 12px;
            				color: rgb(7, 17, 27);
						}
            			.delivery{
            				margin-left: 12px;
            				font-size: 12px;
            				;color: rgb(147, 153, 159);
            			}
					}
				}
			}
			.bigComments{
				.comments{
					padding: 0 10px;
					overflow: hidden;
					.left{
						display: inline-block;
						float: left;
						height: 30px;
						line-height: 30px;
						font-size: 12px;
					}
					.right{
						display: inline-block;
						float: right;
						height: 30px;
						line-height: 30px;
						font-size: 10px;
						color: #93999f;
						i{
							display: inline-block;
							margin-left: 4px;
							vertical-align: middle;
						}
					}
				}
			}
			.ratingsType{
				margin: 10px 0;
			}
			.ratingWrapper{
				padding: 0 18px;
				.ratingItem{
					display: flex;
        			padding: 18px 0;
        			border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        			.avatar{
        				flex: 0 0 28px;
        				width: 28px;
          				margin-right: 12px;
          				img{
          					border-radius: 50%;
          				}
        			}
        			.content{
						position: relative;
						flex: 1;
						.name{
							margin-bottom: 4px;
            				line-height: 12px;
            				font-size: 10px;
            				color: rgb(7, 17, 27);
						}
						.starWrapper{
							margin-bottom: 6px;
            				font-size: 0;
            				.star{
            					display: inline-block;
              					margin-right: 6px;
              					vertical-align: top;
            				}
            				.delivery{
            					display: inline-block;
              					vertical-align: top;
              					line-height: 12px;
              					font-size: 10px;
              					color: rgb(147, 153, 159);
            				}
						}
						.text{
							margin-bottom: 8px;
            				line-height: 18px;
            				color: rgb(7, 17, 27);
            				font-size: 12px;
						}
						.foodImg{
							.foodImgItem{
								margin-right: 6px;
							}
							/* .bigImage{
								position: fixed;
								z-index: 600;
								top: 100px;
								bottom: 0;
								left: 0;
								right: 0;
								background-color: #eee;
								img{
									width: 100%;
									height: 280px;
									vertical-align: middle;
								}
							} */
						}
						.recommend{
							line-height: 16px;
            				font-size: 0;
            				//这里原先是没有上外边距的
            				margin-top: 10px;
            				.icon-support,.item{
            					display: inline-block;
              					margin: 0 8px 4px 0;
              					font-size: 9px;
            				}
            				.icon-support{
            					color: rgb(0, 160, 220);
            				}
            				.item{
            					//原先是0 6px
            					padding: 2px 8px;
              					border: 1px solid rgba(7, 17, 27, 0.1);
              					//原先是1px
              					border-radius: 36px;
              					color: rgb(147, 153, 159);
              					background: #fff;
            				}
						}
						.time{
							position: absolute;
            				top: 0;
            				right: 0;
            				line-height: 12px;
            				font-size: 10px;
            				color: rgb(147, 153, 159);
						}
        			}
				}
			}
		}
	}
	.detail-header{
		position: fixed;
		top: 0;
		z-index: 100;
		background-color: #fff;
		height: 40px;
		border-bottom: 1px solid #eee;
		line-height: 40px;
		padding: 0 10px;
		display: flex;
		width: 100%;
		i{
			flex:0 0 20px;
			font-size: 20px;
			color: green;
			font-weight: bold;
			height: 40px;
			line-height: 40px;
		}
		span{
			flex:1;
			text-align: center;
			font-size: 16px;
		}
	}
	.fade-enter-active,.fade-leave-active{
		transition:all 0.4s;
	}
	.fade-enter,.fade-leave-active{
		transform:translateX(100%);
		opacity: 0;
	}
</style>