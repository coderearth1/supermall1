<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="conten"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view />
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      Scroll,
      BackTop

    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0,list: []},
          'new': {page:0,list: []},
          'sell': {page:0,list: []},
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
    },
    methods: {
      /*
      *事件监听的相关方法
      * */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        this.isShowBackTop = -position.y > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },


      //网络请求方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //这里的res执行完会被回收，所以使用data 中创建一个变量result来保存res
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
          //这里的this指向的是vue实例对象
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    /*padding-bottom: 49px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 8;
  }
  .conten {
    /*height: calc(100% - 93px);*/
    overflow: hidden;
    /*margin-top: 44px;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
