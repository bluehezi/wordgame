<template>
  <div id="modal" v-if='status'>
    <div id="main">
      <div class="message">{{message}}</div>
      <button @click='_close'>RESET</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Hello World!'
    }
  },
  data: function () {
    return {
      status: false
    }
  },
  methods: {
    show () {
      this.status = true
    },
    // 自定义事件通知父组件模态框关闭
    _close () {
      this.status = false
      this.$emit('_close')
    }
  }
}
</script>
<style lang="scss" scoped>
#modal {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  #main {
    width: 40%;
    height: 36%;
    background-color: rgba(255, 255, 255, .9);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    .message {
      width: 100%;
      height: 70%;
      font-size: 30px;
      color: #000;
      box-sizing: border-box;
      padding: 60px;  
    }
    button {
      padding: 16px;
      font-size: 20px;
      outline: none;
      border-radius: 26px;
      border: none;
      color: rgba(255,0,0,.5);
      cursor: pointer;
      background-color: #007ACC;
    }
  }
}
</style>


