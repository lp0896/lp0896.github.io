  项目背景：
===
  自从接触vue以来，一直对它很感兴趣。最近使用vue2.0写了个外卖商家页面来练练手，目前这个版本还很简单且粗糙，日后待我慢慢修改完善。

  技术栈：
===
 * vue2.0
 * vue-router
 * axios
 * vue-cli
 * webpack
 * ES6
 * less
 * better-scroll
 * moment.js
 * progressbar.js
 * swiper.js
 * zepto.js
 * fonts
 * flex等

  演示
 ===
    [在线演示戳我](https://lp0896.github.io "点击链接显示")（请使用chrome开发者手机演示模式预览）
  
  移动端（手机）演示
 ===
    ![](https://lp0896.github.io/sm.png)

  组件
 ===
* Header
  * collectionError
  * collectionOk
  * discountInfor
  * slide
* buyCar
* CarControl
* Comments
* Detail
* Goods
* goodsDetail    
* ratingSelect
* split
* star

  预览图：
 ===
  ![](https://lp0896.github.io/image/01.PNG)          ![](https://lp0896.github.io/image/02.PNG)          ![](https://lp0896.github.io/image/03.PNG)
  
  
  ![](https://lp0896.github.io/image/04.PNG)          ![](https://lp0896.github.io/image/05.PNG)          ![](https://lp0896.github.io/image/06.PNG)

  安装
 ===
  项目地址：（git clone） <br>
    https://github.com/lp0896/lp0896.github.io.git <br>
### 注意：<br>
    MT文件夹下面是完整的项目包，npm install(安装包依赖)---npm run dev（开启服务器）
  
  构建：
 ===
  Vue.js 提供一个官方命令行工具，可用于快速搭建大型单页应用（SPA）。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目。
  
### 使用步骤： <br>
    1)全局安装，npm install -g vue-cli 
    2)创建一个基于webpack模板的应用。 vue init webpack 应用名称
    3)进入项目目录 cd 应用名称
    4)安装依赖 npm install
    5)运行 npm run dev
 
### 优点： <br>
 
 * 代码热更新，修改代码之后，网页无需主动点击刷新页面，自动刷新改变，解放双手
 * Eslint，对于有代码洁癖的人来说是绝对的好东西，统一代码规范，本人初次使用，修改设置调节浪费了很多时间，果断弃用。但是，对于开发大型项目多人合作开发是非常有必要的，待我慢慢研究吧
 * PostCss，彻底解放ie等低版本浏览器的兼容问题，可以放心的把心思放在写代码上，安装各种loader，自动编译生成支持多款浏览器的css代码
 * babel，可以放心的去使用ES6语法，自动编译成ES5  
 * 无论是stylus、scss还是less，均可以任性使用。本人熟悉less，此项目用less预处理
 * vue-cli生成的项目目录，主要工作在src目录，重心在components
  
  交互(Axios)
 ===
    vue1.0的版本，处理http请求，官方推荐使用vue-resource，但升级到2.0以后，尤大推荐使用axios，使用更加简单。并且使用ES6了的promise对象。尤其需要注意的一点是：接口返回的res并不直接是返回的数据，而是经过axios本身处理过的json对象。真正的数据在res.data里： 
  `axios.get(url).then((res)=>{
    this.data = res.data 
  })`

  路由（Vue-Router）
  ===
  vue-router是vue的路由系统，可以用来创建单页应用。基本思想是在主页面中引入标签，然后定义路由，把router挂在到app上，然后把各个子页面渲染到view里面。
  
  状态管理器（Vuex）
  ===
  Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。简单点说，在vue使用过程中，我们经常进行组件之间的通信，组件之间的作用域独立，而组件之间经常又需要传递数据。A传给B数据，B使用数据的同时，A又需要操作B的数据，当数据量较小时，我们还能理清思路，数据量很大的情况下，就懵逼了。由此，Vuex诞生了。它可以将数据置于单独的一层，并提供给外部操作内部数据的方法。本项目没有涉及到Vuex，没有进行深入思考，待我研究研究再写吧。
  
  说明：
===
  本项目是我初学vue的一个练手项目，并不成熟，不免出现兼容性问题以及一些未知的bug，还请路过的大神指点一二，如果有正在学习vue的小伙伴，可以加我好友，代码之路，源远流长~
  
  QQ：936934769
---
  微信：lp0634
---
