const _ = require('lodash');


class Player {
  constructor(id, name) {
    /**
     * 用户id
     */
    this.id = id;
    /**
     * 姓名
     */
    this.name = name;
    /**
     * 骰子
     */
    this.dices = [];
    /**
     * 骰子数量
     */
    this.count = 0;
    /**
     * 游戏状态
     * 0 准备中
     * 1 游戏中
     * 2 失败
     * 3 获胜
     */
    this.status = 0;
    /**
     * 声明
     */
    this.statement = [0, 0];
    /**
     * 发言生效中
     */
    this.active = false;
    /**
     * 是否放弃后续的行动
     */
    this.abstention = false;
  }

  get isInGame() {
    return this.status === 1;
  }

  reset() {
    this.dices = [];
    this.count = 0;
    this.status = 0;
    this.statement = [0, 0];
    this.active = false;
    this.abstention = false;
  }

  /**
   * 重置状态
   */
  _resetRound() {
    this.statement = [0, 0];
    this.active = false;
    this.abstention = false;
  }

  /**
   * 开始游戏
   */
  start() {
    this._resetRound();
    this.count = 5;
    this.status = 1;
  }


  /**
   * 回合开始
   */
  round() {
    if (this.status === 1) {
      this._resetRound();
      this.roll();
    }
  }

  /**
   * 结算：移除骰子
   */
  reduce() {
    if (this.status === 1) {
      this.count -= 1;
      if (this.count === 0) {
        this.lose();
      }
    }
  }

  /**
   * 随机摇骰子
   */
  roll() {
    if (this.status === 1) {
      this.dices = [];
      for (let i = 0; i < this.count; i += 1) {
        this.dices.push(parseInt(Math.random() * 6, 10) + 1);
      }
    }
  }

  /**
   * 发言操作
   */
  say(num, point) {
    this.statement = [num, point];
    this.active = true;
    this.abstention = true;
  }

  /**
   * 相应其他玩家发言
   */
  responseSay() {
    this.active = false;
    this.abstention = false;
  }

  /**
   * 弃权操作
   */
  doubt() {
    this.abstention = true;
  }

  /**
   * 相应其他玩家弃权
   */
  responseDoubt() {
    return this;
  }

  /**
   * 失败
   */
  lose() {
    this.status = 2;
    this.dices = [];
    this._resetRound();
  }

  /**
   * 获胜
   */
  win() {
    this.status = 3;
    this.dices = [];
    this._resetRound();
  }

  /**
   * 获取玩家信息
   */
  info() {
    return _.pick(this, [
      'id',
      'name',
      'dices',
      'count',
      'status',
      'statement',
      'active',
      'abstention',
    ]);
  }
}

module.exports = Player;
