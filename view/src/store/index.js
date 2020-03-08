import Vue from 'vue';
import Vuex from 'vuex';
// import _ from 'lodash';


import socket from '../socket';


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    user: {
      id: 0,
      name: '游客',
    },
    players: [null, null, null, null, null],
    activeIndex: -1,
    status: 0,
    messages: [],
    correct: false, // 是否正确
  },
  getters: {},
  actions: {
    connection({ state }) {
      const token = localStorage.getItem('token');
      if (token) {
        socket.emit('identify', { token });
      }
      /**
       * 身份验证
       */
      socket.on('identify', (res) => {
        if (res.data) {
          state.user = res.data;
        } else {
          localStorage.removeItem('token');
        }
      });
      /**
       * 登录
       */
      socket.on('login', (res) => {
        if (res.data) {
          localStorage.setItem('token', res.data.token);
          state.user = res.data.user;
        } else {
          alert(res.data);
        }
      });

      /**
        * 全局消息
      */
      socket.on('message', (msg) => {
        if (state.messages.length >= 5) {
          state.messages.splice(0, 1);
        }
        state.messages.push(msg);
      });
      /**
       * 获取游戏信息
       */
      socket.on('refresh', (res) => {
        state.players = res.players;
        if (state.user.id) {
          const index = state.players.findIndex((el) => el && el.id === state.user.id);
          if (index !== -1) {
            const players = state.players.splice(0, index);
            state.players.push(...players);
          }
        }

        state.status = res.status;
        state.activeIndex = res.activeIndex;
        state.correct = res.correct;
      });
    },

    login(o, { name, password }) {
      socket.emit('login', { name, password });
    },
    sit(o, seatIndex) {
      const token = localStorage.getItem('token');
      socket.emit('sit', {
        token,
        seatIndex,
      });
    },

    startGame() {
      socket.emit('startGame');
    },
    resetGame() {
      socket.emit('resetGame');
    },
    say({ state }, { num, point }) {
      socket.emit('say', {
        num,
        point,
        id: state.user.id,
      });
    },
    doubt({ state }) {
      socket.emit('doubt', {
        id: state.user.id,
      });
    },
  },
});
