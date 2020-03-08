
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { secret } = require('./config');

const userData = require('./userData');
const Game = require('./core/Game');


const game = new Game();


const sleep = (timeountMS) => new Promise((resolve) => {
  setTimeout(resolve, timeountMS);
});

module.exports = (io) => {
  io.on('connection', (socket) => {
    /**
     * 用户操作：入座
     */
    socket.on('sit', (data) => {
      jwt.verify(data.token, secret, (err, user) => {
        game.sit(data.seatIndex, user.id, user.name);
        io.in('game').emit('refresh', game);
      });
    });

    /**
     * 用户操作：重置游戏
     */
    socket.on('resetGame', async () => {
      game.reset();
      io.in('game').emit('refresh', game);
    });

    /**
     * 用户操作：开始游戏
     */
    socket.on('startGame', async () => {
      if (game.canStart()) {
        game.start();
        io.in('game').emit('refresh', game);

        await sleep(1000);
        game.roundStart();
        io.in('game').emit('refresh', game);

        await sleep(1000);
        game.roundAction();
        io.in('game').emit('refresh', game);
      } else {
        socket.emit('message', '无法开始游戏');
      }
    });

    /**
     * 用户操作：发言
     */
    socket.on('say', (data) => {
      if (game.canSay(data.id, data.num, data.point)) {
        game.say(data.id, data.num, data.point);
        io.in('game').emit('refresh', game);
      } else {
        socket.emit('message', '你无法发言');
      }
    });

    /**
     * 用户操作：放弃
     */
    socket.on('doubt', async (data) => {
      if (game.canDoubt(data.id)) {
        game.doubt(data.id);
        io.in('game').emit('refresh', game);

        if (game.needToRoundEnd()) {
          await sleep(2000);
          game.roundJudge();
          io.in('game').emit('refresh', game);

          await sleep(5000);
          game.roundEnd();
          io.in('game').emit('refresh', game);

          if (game.needToGameOver()) {
            await sleep(1000);
            game.over();
            io.in('game').emit('refresh', game);
          } else {
            await sleep(1000);
            game.roundStart();
            io.in('game').emit('refresh', game);

            await sleep(1000);
            game.roundAction();
            io.in('game').emit('refresh', game);
          }
        }
      } else {
        socket.emit('message', '你无法放弃');
      }
    });

    /**
     * 身份验证
     * data: {token}
     */
    socket.on('identify', (data) => {
      jwt.verify(data.token, secret, (err, user) => {
        if (!err && _.find(userData, (el) => (el.name === user.name && el.id === user.id))) {
          socket.emit('identify', {
            data: {
              id: user.id,
              name: user.name,
            },
          });
          socket.join('game');
          io.in('game').emit('message', `${user.name}进入房间`);
          io.in('game').emit('refresh', game);
          return;
        }
        socket.emit('identify', { data: false });
      });
    });
    /**
     * 登录
     * data {name,password}
     */
    socket.on('login', (data) => {
      let result = {};
      const user = _.find(userData, (el) => el.name === data.name);

      if (!user) {
        result = {
          message: '用户不存在',
          data: false,
        };
      } else if (user.password !== data.password) {
        result = {
          message: '密码不正确',
          data: false,
        };
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
          },
          secret,
          { expiresIn: '1d' },
        );
        result = {
          message: '登录成功',
          data: {
            user: {
              id: user.id,
              name: user.name,
            },
            token,
          },
        };
      }
      socket.emit('login', result);
      socket.join('game');
      io.in('game').emit('message', `${user.name}进入房间`);
      io.in('game').emit('refresh', game);
    });
  });
};
