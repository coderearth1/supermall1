<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import {getHomeMultidata} from "network/home";
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        //这里的res执行完会被回收，所以使用data 中创建一个变量result来保存res
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        //这里的this指向的是vue实例对象
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
