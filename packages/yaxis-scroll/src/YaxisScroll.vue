<template>
  <fire-scroll class="yaxis-scroll-wrapper"
               :data="options.scrollData"
               :listen-scroll="options.listenScroll"
               :before-scroll="options.beforeScroll"
               :pulldown="options.pulldown"
               :pullup="options.pullup"
               @get-more-date="getMoreDate"
               @reset-date="resetDate"
               @before-scroll="beforeScroll"
               @scroll="scroll">
    <ul class="scroll-ul">
      <slot></slot>
    </ul>
  </fire-scroll>
</template>

<script>
import FireScroll from '../../components/FireScroll.vue'
export default {
  name: 'YaxisScroll',
  props: {
    options: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      choosedItem: {},
      scrollElement: ''
    }
  },
  methods: {
    getMoreDate(){
      this.$emit('get-more-date')
    },
    resetDate(){
      this.$emit('reset-date')
    },
    beforeScroll(){
      this.$emit('before-scroll')
    },
    scroll(pos){
      this.$emit('scroll', pos)
    }
  },
  components: {
    FireScroll
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss">

  .yaxis-scroll-wrapper{
    font-size: 14px;
    line-height: 38px;
    height: 100%;
    overflow: hidden;
  }
</style>

