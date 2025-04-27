import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currencyStore', () => {
  const selectedCurrency = ref('RUB')

  return { selectedCurrency }
})
