<template>
  <transition name="fire-toast-pop">
    <div class="fire-toast" v-show="visible">
      <i :class='fireiconClass' v-if="iconClass !== '' "></i>
      <p class="fire-toast-content">{{message}} {{iconClass}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  computed: {
    fireiconClass(){
      return 'fire-icon-class_' + this.iconClass
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss">

  .fire-toast-pop-enter, .fire-toast-pop-leave-active {
    transition: opacity .5s;
  }

  .fire-toast-pop-enter, .fire-toast-pop-leave-active {
    opacity: 0;
  }

  .fire-toast{
    padding: 12px;
    min-width: 150px;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    line-height: 1.2;
    border-radius: 5px;
    word-break: break-all;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    text-align: center;
  }
</style>
