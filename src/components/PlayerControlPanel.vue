<template>
  <div class="player-control-panel">
    <!-- 5张卡盘 vertical控制垂直运动 card控制旋转运动 -->
    <div class="player-control-panel-normal-card-vertical player-control-panel-normal-card-vertical-1" :class="{ active }" @click="helpopt()">
      <div class="player-control-panel-normal-card-vertical-name" :class="{ hide }" >帮我选择</div>
      <div class="player-control-panel-normal-card player-control-panel-normal-card-1" :class="{ active ,  fix}">
        <!-- 第一张卡片代表帮我选择 -->
        <img src="@/assets/icon/help-me-choose.png" alt="" class="player-control-panel-icon">
      </div>
    </div>
    <div class="player-control-panel-normal-card-vertical player-control-panel-normal-card-vertical-2" :class="{ active }" @click="pattern()">
      <div class="player-control-panel-normal-card-vertical-name" :class="{ hide }">{{ swich[num].txt }}</div>
      <div class="player-control-panel-normal-card player-control-panel-normal-card-2" :class="{ active }">
        <!-- 第二张卡片代表洗脑循环or随机or禁止循环-->
        <img :src="swich[num].src" alt="" class="player-control-panel-icon">
      </div>
    </div>
    <div class="player-control-panel-normal-card-vertical player-control-panel-normal-card-vertical-3" :class="{ active }" @click="overlapPlay()">
      <div class="player-control-panel-normal-card-vertical-name" :class="{ hide }">{{ swich[overlap].txt }}</div>
      <div class="player-control-panel-normal-card player-control-panel-normal-card-3" :class="{ active }">
        <!-- 第三张卡片代表重叠播放 -->
        <img :src="swich[overlap].src"  alt="" class="player-control-panel-icon">
      </div>
    </div>
    <div class="player-control-panel-normal-card-vertical player-control-panel-normal-card-vertical-4" :class="{ active }" @click="stopPlay()">
      <div class="player-control-panel-normal-card-vertical-name" :class="{ hide }">{{ swich[stop].txt }}</div>
      <div class="player-control-panel-normal-card player-control-panel-normal-card-4" :class="{ active }">
        <!-- 第四张卡片代表暂停or开始 -->
        <img :src="swich[stop].src" alt="" class="player-control-panel-icon">
      </div>
    </div>
    <div class="player-control-panel-cover-card" :class="{ active }" @click="opencard()">
      <!-- 这张只代表拓展 -->
      <img src="@/assets/icon/open-card.png" v-show="open" alt="" class="player-control-panel-icon" @click="active = !active ; hide = !hide" >
      <img src="@/assets/icon/storage-card.png" v-show="!open" alt="" class="player-control-panel-icon" @click="active = !active ; hide = !hide" >
    </div>
  </div>
</template>

<script>
// 事件车，试图绑定播放事件
import bus from '@/api/bus.js'
export default {
  name: 'PlayerControlPanel',
  data: function () {
    return {
      active: true,
      hide: false,
      fix: false,
      open: true,
      plays: '',
      //  数组中序列
      num: 0,
      stop: 3,
      overlap: 5,
      // 选项数组
      swich: [
        {
          src: require('@/assets/icon/single-replay.png'),
          txt: '洗脑循环'
        },
        {
          src: require('@/assets/icon/random-play.png'),
          txt: '随机循环'
        },
        {
          src: require('@/assets/icon/spade-black.png'),
          txt: '禁止循环'
        },
        {
          src: require('@/assets/icon/noplay.png'),
          txt: '暂停播放'
        },
        {
          src: require('@/assets/icon/pause.png'),
          txt: '继续播放'
        },
        {
          src: require('@/assets/icon/no-repeat.png'),
          txt: '禁止重叠'
        },
        {
          src: require('@/assets/icon/repeat.png'),
          txt: '重叠播放'
        }
      ]
    }
  },

  mounted() {
    bus.$on('a', aa => {
      this.plays = aa
    })
  },

  methods: {
    // 随机数封装
    random(max, min) {
      return parseInt(Math.random() * (max - min + 1) + min)
    },

    //  帮我选择
    helpopt() {
      this.random(9, 0)
    },

    // 三个循环的模式
    pattern() {
      if (this.active === false) {
        return
      }
      this.num++
      if (this.num === 1) {
        // 洗脑循环
        this.num = 1
      } else if (this.num === 2) {
        // 随机循环
        this.num = 2
      } else {
        // 禁止循环
        this.num = 0
      }
    },

    // 重叠播放
    overlapPlay() {
      if (this.active === false) {
        return
      }
      this.overlap++
      if (this.overlap === 6) {
        this.overlap = 6
      } else {
        this.overlap = 5
      }
    },

    // 暂停or继续
    stopPlay() {
      if (this.active === false) {
        return
      }
      this.stop++
      if (this.stop === 4) {
        // 暂停播放
        this.$emit('stop', true)
        this.stop = 4
      } else {
        // 继续播放
        this.stop = 3
      }
    },

    // 展开以及关闭扑克牌
    opencard() {
      // 展开以及收纳
      if (this.open === true) {
        this.open = false
      } else {
        this.open = true
      }
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
.player-control-panel-normal-card-vertical-name {
  position: absolute;
  left: -115px;
  top:-35px;
  border-radius: 5px;
  background: rgba(97,97,97,.7);
  padding: 8px;
  font-size: 12px;
  color: #fff;
  /*box-shadow: 0.7px 1.3px 10px #62303d80*/
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
  transform: rotate(-50deg);
}
.player-control-panel-normal-card-2 {
  transform: rotate(-30deg);
}
.player-control-panel-normal-card-3 {
  transform: rotate(-10deg);
}
.player-control-panel-normal-card-4 {
  transform: rotate(-10deg);
}
/*.player-control-panel-normal-card-5 {*/
  /*transform: rotate(10deg);*/
/*}*/
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
  transform: translateY(-272px);
}
.player-control-panel-normal-card-vertical-2.active {
  transform: translateY(-204px);
}
.player-control-panel-normal-card-vertical-3.active {
  transform: translateY(-136px);
}
.player-control-panel-normal-card-vertical-4.active {
  transform: translateY(-68px);
}
/*.player-control-panel-normal-card-vertical-5.active {*/
  /*transform: translateY(-68px);*/
/*}*/
.hide {
  display: none;
}
.fix{
    opacity: 0.5;
}
</style>
