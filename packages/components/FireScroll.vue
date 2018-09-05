<template>
  <div ref="scrollwrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    eventPassthrough: {
      type: String,
      default: 'horizontal'
    },
    // 点击列表是否派发click事件
    click: {
      type: Boolean,
      default: true
    },
    // 是否开启横向滚动
    scrollX: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: true
    },
    // 是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },
    // 列表的数据
    data: {
      type: Array,
      default: null
    },
    // 是否派发滚动到底部的事件，用于上拉加载
    pullup: {
      type: Boolean,
      default: false
    },
    // 是否派发顶部下拉的事件，用于下拉刷新
    pulldown: {
      type: Boolean,
      default: false
    },
    // 是否派发列表滚动开始的事件
    beforeScroll: {
      type: Boolean,
      default: false
    },
    // 当数据更新后，刷新scroll的延时。
    refreshDelay: {
      type: Number,
      default: 20
    },
    // 是否滚动到起点
    scrollToOrigin: {
      type: Boolean,
      default: false
    },
    scrollElement: {
      type: String
    }
  },
  mounted () {
    this._initScroll()
    // 当前页面有数据的情况下才重新计算宽度，否则去data里面去修改
    if (this.$refs.scrollwrapper.children[0].children.length) {
      this.$nextTick(() => {
        this.refresh()
      })
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
        if (this.scrollToOrigin) {
          this.scrollTo(0, 0, 100, 'ease')
        }
      }, this.refreshDelay)
    },
    scrollElement (newval) {
      let el = document.getElementsByClassName(newval)[0]
      let width = document.body.clientWidth || document.documentElement.clientWidth
      let selfwidth = el.clientWidth
      this.scrollToElement(el, 300, (selfwidth - width) / 2)
    }
  },
  methods: {
    _initScroll () {
      if (this.$refs.scrollwrapper) {
        this.scroll = new BScroll(this.$refs.scrollwrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX,
          scrollY: this.scrollY
        })
        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('get-more-date')
            }
          })
        }
        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchEnd', (pos) => {
            if (pos.y > 50) {
              this.$emit('reset-date')
            }
          })
        }
        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('before-scroll')
          })
        }
      }
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      if (this.scrollX) {
        this.$nextTick(() => {
          this._setWidth()
        })
      }
      this.scroll && this.scroll.refresh()
    },
    _setWidth () {
      let width = 0
      let wapperul = this.$refs.scrollwrapper.children[0]
      for (let i = 0; i < wapperul.children.length; i++) {
        let dom = wapperul.children[i]
        let domWidth = parseFloat(getComputedStyle(dom).marginRight) + parseFloat(getComputedStyle(dom).marginLeft)
        width = width + dom.offsetWidth + domWidth
      }
      wapperul.style.width = width + 'px'
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
}
</script>
