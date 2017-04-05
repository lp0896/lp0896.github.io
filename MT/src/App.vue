<template>
  <div id="app">
    <!-- 头部组件 -->
    <mt-header :seller="seller"></mt-header>
    <!-- 导航区域 -->
    <ul class="nav">
      <li><router-link to="/goods">点菜</router-link></li>
      <li><router-link to="/comments">评价</router-link></li>
      <li><router-link to="/detail">详情</router-link></li>
    </ul>
    <router-view :seller="seller"></router-view>
    <!-- 购物车组件 -->
   <!--  <h2>购物车</h2> -->
  </div>
</template>

<script>
  import axios from 'axios'
  import Header from './components/Header/Header'
  export default {
    name: 'app',
    data(){
      return {
        seller : {},
        goods:[],
        ratings:[]
      }
    },
    components:{
      'mt-header':Header
    },
    created(){
      var that = this;
      axios.get('http://localhost:8089/api/data')
      .then( function(response) {
        that.seller = response.data.data.seller;
        that.goods = response.data.data.goods;
        that.ratings = response.data.data.ratings;
      })
      .catch( function(error) {
        console.log(error);
      })
    },
  }
</script>

<style lang="less" scoped>
  .nav{
    display: flex;/*
    justify-content:space-around; */
    color: #7c7c7c;
    border-bottom: 1px solid rgba(7,17,27,.1);
    width: 100%;
    li{
      flex:1;
      a{
        display: inline-block;
        height: 30px;
        width: 60%;
        margin:0 20%;
        box-sizing:border-box;
        text-align: center;
        line-height: 30px;
        text-decoration:none;
        font-size: 14px;
        color : rgb(77,85,93);
        &.router-link-active{
          color:green;
          font-weight: bold;
          border-bottom: 1px solid green;
        }
      }
    }
  }
</style>
