<template>
  <h1 class="title">Главная</h1>
  <div class="home" v-cloak>
    <div class="variant" v-for="item in variants" :key="item.txt">
      <span class="variant_bold">1</span> {{ item.txt }} =
      <span class="variant_bold">{{ item.value }}</span> {{ selectedCurrency }}
    </div>
    <div v-if="loading" class="home__loader">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { currencies, currencyGetUrl as url } from '@/utils/helper.ts'
import { useMainStore } from '@/stores/mainStore'

interface CurrencyVariant {
  txt: string
  value: number
}

interface CurrencyResponse {
  [key: string]: number
}

const main = useMainStore()
const variants = ref<CurrencyVariant[]>([])
const selectedCurrency = ref<string>('')
const loading = ref<boolean>(false)

const otherCurrencies = (): string[] =>
  currencies.filter((item: string) => item !== main.selectedCurrency)

const updateCurrency = async (): Promise<void> => {
  loading.value = true
  try {
    const response = await fetch(url)
    const result: CurrencyResponse = await response.json()

    variants.value = []
    otherCurrencies().forEach((currency: string) => {
      const item: CurrencyVariant = {
        value: result[`${currency}-${main.selectedCurrency}`.toLowerCase()] || 0,
        txt: currency,
      }
      variants.value.push(item)
    })
    selectedCurrency.value = main.selectedCurrency
    loading.value = false
  } catch (e: unknown) {
    console.warn(e)
    loading.value = false
  }
}

main.$subscribe(updateCurrency)
onMounted(async (): Promise<void> => {
  await updateCurrency()
})
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  &__loader {
    position: absolute;
    right: 0px;
    top: 0;
  }
}
.variant {
  font-size: 24px;
  padding-block: 6px;
  font-weight: 600;
  &_bold {
    font-size: 30px;
  }
}
[v-cloak] {
  display: none;
}
</style>
