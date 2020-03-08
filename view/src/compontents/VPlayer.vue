<template>
  <div>
    <div class="player" v-for="(player,i) in players" :key="i">
      <div v-if="!player">
        <div class="sit" @click="sit(i)"></div>
      </div>
      <div v-else>
        <div class="photo">{{player.name}}</div>

        <div class="dice" v-if="status === 1 || status === 5 || status === 6">
          <v-dice class="dice-item" v-for="(dice,i) in new Array(player.count)" :key="i" value="0" />
        </div>
        <div class="dice" v-else-if="status === 4 || player.id === user.id">
          <v-dice class="dice-item" v-for="(dice,i) in player.dices" :key="i" :value="dice" />
        </div>
        <div class="dice" v-else>
          <v-dice class="dice-item" v-for="(dice,i) in new Array(player.count)" :key="i" value="0" />
        </div>

        <div
          v-if="status === 3 || status === 4"
          class="say"
          v-show="(player.statement && player.statement[0]) || player.abstention"
          :class="{active:player.active}"
        >
          <template v-if="(player.statement && player.statement[0])">
            <em>{{player.statement[0]}}</em>
            <span>个</span>
            <span>{{player.statement[1]}}</span>
          </template>
          <strong v-show="!player.active && player.abstention">放弃</strong>
        </div>

        <div class="status status--out" v-if="player.status === 2">OUT</div>
        <div class="status status--winner" v-if="player.status === 3">
          winner
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VDice from './VDice.vue';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['user', 'players', 'status']),
  },
  methods: {
    ...mapActions(['connection', 'sit', 'startGame', 'say', 'doubt']),
  },
  components: { VDice },
};
</script>
<style>
:root {
      --tf: linear;
      --effect: hover 1s var(--tf) infinite;
  }
</style>
<style lang="scss" scoped>
.player {
  position: absolute;
  z-index: 100;
  width: 300px;
  height: 300px;
  &:nth-child(1) {
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);

    .photo,
    .sit {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .dice {
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
    }
    .say {
      bottom: 135px;
      left: 50%;
      transform: translateX(-50%);
    }
    .status {
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:nth-child(2) {
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    .photo,
    .sit {
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    .dice {
      right: 85px;
      top: 50%;
      transform: translateY(5px);
    }
    .say {
      right: 80px;
      bottom: 50%;
      transform: translateY(-5px);
    }
    .status {
      right: 85px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &:nth-child(3) {
    top: 0;
    right: 15%;

    .photo,
    .sit {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .dice {
      top: 85px;
      left: 50%;
      transform: translateX(-50%);
    }
    .say {
      top: 135px;
      left: 50%;
      transform: translateX(-50%);
    }
    .status {
      top: 85px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:nth-child(4) {
    top: 0;
    left: 15%;
    .photo,
    .sit {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .dice {
      top: 85px;
      left: 50%;
      transform: translateX(-50%);
    }
    .say {
      top: 135px;
      left: 50%;
      transform: translateX(-50%);
    }
    .status {
      top: 85px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:nth-child(5) {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    .photo,
    .sit {
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .dice {
      left: 85px;
      top: 50%;
      transform: translateY(5px);
    }
    .say {
      left: 80px;
      bottom: 50%;
      transform: translateY(-5px);
    }
    .status {
      left: 85px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.photo,
.sit {
  position: absolute;
  display: block;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  font-size: 12px;
  line-height: 50px;
  text-align: center;
  background: #ddd;
  border-radius: 50%;

  box-shadow: 0 0 0 2px #333;
}

.sit {
  box-shadow: none;
}

.dice {
  position: absolute;
  display: flex;
  &-item {
    margin-right: 5px;
  }
  &-item:last-child {
    margin: 0;
  }
}

.say {
  position: absolute;
  font-size: 18px;
  padding: 10px 20px;
  color: #777;
  text-align: center;

  background: rgba(255, 255, 255, 0.4);
  border-radius: 30px;

  transition: all ease-out 0.3s;

  em {
    font-weight: normal;
    font-style: normal;
    font-style: none;
  }

  &.active {
    font-size: 30px;
    color: #369;
    // font-weight: bold;
    text-shadow: 0 0 1px currentColor, 1px 1px 1px #000, 2px 2px 3px #ddd;
  }
}
.status {
  position: absolute;
  display: block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  text-align: center;
  color: #fff;
  background: rgba(255, 100, 0, 0.3);
  border-radius: 30px;

  &--winner {
    color:#fff;
    background:#08c;
  }


}

</style>
