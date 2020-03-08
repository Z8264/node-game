<template>
  <div class="login" v-show="!user.id">
    <form>
      <label>账号</label>
      <input placeholder="姓名" v-model.trim="name" />
      <input type="password" placeholder="password" v-model.trim="password" />
    </form>

    <a href="javascript:void(0)" @click="login({name,password})">登录</a>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {

  data() {
    return {
      name: '',
      password: '',
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['login']),
  },

};
</script>
<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #fff;
}
</style>
