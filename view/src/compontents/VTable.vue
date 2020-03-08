<template>
  <div class="table">
    <transition
      enter-active-class="bounceIn"
      leave-active-class="bounceOut"
      :duration="{enter:800,leave:100}"
    >
      <div class="animated gameStatus" v-if="status === 1">游戏开始</div>
    </transition>

    <transition
      enter-active-class="bounceIn"
      leave-active-class="bounceOut"
      :duration="{enter:800,leave:100}"
    >
      <div class="animated gameStatus" v-if="status === 2">回合准备</div>
    </transition>

    <transition
      enter-active-class="bounceIn"
      leave-active-class="bounceOut"
      :duration="{enter:800,leave:100}"
    >
      <div class="animated gameStatus" v-if="status === 3">发言阶段</div>
    </transition>
    <transition
      enter-active-class="bounceIn"
      leave-active-class="bounceOut"
      :duration="{enter:800,leave:100}"
    >
      <div class="animated gameStatus" v-if="status === 4">
        <span v-if="correct">吹牛成功</span>
        <span v-else>吹牛失败</span>
      </div>
    </transition>

    <transition
      enter-active-class="bounceIn"
      leave-active-class="bounceOut"
      :duration="{enter:800,leave:100}"
    >
      <div class="animated gameStatus" v-if="status === 5">回合结算</div>
    </transition>

    <transition
      enter-active-class="bounceIn"
      leave-active-class="bounceOut"
      :duration="{enter:800,leave:100}"
    >
      <div class="animated gameStatus" v-if="status === 6">Game Over</div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['user', 'status', 'correct']),
  },
};
</script>
<style lang="scss" scoped>
.table {
  position: absolute;
  top: 60px;
  left: 60px;
  bottom: 60px;
  right: 60px;

  border-radius: 120px;
  background: #def;
  border: 4px solid #333;
}
.gameStatus {
  display:block;
  position: absolute;
  top:50%;
  left:0;
  right:0;
  font-size: 30px;
  color:#999;
  line-height: 50px;
  margin-top:-25px;
  text-align: center;;

  // transform: translate(-50%,-50%);

}

</style>
