<template>
  <div class="page">
    <v-header />

    <a href="javascript:void(0)" @click="startGame">开始游戏</a>

    <div class="room">
      <v-player />
      <v-table />
      <v-pannel />
    </div>
    <v-message />

    <login />
  </div>
</template>

<script>

// import _ from 'lodash';
import { mapState, mapActions } from 'vuex';
import VHeader from './compontents/VHeader.vue';
import VPlayer from './compontents/VPlayer.vue';
import VTable from './compontents/VTable.vue';
import VMessage from './compontents/VMessage.vue';
import VPannel from './compontents/VPannel.vue';
import Login from './Login.vue';


export default {
  name: 'app',
  data() {
    return {};
  },
  computed: {
    ...mapState(['user', 'status']),
  },
  components: {
    Login, VPlayer, VTable, VMessage, VPannel, VHeader,
  },
  methods: {
    ...mapActions(['connection', 'startGame']),
  },
  created() {
    this.connection();
  },
};
</script>

<style lang="scss" scoped>

.room {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 800px;
  height: 500px;
}


</style>
