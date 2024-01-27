<template>
  <div class="flex-shrink-0 flex items-center space-x-3">
    <logo :class="logoClass" role="logo" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Logo from '@/assets/logo.svg'

const props = defineProps({
  size: String,
})

const logoClass = computed(() => {
  switch (props.size) {
    case 'xl':
      return 'w-36 object-contain'
    default:
      return 'w-28 object-contain'
  }
})
</script>
