<template>
  <app-bar />
  <main
    class="flex justify-center h-screen dark:bg-gray-800 transition-all delay-50"
  >
    <router-view />
  </main>
  <teleport to="#modals">
    <app-toast v-if="toast.isVisible" />
  </teleport>
</template>

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue'
import { useToastStore } from '@/stores'
import { AppToast } from '@/components'

const toast = useToastStore()
</script>
