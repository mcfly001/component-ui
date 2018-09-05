<template>
  <div>
    <div class="point" v-if="type === 1">
      <div class="common typing_loader1"></div>
      <div class="common typing_loader2"></div>
      <div class="common typing_loader3"></div>
    </div>

    <div class="fire-loading" v-if="type === 2">
        <span class="fire-loading__spinner">
          <svg viewBox="25 25 50 50" class="fire-loading__circular">
            <circle cx="50" cy="50" r="20" fill="none"></circle>
          </svg>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    type: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss">

  .point{
    width: 44px;
    height: 44px;
    background: rgba(0,0,0,0.30);
    border-radius: 50%;
    margin: auto;
    padding: 18px 3px 0 7px;
    box-sizing: border-box;

    .common{
      width: 6.8px;
      height: 6.8px;
      border-radius: 50%;
      animation: fire-typing 0.9s linear infinite;
      position: relative;
      background-color: white;
      float: left;
    }

    .typing_loader1{
      margin-right: 4px;
    }

    .typing_loader2{
      margin-right: 4px;
      animation-delay: 0.3s;
    }

    .typing_loader3{
      animation-delay: 0.6s;
    }
  }

  .fire-loading{
    width: 30px;
    height: 30px;
    z-index: 0;
    line-height: 0;
    vertical-align: middle;
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .5);
    display: inline-block;

    .fire-loading__spinner{
      width: 100%;
      height: 100%;
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      animation: fire-rotate 0.8s linear infinite;
      animation-duration: 2s;

      .fire-loading__circular {
        width: 100%;
        height: 100%;

        circle{
          stroke: white;
          stroke-width: 3;
          stroke-linecap: round;
          animation: fire-circular 1.5s ease-in-out infinite;
        }
      }
    }
  }

  @keyframes fire-circular {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120;
    }
  }

  @keyframes fire-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes fire-typing{
    0%{
      transform: scale(1);
    }
    50%{
      transform: scale(0.75);
    }
    100%{
      transform: scale(0.5);
    }
  }
</style>
