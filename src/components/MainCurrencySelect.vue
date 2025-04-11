<template>
  <CurrencySelect class="select" :value="main.selectedCurrency" @onChange="onChange" />
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/mainStore'
import CurrencySelect from '@/components/CurrencySelect.vue'

const main = useMainStore()

const onChange = (event: Event) => {
  main.selectedCurrency = (event.target as HTMLSelectElement).value
}
</script>

<style lang="scss" scoped>
.select {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  caret-color: var(--money-green);
  color: #2c3e50;
  outline: none;

  &:open {
    border-radius: 8px 8px 0 0;
  }
}
</style>
