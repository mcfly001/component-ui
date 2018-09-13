<template>
  <div class="wrapper">
    <yaxis-scroll :options="options"
                  @reset-date="resetDate"
                  @before-scroll="beforeScroll"
                  @scroll="scroll"
                  @get-more-date="getMoreDate">
      <li v-for="(item, $index) in items" :key="$index">
        {{item.name}}
      </li>
      <loading class="loading"></loading>
    </yaxis-scroll>
  </div>
</template>

<script>
import { list } from '../../mock'
import Loading from '../../packages/loading'
import YaxisScroll from '../../packages/yaxis-scroll'
export default {
  name: '',
  data() {
    return {
      items: list,
      options: {
        listenScroll: true,
        beforeScroll: true,
        pulldown: true,
        pullup: true
      }
    }
  },
  methods: {
    getMoreDate(){
      this.items = this.items.concat(list)
      console.log('getMoreDate')
    },
    resetDate(){
      console.log('resetDate')
    },
    beforeScroll(){
      console.log('beforeScroll')
    },
    scroll(pos){
      console.log('scroll', pos)
    }
  },
  components: {
    YaxisScroll,
    Loading
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
.wrapper{
  height: 100%;
}
</style>

