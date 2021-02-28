<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view />
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
    <ul>
      <li>你哈1</li>
      <li>你哈2</li>
      <li>你哈3</li>
      <li>你哈4</li>
      <li>你哈5</li>
      <li>你哈6</li>
      <li>你哈7</li>
      <li>你哈8</li>
      <li>你哈9</li>
      <li>你哈10</li>
      <li>你哈11</li>
      <li>你哈12</li>
      <li>你哈13</li>
      <li>你哈14</li>
      <li>你哈15</li>
      <li>你哈16</li>
      <li>你哈17</li>
      <li>你哈18</li>
      <li>你哈19</li>
      <li>你哈20</li>
      <li>你哈21</li>
      <li>你哈22</li>
      <li>你哈23</li>
      <li>你哈24</li>
      <li>你哈25</li>
      <li>你哈26</li>
      <li>你哈27</li>
      <li>你哈28</li>
      <li>你哈29</li>
      <li>你哈30</li>
      <li>你哈31</li>
      <li>你哈32</li>
      <li>你哈33</li>
      <li>你哈34</li>
      <li>你哈35</li>
      <li>你哈36</li>
      <li>你哈37</li>
      <li>你哈38</li>
      <li>你哈39</li>
      <li>你哈40</li>
      <li>你哈41</li>
      <li>你哈42</li>
      <li>你哈43</li>
      <li>你哈44</li>
      <li>你哈45</li>
      <li>你哈46</li>
      <li>你哈47</li>
      <li>你哈48</li>
      <li>你哈49</li>
      <li>你哈50</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";


  import {getHomeMultidata,getHomeGoods} from "network/home";
  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList

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
        currentType: 'pop'
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
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    padding-bottom: 49px;
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
</style>
