<template>
	<transition name="fade">
		<div class="evalDetail" ref="ratings">
			<div class="ratingWrapper">
				<ul>
					<li v-for="rating in ratings" class="ratingItem">
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
								<img v-for="item in rating.foodImg" :src="item" width="50" height="50" class="foodImgItem">
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
	</transition>
</template>

<script>
	import {formatDate} from '../../../static/js/date';

	import BScroll from 'better-scroll'
	//由于ratings是props来的，就不需要ajax请求了
	//import axios from 'axios'
	//引入star組件
	import Star from '../star/star'
	export default{
		//我们要让这里面的ratings也是属性传过来。
		props: {
	      ratings: {
	        type: Array,
	      }
	    },
	    /*data(){
	    	return{
	    		ratings:[],
	    	}
	    },*/
	    components:{
	      'mt-star':Star,
	    },
	    filters: {
	      	formatDate(time) {
	        	let date = new Date(time);
	        	return formatDate(date, 'yyyy-MM-dd hh:mm');
	      	}
	    },
	    /*beforeCreat(){
	    	this._initScroll();
	    },*/
	    created(){
	    	this._initScroll();
	    },
	    watch:{
	    	//ratings变化只有当刷新的时候才会变化
	    	//点击各个按钮跳转ratings不变化，点击各个这时候是dom重新渲染，也就是生命周期又走了一次。
	    	"ratings"(){
	    		this._initScroll();
	    	}
	    },
	    methods:{
	    	_initScroll() {
	    		//this.scroll=true,再取反，就是没有初始化scroll,那就初始化。否则就是已经初始化过了，那就刷新这个scroll。
	        	if (!this.scroll) {
	          		this.scroll = new BScroll(this.$refs.ratings, {
	            		click: true
	          		});
	        	} else {
	          		this.scroll.refresh();
	        	}
	      	},
	    },
	    mounted(){
	    	console.log(this.$refs.ratings);
	    	this.scroll = new BScroll(this.$refs.ratings, {
	            		click: true
	        });
	    	//this._initScroll();
	    },
	}
</script>

<style lang="less" scoped>
	.evalDetail{
		position: fixed;
		top: 41px;
		bottom: 0;
		left: 0;
		width: 100%;
		//height: 5000px;
		z-index: 100;
		background-color: #fff;
		overflow: hidden;
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
	.fade-enter-active,.fade-leave-active{
		transition:all 0.4s;
	}
	.fade-enter,.fade-leave-active{
		transform:translateX(100%);
		opacity: 0;
	}
</style>