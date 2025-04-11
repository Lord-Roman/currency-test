<template>
  <select @change="onChange">
    <option v-for="currency in currencies" :key="currency" :selected="currency === value">
      {{ currency }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { currencies } from '@/utils/helper.ts'

interface Props {
  value: string
}

const emit = defineEmits<{
  (e: 'OnChange', event: Event): void
}>()

defineProps<Props>()

const onChange = (event: Event) => {
  emit('OnChange', event)
}
</script>
