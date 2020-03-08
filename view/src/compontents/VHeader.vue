<template>
  <header>
    <ul>
      <li>{{user.name}}</li>
      <li>ID: {{user.id}}</li>
    </ul>
    <div class="func">
      <a href="javascript:void(0)" v-if="status === 0 || status === 6" @click="startGame">开始游戏</a>
      <a href="javascript:void(0)" v-else @click="resetGame">重置</a>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['user', 'status']),
  },
  methods: {
    ...mapActions(['startGame', 'resetGame']),
  },
};
</script>

<style lang="scss" scoped>

header {
  display:flex;
  position:fixed;
  top:0;
  left:0;
  right:0;
  height: 50px;
  border-bottom: 1px solid #ddd;
  background:#fff;
}
ul {
  display:flex;
  width: 150px;
}
li {
  flex:1;
  line-height: 50px;
  text-align:center;
  border-right:1px solid #ddd;
}
.func {
  padding: 5px 10px;
}
a {
  display:block;
  width: 100px;
  line-height: 35px;
  color: #333;
  font-size: 16px;
  text-align:center;
  text-decoration: none;
  background: #ddd;
  border-radius: 5px;;
  box-shadow: 0px 1px 1px rgba(0,0,0,.3);
}
</style>
