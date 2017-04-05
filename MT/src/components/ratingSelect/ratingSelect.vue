<template>
	<div class="ratingSelect">
		<div class="rating-type">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType==2}">{{desc.all}}<span class="count">（{{ratings.length}}）</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType==0}">{{desc.positive}}<span class="count">（{{positives.length}}）</span></span>
			<span @click="select(1,$event)" class="block negative" :class="{'active':selectType==1}">{{desc.negative}}<span class="count">（{{negatives.length}}）</span></span>
		</div>
	</div>
</template>

<script>
	//定义正面评价为0
	const POSITIVE = 0;
	//定义负面评价为0
  	const NEGATIVE = 1;
  	//所有评价为2
  	const ALL = 2;
	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			selectType: {
	        	type: Number,
	        	default: ALL
	      	},
	      	/*onlyContent: {
        		type: Boolean,
        		default: false
      		},*/
      		desc: {
		        type: Object,
		        default() {
		          	return {
		            	all: '全部',
		            	positive: '满意',
		            	negative: '不满意'
		          	};
		        }
		    }
		},
		computed: {
			//计算属性，使用过滤器把素有的评论里过滤出那些积极的评价
	      	positives() {
	        	return this.ratings.filter((rating) => {
	          		return rating.rateType === POSITIVE;
	        	});
	      	},
	      	//计算属性，使用过滤器把素有的评论里过滤出那些消极的评价
	      	negatives() {
	        	return this.ratings.filter((rating) => {
	          		return rating.rateType === NEGATIVE;
	        	});
	      	}
	    },
		methods:{
			select(type, event) {
		        if (!event._constructed) {
		          	return;
		        }
		        this.selectType = type;
		        console.log(this.selectType);
		        /*
		        this.$dispatch('ratingtype.select', type);*/
		        this.$emit('transfer',this.selectType);
		    },
		}

	}
</script>

<style lang="less" scoped>
	.ratingSelect{
		.rating-type{
			padding: 0 10px;
			font-size: 12px;
			.block{
				display: inline-block;
				padding-left:12px;
				padding-right:6px;
				padding-top: 4px;
				padding-bottom: 4px;
				margin-right: 6px;
				line-height: 20px;
				height: 20px;
				border: 1px solid #d1d1d1;
				border-radius:36px;
				&.active{
					background-color: #ffe9c6;
					color: #ffa011;
					border-color: #ffa011;
				}
			}
			.block.negative{
				color: #c0c0c0;
				&.active{
					background-color: #ebebeb;
					color: #171717;
					border-color:#d1d1d1;
				}
			}
		}
	}
</style>