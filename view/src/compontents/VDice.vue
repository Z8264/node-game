<template>
  <div class="vdice" @click="$emit('click')">
    <div class="first-face" v-if="value==1">
      <span class="pip"></span>
    </div>
    <div class="second-face" v-else-if="value==2">
      <span class="pip"></span>
      <span class="pip"></span>
    </div>
    <div class="third-face" v-else-if="value==3">
      <span class="pip"></span>
      <span class="pip"></span>
      <span class="pip"></span>
    </div>
    <div class="fourth-face" v-else-if="value==4">
      <div class="column">
        <span class="pip"></span>
        <span class="pip"></span>
      </div>
      <div class="column">
        <span class="pip"></span>
        <span class="pip"></span>
      </div>
    </div>
    <div class="fifth-face" v-else-if="value==5">
      <div class="column">
        <span class="pip"></span>
        <span class="pip"></span>
      </div>
      <div class="column">
        <span class="pip"></span>
      </div>
      <div class="column">
        <span class="pip"></span>
        <span class="pip"></span>
      </div>
    </div>
    <div class="sixth-face" v-else-if="value==6">
      <div class="column">
        <span class="pip"></span>
        <span class="pip"></span>
        <span class="pip"></span>
      </div>
      <div class="column">
        <span class="pip"></span>
        <span class="pip"></span>
        <span class="pip"></span>
      </div>
    </div>
    <div class="none-face" v-else></div>
  </div>
</template>
<script>
export default {

  data() {
    return {};
  },
  props: {
    value: {
      default: 0,
    },
  },

};
</script>
<style lang="scss" scoped>
.vdice {
  width: 40px;
  height: 40px;
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

.first-face {
  display: flex;
  justify-content: center;
  align-items: center;
  .pip {
    width: 12px;
    height: 12px;
    background: red;
  }
}
.second-face {
  display: flex;
  justify-content: space-between;
}
.second-face .pip:nth-of-type(2) {
  align-self: flex-end;
}
.third-face {
  display: flex;
  justify-content: space-between;
}
.third-face .pip:nth-of-type(2) {
  align-self: center;
}
.third-face .pip:nth-of-type(3) {
  align-self: flex-end;
}
.fourth-face,
.sixth-face {
  display: flex;
  justify-content: space-between;
}
.fourth-face .column,
.sixth-face .column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.fifth-face {
  display: flex;
  justify-content: space-between;
}
.fifth-face .column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.fifth-face .column:nth-of-type(2) {
  justify-content: center;
} /* OTHER STYLES */
[class$="face"] {
  margin: 0;
  padding: 6px;
  background-color: #e7e7e7;
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-shadow: inset 0 2px white, inset 0 -2px #bbb, inset 2px 0 #d7d7d7,
    inset -2px 0 #d7d7d7;
  border-radius: 10%;
}
.pip {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #333;
}
</style>
