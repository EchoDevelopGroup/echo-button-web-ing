<template>
  <!-- 桃按钮和上传页面采用的布局 -->
  <div class="button-layout">
    <div class="button-layout-navigator">
      <!-- 左侧的按钮组列表 导航组 -->
      <button-navigator :button-list="buttons" @click="handleClickNavigator" v-if="!showMobileNavigator"></button-navigator>
      <button-navigator-mobile :button-list="buttons" @click="handleClickNavigator" v-else></button-navigator-mobile>
      <div class="button-layout-navigator-placeholder"></div>

      <!-- 上传和审核按钮 -->
      <router-link to="/upload" class="button-layout-navigator-button" v-slot="{ href, navigate }">
        <round-button :href="href" which="upload" @click="navigate"></round-button>
      </router-link>
      <router-link v-if="showExtendButton" to="/audit" class="button-layout-navigator-button" v-slot="{ href, navigate }">
        <round-button :href="href" which="audit" @click="navigate"></round-button>
      </router-link>
      <router-link v-if="showExtendButton" to="/cave" class="button-layout-navigator-button" v-slot="{ href, navigate }">
        <round-button :href="href" which="cave" @click="navigate"></round-button>
      </router-link>
    </div>

    <!-- 主体内容 -->
    <div class="main-container">
      <transition :css="false"
        @leave="scheduleTransition"
        mode="out-in"
      >
        <slot>
          <router-view></router-view>
        </slot>
      </transition>
    </div>

    <!-- 黑桃放大动效 -->
    <div class="transition-spade" v-if="render">
      <div class="transition-space-anchor">
        <img
          ref="spadeImg"
          src="@/assets/icon/spade-black.png"
          alt="spade"
          class="transition-spade-img"
          :class="{ 'transition-spade-img-expand': expand, 'transition-spade-img-vanish': vanish, ['transition-spade-img-' + animationLevel]: true }"
        >
      </div>
    </div>

    <!-- 为了预加载 -->
    <img src="@/assets/icon/spade-black.png" alt="spade" class="pre-load">
  </div>
</template>

<script>
import ButtonNavigator from '@/components/ButtonNavigator'
import ButtonNavigatorMobile from '@/components/ButtonNavigatorMobile'
import RoundButton from '@/components/RoundButton'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { AnimationController } from '../util/animation'

function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

// 不同动画速度下延迟的时长
const timeMap = {
  1: [2000, 1000],
  2: [1600, 800],
  3: [1200, 600],
  4: [800, 400],
  5: [400, 200]
}

