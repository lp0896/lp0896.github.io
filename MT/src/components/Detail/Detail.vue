<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<mt-split></mt-split>
			<div class="telphone">
				<div class="left">
					<i class="icon-telphone"></i>
					<span>{{seller.telphone}}</span>
				</div>
				<div class="right">
					<i class="icon-nextBig"></i>
				</div>
			</div>
			<div class="address">
				<div class="left">
					<i class="icon-address"></i>
					<span>{{seller.address}}</span>
				</div>
				<div class="right">
					<i class="icon-nextBig"></i>
				</div>
			</div>
			<div class="environment">
				<div class="left">
					<i class="icon-environment"></i>
					<span>{{seller.environment}}</span>
				</div>
				<div class="right">
					<i class="icon-nextBig"></i>
				</div>
			</div>
			<mt-split></mt-split>
			<div class="deliveryTime">
				<div>
					<i class="icon-time"></i>
					<span>{{seller.deliveryTimePeriodInfo}}{{seller.deliveryTimePeriod}}</span>
				</div>
			</div>
			<div class="deliveryService">
				<p class="top">
				    <i class="icon-service"></i>配送服务：<em>美团专送</em> {{seller.service}}
				</p>
				<p class="bottom"><em>送货快</em><em>准时到</em></p>
			</div>
			<mt-split></mt-split>
			<div class="item">
				<div><i class="subtract"></i>{{seller.subtract}}</div>
		        <div><i class="special"></i>{{seller.special}}</div>
		        <div><i class="discount"></i>{{seller.discount}}</div>
		        <div><i class="ling"></i>{{seller.ling}}</div>
		        <div><i class="fu"></i>{{seller.fu}}</div>
		        <div><i class="piao"></i>{{seller.piao}}</div>
			</div>
			<mt-split></mt-split>
			<div class="file">
				<span>查看食品安全档案</span><i class="icon-nextBig"></i>
			</div>
			<mt-split></mt-split>
			<div class="inform">
				<div class="left">
					<span>举报商家</span>
				</div>
				<div class="right">
					<span>举报商家作弊领红包！</span>
					<i class="icon-nextBig"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	//import axios from 'axios'
	//import Star from '../star/star'
	import Split from '../split/split'
	
	export default{
		props: {
	      seller: {
	        type: Object
	      }
	    },
	    components: {
	      /*"mt-star":Star,*/
	      "mt-split":Split,
	    },
	    watch:{
	    	"seller"(){
	    		this._initScroll();
	    	}
	    },
	    methods:{
	    	_initScroll() {
	    		//this.scroll=true,再取反，就是没有初始化scroll,那就初始化。否则就是已经初始化过了，那就刷新这个scroll。
	        	if (!this.scroll) {
	          		this.scroll = new BScroll(this.$refs.seller, {
	            		click: true
	          		});
	        	} else {
	          		this.scroll.refresh();
	        	}
	      	},
	    },
	    mounted(){
	    	this._initScroll();
	    },
	}
</script>

<style lang="less" scoped>
	.seller{
		position: absolute;
    	top: 166px;
    	bottom: 0;
    	left: 0;
    	width: 100%;
    	overflow: hidden;
    	.split{
    		height: 15px;
    	}
    	.telphone{
    		margin-left: 15px;
    		margin-right: 10px;
    		border-bottom: 1px solid rgba(7,17,27,.1);
    		height: 30px;
			line-height: 30px;
			.left{
				display: inline-block;
				.icon-telphone{
					margin-right: 6px;
					font-size: 20px;
					position: relative;
					top: 3px;
				}
				span{
					height: 30px;
					line-height: 30px;
					font-size: 12px;
					color: #1a1a1a;
				}
			}
			.right{
				height: 30px;
				line-height: 30px;
				float: right;
				i{
					font-size: 12px;
				}
			}
    	}
    	.address{
    		margin-left: 15px;
    		margin-right: 10px;
    		border-bottom: 1px solid rgba(7,17,27,.1);
    		height: 30px;
			line-height: 30px;
    		.left{
				display: inline-block;
				.icon-address{
					margin-right: 12px;
					font-size: 14px;
					position: relative;
					top: 2px;
					left: 2px;
				}
				span{
					height: 30px;
					line-height: 30px;
					font-size: 12px;
					color: #1a1a1a;
				}
			}
			.right{
				height: 30px;
				line-height: 30px;
				float: right;
				i{
					font-size: 12px;
				}
			}
    	}
    	.environment{
    		margin-left: 15px;
    		margin-right: 10px;
    		.left{
				display: inline-block;
				.icon-environment{
					display: inline-block;
					margin-right: 14px;
					font-size: 12px;
					position: relative;
					top: 2px;
					left: 4px;
				}
				span{
					height: 30px;
					line-height: 30px;
					font-size: 12px;
					color: #1a1a1a;
				}
			}
			.right{
				height: 30px;
				line-height: 30px;
				float: right;
				i{
					font-size: 12px;
				}
			}
    	}
    	.deliveryTime{
    		margin-left: 15px;
    		margin-right: 10px;
    		border-bottom: 1px solid rgba(7,17,27,.1);
    		div{
    			i{
					display: inline-block;
					margin-right: 10px;
					font-size: 16px;
					position: relative;
					left: 2px;
					top: 2px;
    			}
    			span{
					height: 30px;
					line-height: 30px;
					font-size: 12px;
					color: #1a1a1a;
    			}
    		}
    	}
    	.deliveryService{
    		margin-left: 15px;
    		margin-right: 10px;
    		.top{
    			height: 60px;
    			line-height: 60px;
    			font-size: 12px;
    			i{
					position: relative;
					left: 5px;
					font-size: 12px;
					margin-right: 19px;
    			}
    			em{
    				display: inline-block;
    				padding: 2px;
    				height: 10px;
    				line-height: 10px;
    				font-size: 10px;
    				color: #fff;
    				border: 1px solid #56dec1;
    				border-radius: 2px;
    				background-color: #56dec1;
    			}
    		}
    		.bottom{
    			height: 8px;
    			line-height: 8px;
    			font-size: 8px;
    			color: #50a8fb;
    			text-align: center;
    			position: relative;
    			bottom: 10px;
    			right: 38px;
    			em{
    				padding: 1px 2px;
    				border: 1px solid #50a8fb;
    				border-radius: 2px;
    				margin-right: 4px;
    			}
    		}
    	}
    	.item{
    		margin-left: 15px;
    		margin-right: 10px;
    		div{
    			height: 30px;
				line-height: 30px;
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
				.ling{
					background-image:url(discount_1@2x.png);
					background-size:12px 12px;
				}
				.fu{
					background-image:url(decrease_1@2x.png);
					background-size:12px 12px;
				}
				.piao{
					background-image:url(special_1@2x.png);
					background-size:12px 12px;
				}
    		}
    	}
    	.file{
    		margin-left: 15px;
    		margin-right: 10px;
    		height: 30px;
			line-height: 30px;
			font-size: 12px;
    		span{}
    		i{
    			display: inline-block;
				height: 30px;
				line-height: 30px;
				float: right;
				font-size: 12px;
    		}
    	}
    	.inform{
    		margin-left: 15px;
    		margin-right: 10px;
    		height: 30px;
			line-height: 30px;
			font-size: 12px;
			.left{
				display: inline-block;
			}
			.right{
				float: right;
				display: inline-block;
				span{
					color: red;
				}
				i{
	    			display: inline-block;
					height: 30px;
					line-height: 30px;
					float: right;
					font-size: 12px;
	    		}
			}
    	}
	}
</style>