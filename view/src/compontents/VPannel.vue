<template>
  <div class="panel" v-show="status===3">
    <div class="panel-num">
      <div
        class="item"
        :class="{active:currentNum === num}"
        v-for="(num,i) in nums"
        :key="i"
        @click="currentNum = num"
      >{{num}}</div>
    </div>
    <div class="panel-point">
      <v-dice
        class="item"
        :class="{active:currentPoint===point}"
        v-for="(point,i) in points"
        :key="i"
        :value="point"
        @click="currentPoint=point"
      />
    </div>
    <a href="javascript:void(0)" @click="submit" class="submit">吹牛</a>
    <a href="javascript:void(0)" @click="doubt" class="doubt">不信</a>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VDice from './VDice.vue';

export default {
  data() {
    return {
      // nums: [1, 2, 3, 4, 5],
      points: [2, 3, 4, 5, 6],
      currentNum: 0,
      currentPoint: 0,
    };
  },
  computed: {
    ...mapState(['user', 'status', 'players']),
    statement() {
      let statement = [0, 0];
      this.players.some((el) => {
        if (el && el.active) { statement = el.statement; return true; }
        return false;
      });
      return statement;
    },
    nums() {
      const begin = this.statement[0] || 1;
      let count = 0;
      this.players.forEach((el) => {
        if (el) count += el.count;
      });
      const end = Math.min(begin + 4, count);
      const res = [];
      for (let i = begin; i <= end; i += 1) res.push(i);
      return res;
    },
  },
  components: {
    VDice,
  },
  methods: {
    ...mapActions(['say', 'doubt']),
    submit() {
      this.say({
        num: this.currentNum,
        point: this.currentPoint,
      });
    },
  },
};
</script>
<style lang="scss" scoped>

.panel {
  position: absolute;
  right: 0;
  bottom: -100px;
  display: block;
  z-index: 200;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  a {
    display: block;
    margin: 5px 10px;
    height: 40px;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    line-height: 40px;
    color: #fff;
    background: #08c;
    border-radius: 5px;
  }
  a.submit {
    background: #08c;
  }
  a.doubt {
    background: #f60;
  }
  &-num {
    padding: 5px 10px;
    display: flex;
    .item {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      margin-right: 5px;
      background: #fff;
      border-radius: 50%;
    }
    .item:last-child {
      margin: 0;
    }
    .item.active {
      box-shadow: 0 0 0 2px red;
    }
  }
  &-point {
    padding: 5px 10px;
    display: flex;
    .item {
      margin-right: 5px;
    }
    .item:last-child {
      margin: 0;
    }
    .item.active {
      box-shadow: 0 0 0 2px red;
    }
  }
}
</style>
