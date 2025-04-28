<template>
  <h1 class="title">Главная</h1>
  <div class="home" v-cloak>
    <div class="variant" v-for="item in variants" :key="item.txt">
      <span class="variant_bold">1</span> {{ item.txt }} =
      <span class="variant_bold">{{ item.value }}</span> {{ selectedCurrency }}
    </div>
    <div v-if="isLoading" class="home__loader">
      <div class="loader"></div>
    </div>
    <div v-if="store.error" class="error">
      {{ store.error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { currencies } from '@/utils/helper.ts'
import { useCurrencyStore } from '@/stores/currencyStore'
import { storeToRefs } from 'pinia'

interface CurrencyVariant {
  txt: string
  value: number
}

const store = useCurrencyStore()
const { selectedCurrency } = storeToRefs(store)
const isLoading = ref<boolean>(false)

const variants = computed<CurrencyVariant[]>(() => {
  return currencies
    .filter((item) => item !== store.selectedCurrency)
    .map((currency) => ({
      value: store.getRate(`${currency}-${store.selectedCurrency}`.toLowerCase()),
      txt: currency,
    }))
})

const loadData = async () => {
  try {
    isLoading.value = true
    await store.loadRates()
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (Object.keys(store.rates).length === 0) {
    loadData()
  }
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
