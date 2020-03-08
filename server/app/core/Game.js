const _ = require('lodash');

const Player = require('./Player');

class Game {
  constructor() {
    /**
     * 入座玩家
     */
    this.players = [null, null, null, null, null];
    /**
     * 游戏状态
     * 0: 未开始
     * 1: 游戏开始阶段
     * 2: 回合开始阶段
     * 3: 回合进行阶段 (允许发言\弃权操作)
     * 4: 回合判定阶段
     * 5: 回合结算阶段
     * 6: 游戏结束阶段
     */
    this.status = 0;
    /**
     * 游戏中的玩家
     */
    this.playersInGame = [];
    /**
     * 生效中的玩家
     */
    this.activePlayer = null;
    /**
     * 是否回答正确
     */
    this.correct = false;
  }

  _getPlayer(id) {
    return this.players.find((el) => el && el.id === id);
  }

  /**
   * do
   * @param {String} playerType  allPlayer allPlayerInGame activePlayerInGame othersPlayerInGame
   * @param {Array} action  所有玩家进程
   * @param {Function} fn 自定义时间
   */
  do(playerType, fn) {
    let players = [];
    switch (playerType) {
      case 'allPlayer':
        players = this.players.filter((el) => el);
        break;
      case 'allPlayerInGame':
        players = this.playersInGame;
        break;
      case 'activePlayerInGame':
        players = this.activePlayer ? [this.activePlayer] : [];
        break;
      case 'othersPlayerInGame':
        players = this.playersInGame.filter((el) => el !== this.activePlayer);
        break;
      default:
    }
    players.forEach((player) => {
      if (fn) fn(player);
    });
  }

  reset() {
    this.players = [null, null, null, null, null];
    this.status = 0;
    this.playersInGame = [];
    this.activePlayer = null;
    this.correct = false;
    this.do('allPlayer', (player) => {
      player.reset();
    });
  }

  /**
   * 入座
   * @param {*} id
   * @param {*} name
   */
  sit(sitNum, id, name) {
    if (this._canSit(sitNum, id)) {
      this.players[sitNum] = new Player(id, name);
    }
  }

  _canSit(sitNum, id) {
    return !(this._getPlayer(id)) && !this.players[sitNum];
  }

  /**
   * 判断能否开始游戏
   */
  canStart() {
    if (this.players.filter((el) => !!el).length < 2) return false;
    if (this.status !== 0 && this.status !== 6) return false;
    return true;
  }

  /**
   * 游戏开始阶段
   */
  start() {
    this.playersInGame = this.players.filter((el) => !!el);

    this.do('allPlayerInGame', (player) => {
      player.start();
    });

    this.status = 1;

    return true;
  }


  /**
   * 回合开始阶段
   */
  roundStart() {
    this.status = 2;
    this.activePlayer = null;
    this.do('allPlayerInGame', (player) => {
      player.round();
    });
  }

  /**
   * 回合行动阶段
   */
  roundAction() {
    this.status = 3;
  }

  /**
   * 能否发言
   */
  canSay(id, num, point) {
    // 发言阶段
    if (this.status !== 3) return false;
    if (this.activePlayer) {
      // 发言生效中
      if (this.activePlayer.id === id) return false;
      // 数量不符合规则
      if (this.activePlayer.statement[0] > num) return false;
      if (this.activePlayer.statement[0] === num && this.activePlayer.statement[1] >= point) {
        return false;
      }
      // 已经行动过
      const player = this._getPlayer(id);
      if (player && player.abstention) return false;
    }

    return true;
  }

  /**
   * 用户操作：发言
   * @param {*} id
   * @param {*} num
   * @param {*} point
   */
  say(id, num, point) {
    const player = this._getPlayer(id);
    this.activePlayer = player;

    this.do('activePlayerInGame', (p) => {
      p.say(num, point);
    });

    this.do('othersPlayerInGame', (p) => {
      p.responseSay();
    });
  }

  canDoubt(id) {
    if (this.status !== 3) return false;
    if (!this.activePlayer) return false;
    if (this.activePlayer.id === id) return false;
    return true;
  }

  /**
   * 用户操作：放弃操作
   * @param {*} id
   */
  doubt(id) {
    const player = this._getPlayer(id);
    player.doubt();
  }

  /**
   * 是否进入结算阶段
   */
  needToRoundEnd() {
    return this.playersInGame.every((el) => el.abstention);
  }

  /**
   * 判断是否回答正确
   */
  isCorrect() {
    const [num, point] = this.activePlayer.statement;
    const all = _.flatten(this.playersInGame.map((el) => el.dices));
    const count = all.filter((el) => el === 1 || el === point).length;
    console.log(all, num, count);
    return num <= count;
  }

  /**
   * 回合判断阶段
   */
  roundJudge() {
    this.status = 4;
    this.correct = this.isCorrect();
  }

  /**
   * 回合结算阶段
   */
  roundEnd() {
    this.status = 5;
    if (this.correct) {
      this.do('othersPlayerInGame', (p) => {
        p.reduce();
      });
    } else {
      this.do('activePlayerInGame', (p) => {
        p.reduce();
      });
    }
  }

  /**
   * 是否进入回合结束阶段
   */
  needToGameOver() {
    return this._lastOne();
  }


  _lastOne() {
    const players = this.playersInGame.filter((el) => el.count);
    if (players.length === 1) return players[0];
    return false;
  }

  /**
   * 游戏结束
   */
  over() {
    this.status = 6;

    const player = this._lastOne();
    player.win();
  }


  /**
   *
   */
  info() {
    const data = _.pick(this, ['players', 'status', 'statement', 'correct']);
    return data;
  }
}

module.exports = Game;
