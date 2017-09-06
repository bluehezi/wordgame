<template>
  <div id='game' @click="clearSelection">
      <div class="header">{{info}}</div>
      <ChessBoard
        :form = "form"
        @selfupdated = 'selfUpdated'
        ref="chessboard"
      >          
      </ChessBoard>
      <div class="record">
        记录: 
        <ul>
          <li 
          v-for="(item,index) in this.record" 
          :key="index"
          @click="goRecord(index, $event)"
          >{{recordInfo[index]}}</li>
        </ul>
      </div>
      <button class="reset" @click='_reset'>RESET</button>
      <Modal 
        ref='modal' 
        :message="info"
        @_close="_reset"/> 
  </div>
</template>

<script>
import ChessBoard from './ChessBoard'
import Modal from './Modal'
export default {
  data: function () {
    return {
      nextRole: '',
      winner: '',
      form: 3,
      record: [],
      recordInfo: []
    }
  },
  components: {
    ChessBoard,
    Modal
  },
  updated: function () {
  },
  methods: {
    selfUpdated: function (nextRole, winner, chessboard, coordinate) {
      if (chessboard) {
        this.record.push(chessboard)
        this.recordInfo.push(this.nextRole + ' 置棋于' + `  (${coordinate.x},${coordinate.y})`)
      }
      this.nextRole = nextRole
      this.winner = winner
      if (this.winner) {
        // 打开模态框
        this.$refs.modal.show()
      }
    },
    // 清除文字被选中的状态
    clearSelection () {
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
    },
    goRecord (index, e) {
      // 获得坐标
      // let reg = /(\d),(\d)/g
      // let coordinate = reg.exec(this.recordInfo[index])
      // if (coordinate) {
      //   coordinate = {
      //     x: coordinate[1],
      //     y: coordinate[2]
      //   }
      // }
      this.winner = ''
      let record = this.recordInfo[index]
      this.nextRole = record.match(/^(\w+)(?=\s)/g)[0] === 'roleA' ? 'roleB' : 'roleA'
      this.$refs.chessboard.changeChessBoard(this.record[index], this.nextRole)
    },
    // 重置
    _reset () {
      this.record = []
      this.recordInfo = []
      this.winner = ''
      this.nextRole = 'roleA'
      this.$refs.chessboard.changeChessBoard(null, this.nextRole)
    }
  },
  // 计算属性
  computed: {
    info: function () {
      if (this.winner) {
        return this.winner + '获胜'
      }
      return this.nextRole + '执棋'
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
      li {
        cursor: pointer;
      }
    }
  }
  .reset {
      position: absolute;
      bottom: 200px;
      left: 50%;
      transform: translateX(-55%);
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
</style>

