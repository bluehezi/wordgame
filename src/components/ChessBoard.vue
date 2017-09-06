<template>
  <div id='chessboard'>
    <div class="row" v-for="row in form" :key="row">
      <button 
          class="cell" 
          v-for="item in form" :key="item"
          @click="_click(row-1, item-1, $event)">
          {{chessboard[row-1][item-1]}}
     </button>
    </div>
  </div>
</template>

<script>
import {deepCopy} from '../js/deepCopy.js'
export default {
  props: {
    form: {
      type: Number,
      default: 3
    }
  },
  data: function () {
    return {
      chessboard: [],
      roleA: 'X',
      roleB: 'O',
      winner: '',
      nextRole: 'roleA',
      victory: false
    }
  },
  methods: {
    _click (row, column, event) {
      if (this.victory) {
        return
      }
      if (this.chessboard[row][column]) {
        return
      }
      this.$set(this.chessboard[row], column, this[this.nextRole], this.chessboard)
      this.victory = this._checkWinner()
      if (this.victory) {
        // event up
        this.$emit('selfupdated', this.nextRole, this.winner, deepCopy(this.chessboard), {x: row, y: column})
        return
      }
      this.nextRole = this.nextRole === 'roleA' ? 'roleB' : 'roleA'
      // event up
      this.$emit('selfupdated', this.nextRole, this.winner, deepCopy(this.chessboard), {x: row, y: column})
    },
    // 计算获胜
    _checkWinner () {
      let i = 0
      let j = 0
      let flag = true
      for (i = 0; i < this.form - 1; i++) {
        if (this.chessboard[i][i] && this.chessboard[i][i] === this.chessboard[i + 1][i + 1]) {
        } else {
          flag = false
          break
        }
      }
      if (flag) {
        this.winner = this.nextRole
        return true
      }
      flag = true
      for (i = 0; i < this.form - 1; i++) {
        if (this.chessboard[i][this.form - i - 1] && this.chessboard[i][this.form - i - 1] === this.chessboard[i + 1][this.form - i - 2]) {
        } else {
          flag = false
          break
        }
      }
      if (flag) {
        this.winner = this.nextRole
        return true
      }
      for (i = 0; i < this.form; ++i) {
        flag = true
        for (j = 0; j < this.form - 1; ++j) {
          if (this.chessboard[i][j] && this.chessboard[i][j] === this.chessboard[i][j + 1]) {
          } else {
            flag = false
            break
          }
        }
        if (flag) {
          this.winner = this.nextRole
          return true
        }
        flag = true
        for (j = 0; j < this.form - 1; ++j) {
          if (this.chessboard[j][i] && this.chessboard[j][i] === this.chessboard[j + 1][i]) {
          } else {
            flag = false
            break
          }
        }
        if (flag) {
          this.winner = this.nextRole
          return true
        }
      }
      return false
    },
    changeChessBoard (step) {
      this.chessboard = deepCopy(step)
    }
  },
  beforeCreated () {},
  created: function () {
    // 初始化chessboard 默认为[['','',''],['','',''],['','','']],默认form为{rows: 3, columns: 3}
    for (let i = 0; i < this.form; ++i) {
      let arr = []
      this.chessboard.push(arr)
      for (let j = 0; j < this.form; ++j) {
        arr.push('')
      }
    }
    // 自定义事件，把下一位执棋者传递过去，把winner传递过去
    this.$emit('selfupdated', this.nextRole, this.winner, null)
  },
  beforeMounted () {},
  mounted () {
    // 根据传入的棋盘规格设置行的高，每个格格的宽
    Array.prototype.forEach.call(this.$el.getElementsByClassName('row'), (v, i) => {
      v.style.height = 100 / this.form + '%'
      Array.prototype.forEach.call(v.getElementsByClassName('cell'), (cell, i) => {
        cell.style.width = 100 / this.form + '%'
      })
    })
  },
  beforeUpdated () {},
  updated () {},
  beforeDestoryed () {},
  destoryed () {}
}
</script>

<style lang="scss" scoped>
#chessboard {
    width: 210px;
    height: 210px;
    background-color: skyblue;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -115px;
    margin-top: -200px;
    font-size: 0;
    .row {
      width: 100%;
      overflow: hidden;
      .cell {
            height: 100%;
            box-sizing: border-box;
            outline: none;
            padding: 0;
            margin: 0;
            border: 1px solid #000;
            border-bottom: none;
            border-right: none;
            background-color: #ffffff;
            font-size: 40px;
            vertical-align: middle;
            &::last-child {
                border-bottom: 1px solid #000;
                border-right: 1px solid #000;
            }
        }
    }
}
</style>
