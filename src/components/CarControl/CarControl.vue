<template>
	<div class="carcontrol">
		<!-- 就说这个减少按钮。count是我们自己给food添加进去的，在原生的json数据里面并没有这个count属性。在vue里面，我们可以在js里面随便添加一个属性并且能够设置值，但是在模板里面，是不能监听到这个属性的变化的。要想监听变化，我们得利用vue的api。 -->
		<transition name="rotate">
			<div class="carDecrease icon-decrease" v-show="food.count>0" @click.stop="decreaseCar"></div>
		</transition>
		<div class="carCount" v-show="food.count>0">{{food.count}}</div>
		<div class="carAdd icon-add" @click.stop="addCar"></div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default{
		props:{
			food:{
				type:Object
			},
			index:{
				type:Number
			},
			listHeight:{
				type:Array
			}
		},
		created(){
			/*console.log(this.food);*/
		},
		methods:{
			addCar(){
				/*if (!event._constructed) {
					//这句代码是在pc端点击的时候，会触发原生的click的点击事件，这里的点击事件包括原生的点击事件和vue里面的点击事件，你必须把原生的点击事件禁止。vue点击事件有这个属性_constructed，也就是没有这个属性的时候，是原生的点击事件，禁止就可以了。
					return;
				}*/
				if (!this.food.count) {
					//由于最上面的表述，我们不能这么给food添加一个属性。要想添加还能被监听到，那得用vue的一个api，$set.
					//this.food.count=1;
					Vue.set(this.food,'count',1);
				}
				else{
					this.food.count++;
				}/*
				console.log(this.food);
				console.log(this.index);
				console.log(this.listHeight);*/
			},
			decreaseCar(){
				/*if (!event._constructed) {
					return;
				}*/
				if (this.food.count) {
					this.food.count--;
				}/*
				console.log(this.food.count);*/
			},
		}
	}
</script>

<style lang="less" scoped>
	.carcontrol{
		background-color: #fff;
		font-size: 0;
		.carDecrease,.carAdd{
			display: inline-block;
			padding: 6px;
			font-size: 24px;
			line-height: 24px;
			color: rgb(0,160,220);
		}
		.carDecrease{

		}
		.carCount{
			display: inline-block;
			vertical-align: top;
			width: 12px;
			padding-top: 6px;
			line-height: 24px;
			text-align: center;
			font-size: 10px;
			color: rgb(147,153,159);
			font-weight: bold;
		}
		.carAdd{
			
		}

	}
	//decrease出现消失的动画
	//进来激活和离开激活都是0.3s
	.rotate-enter-active, .rotate-leave-active{
		transition : all 0.3s;
	}
	//进来和离开激活都是同一个值。
	.rotate-enter, .rotate-leave-active {
		transform : translateX(24px) rotate(360deg);
	}
</style>