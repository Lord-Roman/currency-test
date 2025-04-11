import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {
  const selectedCurrency = ref('RUB')

  return { selectedCurrency }
})
