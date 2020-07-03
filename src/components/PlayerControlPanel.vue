<template>
  <div class="player-control-panel" @click="active = !active">
    <div class="player-control-panel-normal-card-vertical player-control-panel-normal-card-vertical-1" :class="{ active }">
      <div class="player-control-panel-normal-card player-control-panel-normal-card-1" :class="{ active }">
        <img src="@/assets/icon/help-me-choose.png" alt="" class="player-control-panel-icon">
      </div>
    </div>
    <div class="player-control-panel-normal-card-vertical player-control-panel-normal-card-vertical-2" :class="{ active }">
      <div class="player-control-panel-normal-card player-control-panel-normal-card-2" :class="{ active }">
        <img src="@/assets/icon/single-replay.png" alt="" class="player-control-panel-icon">
      </div>
    </div>
    <div class="player-control-panel-normal-card-vertical player-control-panel-normal-card-vertical-3" :class="{ active }">
      <div class="player-control-panel-normal-card player-control-panel-normal-card-3" :class="{ active }">
        <img src="@/assets/icon/random-play.png" alt="" class="player-control-panel-icon">
      </div>
    </div>
    <div class="player-control-panel-normal-card-vertical player-control-panel-normal-card-vertical-4" :class="{ active }">
      <div class="player-control-panel-normal-card player-control-panel-normal-card-4" :class="{ active }">
        <img src="@/assets/icon/overlap-play.png" alt="" class="player-control-panel-icon">
      </div>
    </div>
    <div class="player-control-panel-normal-card-vertical player-control-panel-normal-card-vertical-5" :class="{ active }">
      <div class="player-control-panel-normal-card player-control-panel-normal-card-5" :class="{ active }">
        <img src="@/assets/icon/pause.png" alt="" class="player-control-panel-icon">
      </div>
    </div>
    <div class="player-control-panel-cover-card" :class="{ active }">
      <img src="@/assets/icon/play.png" alt="" class="player-control-panel-icon">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerControlPanel',
  data() {
    return {
      active: false
    }
  }
}
</script>

<style>
.player-control-panel {
  position: fixed;
  bottom: 26px;
  right: 26px;
  z-index: 100;
}
.player-control-panel-normal-card,
.player-control-panel-cover-card {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33px;
  height: 43px;
  border-radius: 4px;
  /**
   * 21deg = 180deg - 159deg
   * 0.7px = 7px * 0.2775 * sin(21deg)
   * 1.8px = 7px * 0.2775 * cos(21deg)
   * 10px = 36px * 0.2775
   */
  box-shadow: 0.7px 1.3px 10px #62303d80;
  transition: transform 0.4s;
  transform-origin: 25% 100%;
}
.player-control-panel-normal-card-vertical {
  transition: transform 0.4s;
}
.player-control-panel-normal-card {
  background-color: #fff;
}
.player-control-panel-cover-card {
  background-color: #fd507e;
}
.player-control-panel-icon {
  display: block;
  width: 33px;
  height: 33px;
}
.player-control-panel-normal-card-1 {
  transform: rotate(-70deg);
}
.player-control-panel-normal-card-2 {
  transform: rotate(-50deg);
}
.player-control-panel-normal-card-3 {
  transform: rotate(-30deg);
}
.player-control-panel-normal-card-4 {
  transform: rotate(-10deg);
}
.player-control-panel-normal-card-5 {
  transform: rotate(10deg);
}
.player-control-panel-cover-card {
  transform: rotate(30deg);
}
.player-control-panel-normal-card-1.active {
  transform: rotate(20deg);
}
.player-control-panel-normal-card-2.active {
  transform: rotate(20deg);
}
.player-control-panel-normal-card-3.active {
  transform: rotate(20deg);
}
.player-control-panel-normal-card-4.active {
  transform: rotate(20deg);
}
.player-control-panel-normal-card-5.active {
  transform: rotate(20deg);
}
.player-control-panel-cover-card.active {
  transform: rotate(20deg);
}
.player-control-panel-normal-card-vertical-1.active {
  transform: translateY(-340px);
}
.player-control-panel-normal-card-vertical-2.active {
  transform: translateY(-272px);
}
.player-control-panel-normal-card-vertical-3.active {
  transform: translateY(-204px);
}
.player-control-panel-normal-card-vertical-4.active {
  transform: translateY(-136px);
}
.player-control-panel-normal-card-vertical-5.active {
  transform: translateY(-68px);
}
</style>