export default {
  name: 'ButtonLayout',
  components: {
    ButtonNavigator,
    ButtonNavigatorMobile,
    RoundButton
  },
  data() {
    return {
      transition: false,
      render: false,
      expand: false,
      vanish: false,

      // 动画控制器
      controller: null
    }
  },
  computed: {
    ...mapGetters({
      config: 'config',
      buttons: 'buttonClassificationListWithHash',
      clientWidth: 'clientWidth'
    }),
    // 是否启用快速动画
    fastAnimation() {
      return this.config.fastAnimation
    },
    // 是否启用自动加速
    autoIncrease() {
      return this.config.autoIncrease
    },
    // 动画速度等级 1最慢 5最快
    animationLevel() {
      return this.config.animationLevel
    },
    // 当前类别的ID
    classId() {
      return this.$route.params.id
    },
    // 当前动画速度等级下 进入和退出动画各多久
    timeSerial() {
      return timeMap[this.animationLevel] || timeMap[3] // 配置错误就按中等速度来
    },
    // 是否显示手机端导航
    showMobileNavigator() {
      return this.clientWidth < 750
    },
    // 是否显示上传页面和树洞页面的入口按钮
    showExtendButton() {
      return this.clientWidth > 600
    }
  },
  watch: {
    // 切换页面时重新触发切换页面的动画
    classId() {
      // this.scheduleTransition(null, () => {})
      this.controller.sendRequest(() => {
        this.setDisplayClassId(this.classId)
      })
    },
    // 配置改变的时候同时更新controller
    fastAnimation() {
      this.controller.fastAnimation = this.fastAnimation
    }
  },
  created() {
    this.controller = new AnimationController(this.enterAnimate, this.leaveAnimate)
  },
  methods: {
    ...mapMutations({
      setDisplayClassId: 'setDisplayClassId',
      setConfig: 'setConfig'
    }),
    ...mapActions({
      saveLocalConfig: 'saveLocalConfig'
    }),
    // 用户点击导航组中的某一个
    handleClickNavigator(index) {
      // 如果点击的不是那个黑桃
      if (index >= 0) {
        this.$nextTick(() => {
          if (index === this.buttons.length) {
            // 友情链接
            this.$router.push('/links').catch(() => {})
          } else {
            const targetId = this.buttons[index].hash
            const currentId = this.$route.params.id
            // 看一下点击的目标是不是当前页面
            if (targetId !== currentId) {
              this.$router.push({
                name: 'button',
                params: {
                  id: targetId
                }
              }).catch(err => {
                console.log('[Router] navigate failed', err)
              })
            }
          }
        })
      } else if (index === -2) {
        this.$router.push({
          name: 'cave'
        }).catch(err => {
          console.log('[Router] navigate to cave failed', err)
        })
      }
    },
    // 启动切页动画
    scheduleTransition(el, done) {
      this.controller.sendRequest(done)
    },
    // 等下一个可用渲染帧
    next() {
      return new Promise(resolve => {
        // 先等vue的下一个VDOM tick
        this.$nextTick(() => {
          // 然后等待浏览器的下一个渲染帧
          requestAnimationFrame(() => {
            // 我也挺迷的 似乎一帧不太够用 所以等两帧
            requestAnimationFrame(() => {
              resolve()
            })
          })
        })
      })
    },
    // 进入动画
    async enterAnimate() {
      this.expand = false
      this.vanish = false
      await this.next()
      this.render = true
      await this.next()
      this.expand = true
      await wait(this.timeSerial[0])
    },
    // 离开动画
    async leaveAnimate() {
      this.vanish = true
      await wait(this.timeSerial[1])
      this.render = false
      await this.next()
      this.expand = false
      this.vanish = false
      await this.next()
      if (this.autoIncrease) {
        this.setConfig({
          ...this.config,
          // 最快只加速到第四档
          animationLevel: Math.min(4, this.config.animationLevel + 1)
        })
        this.saveLocalConfig()
      }
    }
  }
}
</script>

<style>
.button-layout {
  padding: 30px 40px;
}
.button-layout-navigator {
  display: flex;
  align-items: center;
}
.button-layout-navigator-placeholder {
  flex: 1 0 auto;
}
.button-layout-navigator-button {
  margin-left: 15px;
}
</style>

<style scoped>
.navigator {
  display: flex;
  flex-direction: row;
}
.button-list {
  margin: 0;
  padding: 0;
  flex: 1;
  list-style: none;
  display: flex;
}
.button-list li {
  padding: 10px;
  background-color: #e64e8c;
}
.button-list li:nth-child(2n) {
  background-color: #fd6e9a;
}
.main-container {
  margin-top: 25px;
}
.pre-load {
  position: fixed;
  width: 1px;
  height: 1px;
  opacity: 0.01;
  bottom: -1px;
  right: -1px;
}

.transition-spade {
  position: fixed;
  /* 选2000是因为很多UI库最顶层index是1000 */
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.transition-space-anchor {
  position: relative;
  width: 200vw;
  height: 230vw;
}
.transition-spade-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: block;
  width: 200vw;
  height: auto;
  transform: scale(0);
}
@media screen and (max-width: 850px) {
  .transition-space-anchor {
    width: 240vh;
    height: 276vh;
  }
  .transition-spade-img {
    width: 240vh;
  }
}
.transition-spade-img-expand {
  transform: scale(1);
}
.transition-spade-img-vanish {
  opacity: 0;
}
.transition-spade-img-1 {
  transition: transform 2s cubic-bezier(.34,.42,.85,-0.42),
    opacity 1s linear;
}
.transition-spade-img-2 {
  transition: transform 1.6s cubic-bezier(.34,.42,.85,-0.42),
    opacity 0.8s linear;
}
.transition-spade-img-3 {
  transition: transform 1.2s cubic-bezier(.19,.35,1,-0.34),
    opacity 0.6s linear;
}
.transition-spade-img-4 {
  transition: transform 0.8s cubic-bezier(.34,.55,1,-0.34),
    opacity 0.4s linear;
}
.transition-spade-img-5 {
  transition: transform 0.4s linear,
    opacity 0.2s linear;
}

@media screen and (max-width: 1050px) {
  .button-layout {
    padding: 30px;
  }
}
@media screen and (max-width: 950px) {
  .button-layout {
    padding: 20px;
  }
}
@media screen and (max-width: 850px) {
  .button-layout {
    padding: 12px;
  }
}
</style>
