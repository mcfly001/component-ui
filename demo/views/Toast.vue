<template>
  <div>
    <button type="button" @click="foo1">显示toast1</button>
    <button type="button" @click="foo2">显示toast2</button>
    <button type="button" @click="foo3">显示toast3</button>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  methods: {
    foo1(){
      this.$toast('这个是测试1')
    },
    foo2(){
      this.$toast({
        message: '这个是测试2',
        iconClass: 'success'
      })
    },
    foo3(){
      this.$toast({
        message: '这个是测试3',
        iconClass: 'fail',
        duration: 500
      })
    }
  }
}
</script>
