<template>
  <div id='game'>
      <div class="header">{{info}}</div>
      <ChessBoard
        :form = "form"
        @selfupdated = 'selfUpdated'
      >          
      </ChessBoard>
      <div class="record">
        记录: 
        <ul>
          <li v-for="(item,index) in this.record" :key="index">{{recordInfo[index]}}</li>
        </ul>
      </div>
  </div>
</template>

<script>
import ChessBoard from './ChessBoard'
export default {
  data: function () {
    return {
      nextRole: '',
      winner: '',
      form: 4,
      record: [],
      recordInfo: []
    }
  },
  components: {
    ChessBoard
  },
  updated: function () {
  },
  methods: {
    selfUpdated: function (nextRole, winner, chessboard, coordinate) {
      if (chessboard) {
        this.record.push(chessboard)
        this.recordInfo.push(this.nextRole + '置棋于' + `(${coordinate.x},${coordinate.y})`)
      }
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
  color: #fff;  
  font-size: 0;
  .header {
    padding: 50px;
    font-size: 30px;
  }
  .record {
    width: 210px;
    min-height: 210px;
    background-color: skyblue;
    position: absolute;
    left: 30px;
    top: 50%;
    margin-top: -200px;
    font-size: 20px;
    text-align: left;
    padding: 10px;
    box-sizing: border-box;
    ul {
      list-style: none;
      width: 100%;
      margin: 0;
      padding: 10px;
    }
  }
}
</style>

