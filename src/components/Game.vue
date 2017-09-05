<template>
  <div id='game'>
      <div class="header">{{info}}</div>
      <ChessBoard
        :form = "form"
        @selfupdated = 'selfUpdated'
      >          
      </ChessBoard>
  </div>
</template>

<script>
import ChessBoard from './ChessBoard'
export default {
  data: function () {
    return {
      nextRole: '',
      winner: '',
      form: 4
    }
  },
  components: {
    ChessBoard
  },
  updated: function () {
  },
  methods: {
    selfUpdated: function (nextRole, winner) {
      this.nextRole = nextRole
      this.winner = winner
    }
  },
  // 计算属性
  computed: {
    info: function () {
      return '' + (this.winner ? (this.winner + '获胜') : (this.nextRole + '执棋'))
    }
  }
}

</script>

<style lang="scss" scoped>
#game {
  width: 100%;
  height: 100%;
  position: relative;
  .header {
    color: #fff;
    padding: 80px;
    font-size: 30px;
  }
}
</style>

