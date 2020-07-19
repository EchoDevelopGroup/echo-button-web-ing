<template>
  <!-- 桃按钮和上传页面采用的布局 -->
  <div class="button-layout">
    <div class="button-layout-navigator">
      <!-- 左侧的按钮组列表 导航组 -->
      <button-navigator :button-list="buttons"></button-navigator>
      <div class="button-layout-navigator-placeholder"></div>

      <!-- 上传和审核按钮 -->
      <router-link to="/upload" class="button-layout-navigator-button" v-slot="{ href, navigate }">
        <round-button :href="href" which="upload" @click="navigate"></round-button>
      </router-link>
      <router-link to="/" class="button-layout-navigator-button" v-slot="{ href, navigate }">
        <round-button :href="href" which="audit" @click="navigate"></round-button>
      </router-link>
    </div>
    <div class="main-container">
      <transition name="area-fade" @enter="startTransition">
        <slot>
          <router-view></router-view>
        </slot>
      </transition>
    </div>
    <div class="transition-spade" v-if="render">
      <div class="transition-space-anchor">
        <img
          src="@/assets/icon/spade-black.png"
          alt="spade"
          class="transition-spade-img"
          :class="{ 'transition-spade-img-expand': expand, 'transition-spade-img-vanish': vanish }"
        >
      </div>
    </div>

    <!-- 为了预加载 -->
    <img src="@/assets/icon/spade-black.png" alt="spade" class="pre-load">
  </div>
</template>

<script>
import ButtonNavigator from '@/components/ButtonNavigator'
import RoundButton from '@/components/RoundButton'
import { mapGetters } from 'vuex'

function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default {
  name: 'ButtonLayout',
  components: {
    ButtonNavigator,
    RoundButton
  },
  data() {
    return {
      // buttons: [
      //   '镇站之宝',
      //   '软桃',
      //   '通用',
      //   'HSO',
      //   '怪叫'
      // ],
      transition: false,
      render: false,
      expand: false,
      vanish: false
    }
  },
  computed: {
    ...mapGetters({
      buttons: 'buttonClassificationList'
    }),
    // 当前类别的ID
    classId() {
      return this.$route.params.id
    }
  },
  watch: {
    // 切换页面时重新触发切换页面的动画
    classId() {
      this.startTransition()
    }
  },
  created() {
    // setTimeout(() => {
    //   this.startTransition()
    // }, 1000)
  },
  methods: {
    async startTransition(done) {
      if (this.transition) {
        return
      }
      this.transition = true

      this.expand = false
      this.vanish = false
      await wait(16)
      this.render = true
      await wait(100)
      this.expand = true
      await wait(2000)
      this.vanish = true
      await wait(1000)
      this.render = false
      await wait(16)
      this.expand = false
      this.vanish = false
      await wait(16)

      this.transition = false
      done()
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
  width: 0;
  height: auto;
  transition: width 2s cubic-bezier(.34,.42,.85,-0.42),
    height 2s cubic-bezier(.34,.42,.85,-0.42),
    opacity 1s linear;
}
.transition-spade-img-expand {
  width: 200vw;
}
.transition-spade-img-vanish {
  opacity: 0;
}
</style>
