<template>
  <div class="flex items-center align-middle">
    <div
      class="flex flex-col md:flex-row md:space-y-0 md:space-x-4 w-full md:w-auto"
    >
      <router-link
        v-for="item in menu.menuItems"
        :key="item.url"
        :to="item.url"
        class="text-gray-300 w-full hover:bg-gray-700 hover:text-white hover:text-opacity-80 px-5 md:px-3 py-5 md:py-2 md:rounded-md nd:text-sm font-medium"
        exact-active-class="bg-gray-900 text-white text-opacity-80 capitalize"
        >{{ item.title }}</router-link
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/stores'

const menu = useMenuStore()
</script>
