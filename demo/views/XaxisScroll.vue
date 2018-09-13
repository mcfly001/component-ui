<template>
  <xaxis-scroll class="xaxis-wrapper m-b-large"
                :scroll-data="items"
                @change-item="changeItem">
  </xaxis-scroll>
</template>

<script>
import { list } from '../../mock'
import XaxisScroll from '../../packages/xaxis-scroll'
export default {
  name: '',
  data() {
    return {
      items: list
    }
  },
  created(){

  },
  mounted() {

  },
  methods: {
    changeItem(item){
      console.log(item)
    }
  },
  components: {
    XaxisScroll
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

</style>

