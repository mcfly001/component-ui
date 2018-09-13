<template>
  <fire-scroll class="xaxis-scroll-wrapper"
               :data="scrollData"
               :scroll-element="scrollElement"
               :scroll-to-origin='true'
               :scroll-y='false'
               :scroll-x="true">
    <ul class="scroll-ul">
      <li v-for="(item, $index) in scrollData"
          :key="$index"
          :class="['scroll_li_' + item.id, {scroll_li_active: item.id === choosedItem.id}]"
          @click="changeCategory(item)">
        {{item.name}}
      </li>
    </ul>
  </fire-scroll>
</template>

<script>
import FireScroll from '../../components/FireScroll.vue'
export default {
  name: 'XaxisScroll',
  props: {
    scrollData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      choosedItem: {},
      scrollElement: ''
    }
  },
  methods: {
    changeCategory(item){
      this.choosedItem = item
      this.scrollElement = 'scroll_li_' + item.id
      this.$emit('change-item', item)
    }
  },
  components: {
    FireScroll
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss">

  .xaxis-scroll-wrapper{
    height: 40px;
    line-height: 38px;
    overflow: hidden;

    .scroll-ul{

      li{
        list-style-type: none;
        float: left;
        font-size: 14PX;
        color: #9B9B9B;
        letter-spacing: 0;
        margin-right: 25px;

        &.scroll_li_active{
          color: #0088ff;
          border-bottom: 2PX solid #0088ff;
        }
      }
    }
  }
</style>

