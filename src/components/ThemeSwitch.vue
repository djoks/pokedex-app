<template>
  <div
    class="flex h-6 w-[4em] select-none transition duration-200 ease-in rounded-full"
    :class="{
      'bg-yellow-500': !isDarkMode,
      'bg-blue-500': isDarkMode,
    }"
    data-test="toggle-switch"
    @click="toggleTheme"
  >
    <div
      class="flex items-center justify-center bg-white dark:bg-opacity-80 w-6 h-6 rounded-full shadow-sm inset-y-0 focus-within:shadow-outline transition transform duration-100 ease-in-out"
      :class="{ 'translate-x-8': isDarkMode }"
    >
      <moon-icon
        v-if="isDarkMode"
        class="w-4 h-4 object-contain"
        role="light-mode-icon"
      />
      <sun-icon v-else class="w-4 h-4 object-contain" role="dark-mode-icon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SunIcon from '@/assets/sun-icon.svg'
import MoonIcon from '@/assets/moon-icon.svg'
import { useThemeStore } from '@/stores'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { toggleTheme } = themeStore

const { isDarkMode } = storeToRefs(themeStore)
</script>
