<template>
  <div class="links">
    <!-- 按钮组 -->
    <button-group>
      <!-- 按钮 -->
      <echo-button-link
        v-for="item in links"
        :key="item.id"
        :text="item.text"
        :url="item.url"
        :title="item.title"
      ></echo-button-link>
    </button-group>
  </div>
</template>

<script>
import ButtonGroup from '@/components/ButtonGroup'
import EchoButtonLink from '@/components/EchoButtonLink'

export default {
  name: 'Links',
  components: {
    ButtonGroup,
    EchoButtonLink
  },
  data() {
    return {
      links: [
        {
          id: 1,
          text: 'VTuber按钮合集',
          url: 'https://vtbbtn.org/'
        },
        {
          id: 2,
          text: '狐按钮',
          url: 'https://fubuki.moe/'
        },
        {
          id: 3,
          text: '狗按钮',
          url: 'https://korone.icu/'
        },
        {
          id: 4,
          text: 'Bell按钮',
          url: 'https://bell.colter.top/'
        }
      ]
    }
  }
}
</script>
