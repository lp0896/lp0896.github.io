<template>
	<div class="header">
		<div class="headerContent">
			<div class="headerTop">
				<i class="icon-prev"></i>
				<span class="icon-share"></span>
				<em class="icon-search"></em>
			</div>
			<div class="headerCenter">
				<div class="left">
					<div class="img">
						<img :src="seller.img" alt="">
					</div>
					<div class="shopname">
						<h1>{{seller.name}}</h1>
						<p><i class="icon-horn"></i>{{seller.description}}</p>
					</div>
				</div>
				<div class="right" @click="collect">
					<em class="icon-starEmpty" id="starCollect"></em>
					<p>{{collectInfo}}</p>
				</div>
				<transition name="bounce" @after-enter="afterEnterOk">
					<mt-CollectionOk v-show="show"></mt-CollectionOk>
				</transition>
				<transition name="bounce" @after-enter="afterEnterError">
					<mt-CollectionError v-show="showCollect"></mt-CollectionError>
				</transition>
			</div>
		</div>
		<div class="slide" @click="showDiscountInfo=true">
			<mt-Slide :info="seller"></mt-Slide>
			<div @click.stop="showDiscountInfo=false">
				<transition name="popup">
					<mt-discountInfo v-show="showDiscountInfo" :disInfo="seller" ></mt-discountInfo>
				</transition>
			</div>
			<transition name="popup">
				<div class="icon-close" v-show="showDiscountInfo" @click.stop="showDiscountInfo=false"></div>
			</transition>
		</div>
	</div>
</template>

<script>
	//引入收藏成功组件
	import CollectionOk from '../Header/collectionOk'
	//引入取消收藏组件
	import CollectionError from '../Header/collectionError'
	//引入轮播图组件
	import Slide from '../Header/slide'
	//引入discountInfo组件
	import DiscountInfo from "../Header/dicountInfo"
	export default {
		props : {
			seller : Object
		},
		data(){
			return {
				show : false,
				collectInfo:'收藏',
				collectCount:0,
				showCollect:false,
				//弹出层的判断条件
				showDiscountInfo:false,
			}
		},
		components:{
		    'mt-CollectionOk':CollectionOk,
		    'mt-CollectionError':CollectionError,
		    'mt-Slide':Slide,
		    "mt-discountInfo":DiscountInfo,
		  },
		methods:{
			afterEnterOk: function(){
				this.show=false;
			},
			afterEnterError: function(){
				this.showCollect=false;
			},
			collect:function(){
				var starCollect = document.getElementById("starCollect");
				if (this.collectCount==0) {
					this.show=true;
					this.collectInfo='已收藏';
					this.collectCount=1;
					starCollect.className = "icon-starSolid";
				}
				else{
					this.showCollect=true;
					this.collectInfo='收藏';
					this.collectCount=0;
					starCollect.className = "icon-starEmpty";
				}
			},
			f1:function(){
				alert(1)
			}
		}
	}
</script>

<style lang="less" scoped>
	.header{
		width: 100%;
		height: 134px;
        background-image:-webkit-linear-gradient(180deg, #a49faa,#a59092,#a6837b,#a47764,#945e4b,#7e4f3d,#643c33,#533329);
        color: #fff;
        //头部内容的样式
        .headerContent{
        	//头部内容-top的样式
        	.headerTop{
        		color: white;
        		font-size: 16px;
        		overflow: hidden;
        		i,em,span{
	        		display: inline-block;
	        		height: 40px;
	        		width: 40px;
	        		line-height: 40px;
	        		text-align: center;
        		}
        		i{
        			float: left;
        		}
        		em{
        			float: right;
        			font-size: 22px;
        		}
        		span{
        			float: right;
        		}
        	}
        	//头部内容-center的样式
			.headerCenter{
				display: flex;
				border-bottom:1px dotted #fff;
				margin-left: 10px;
				margin-right: 10px;
				.left{
					flex:4;
					display: flex;
					.img img{
						flex:4;
						width: 60px;
						height: 60px;
						border-radius: 50%;
					}
					.shopname{
						flex:1;
						margin-top: 6px;
						h1{
							font-weight: bold;
							padding-left: 5px;
							font-size: 14px;
							height: 22px;
							line-height: 22px;
						}
						p{
							color: #eeeeee;
							padding-left: 5px;
							font-size: 12px;
							i{
								font-size: 20px;
								position: relative;
								top: 4px;
								margin-right: 2px;
							}
						}
					}
				}
				.right{
					flex:1;
					margin-top: 10px;
					height: 40px;
					border-left: 1px solid #fff;
					em{
						display: inline-block;
						width: 100%;
						text-align: center;
						margin-top: 4px;
					}
					.icon-starSolid{
						color: #ffff20;
					}
					p{
						width: 100%;
						text-align: center;
						font-size: 12px;
						margin-top: 2px;
					}
				}
			}
        }
        //轮播图的样式
        .slide{
			.icon-close{
				position: fixed;
				bottom: 80px;
				left: 50%;
				font-size: 26px;
				margin-left: -13px;
				z-index: 30;
			}
        }
	.bounce-enter-active {animation: bounce-in 1s;}
	.bounce-leave-active {animation: bounce-out 1s;}
	.popup-enter-active {animation: popup-in .3s;}
	.popup-leave-active {animation: popup-out .1s;}
	//收藏成功和取消收藏的动画
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.5);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes bounce-out {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	//弹出层出现消失的动画
	@keyframes popup-in {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes popup-out {
		/* 0% {
			transform: scale(1);
		} */
		100% {
			transform: scale(0);
		}
	}













	}
</style>