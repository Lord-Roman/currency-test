<template>
  <HeaderComponent></HeaderComponent>
  <main>
    <div class="container content">
      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>
