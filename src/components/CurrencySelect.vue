<template>
  <select @change="OnChange">
    <option v-for="currency in currencies" :key="currency" :selected="currency == value">
      {{ currency }}
    </option>
  </select>
</template>
<script setup lang="ts">
import { currencies } from '@/utils/helper.ts'

const emit = defineEmits(['OnChange'])
defineProps(['value'])

const OnChange = (event) => {
  emit('OnChange', event)
}
</script>
