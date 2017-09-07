<template>
  <div id="settingbar" @click="change($event)">
    <span class='count'>{{count}}</span>
    <div class='bg' ref='bg'></div>  
    <div class="knob" ref='knob'></div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      count: 3,
      min: 3,
      max: 10
    }
  },
  methods: {
    change (e) {
      if (e.target.className === 'knob' || e.target.className === 'count') {
        return
      }
      if (e.offsetX < 0 || e.offsetX >= 200) {
        return
      }
      this.count = Math.floor(e.offsetX / 200 * (this.max - this.min + 1)) + this.min
      this.$refs.bg.style.width = (this.count - this.min) / (this.max - this.min) * 200 + 'px'
      this.$refs.knob.style.left = (this.count - this.min) * 100 / (this.max - this.min) + '%'
      if (this.count === this.max) {
        this.$refs.knob.style.marginLeft = '-8px'
      } else {
        this.$refs.knob.style.marginLeft = '0px'
      }
      this.$emit('countChange', this.count)
      e.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
#settingbar {
  width: 200px;
  height: 6px;
  position: absolute;
  left: 50%;
  margin-left: -100px;
  bottom: 130px;
  background-color: rgba(255,255,255,.8);
  border-radius: 3px;
  cursor: pointer;  
  .count {
    color: #fff;
    width: 30px;
    height: 30px;
    position: absolute;
    top: -30px;
    left: 50%;
    margin-left: -15px;
    font-size: 20px;
  }
  .knob {
    width: 8px;
    height: 16px;
    position: absolute;
    left:0;
    top: -5px;
    background-color: rgba(255,0,0,.6);
    border-radius: 3px;
  }
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: rgba(255,0,0,.6);
  }
}
</style>

