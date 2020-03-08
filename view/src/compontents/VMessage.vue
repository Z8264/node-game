<template>
  <div class="message">
    <p v-for="(message,i) in messages" :key="i">{{message}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['user', 'messages']),
  },
};
</script>
<style lang="scss" scoped>
.message {
  position:fixed;
  bottom:0;
  left:0;
  padding: 10px;
  height:200px;
  width: 200px;
  background: rgba(0,0,0,.3);
}
p {
  font-size: 14px;
  color: #000;
  line-height: 24px;
}
</style>
