import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { MenuItem } from '@/types'

const useMenuStore = defineStore('useMenuStore', () => {
  const isVisible: Ref<boolean> = ref(false)

  const menuItems: Ref<MenuItem[]> = ref([
    { url: '/', title: 'Home' }
  ])

  const toggleMenu = () => {
    isVisible.value = true
  }

  const closeMenu = () => {
    isVisible.value = false
  }

  return { isVisible, menuItems, toggleMenu, closeMenu }
})

export default useMenuStore
