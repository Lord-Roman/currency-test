import { fetchRates, type CurrencyRates } from '@/api/currencyService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCurrencyStore = defineStore('currencyStore', () => {
  const selectedCurrency = ref<string>('RUB')
  const rates = ref<CurrencyRates>({})
  const error = ref<string | null>(null)

  const loadRates = async () => {
    try {
      error.value = null
      rates.value = await fetchRates()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    }
  }

  const getRate = (currencyPair: string) => {
    return rates.value[currencyPair] || 0
  }

  return {
    selectedCurrency,
    rates,
    error,
    loadRates,
    getRate,
  }
})
