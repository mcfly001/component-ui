<template>
  <div id="app">
    <top-header></top-header>
    <div class="main">
      <left-nav @change-nav="changeNav"></left-nav>
      <div class="content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from './views/header/index.vue'
import LeftNav from './views/leftnav/index.vue'
import urlConfig from 'urlConfig'
import url from 'url'

export default {
  name: 'App',
  methods: {
    changeNav(src){
      this.src = urlConfig.IFRAME_URL + src
    }
  },
  components: {
    TopHeader,
    LeftNav
  }
}
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }

  .main {
    height: 100%;
    padding-top: 60px;
    overflow: hidden;
    display: flex;
    flex-flow: nowrap row;
    box-sizing: border-box;
  }

  .content-wrapper{
    flex: 1;
    text-align: left;
    height: 100%;
    padding-right: 400px;
    overflow-y: auto;
  }
</style>
