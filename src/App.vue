<template>
  <header>
    <div class="container topmenu">
      <nav>
        <RouterLink to="/" class="topmenu__link">Главная</RouterLink>
        <RouterLink to="/convert" class="topmenu__link">Конвертация</RouterLink>
      </nav>
      <div class="topmenu__currency">
        <MainCurrencySelect></MainCurrencySelect>
      </div>
    </div>
  </header>
  <main>
    <div class="container content">
      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainCurrencySelect from '@/components/MainCurrencySelect.vue'
</script>

<style lang="scss" scoped>
header {
  padding-block: 1.2rem;
  background-color: #fff;
  box-shadow: 2px 3px 10px rgba(234, 236, 239, 1);
}
nav {
  display: flex;
}
.topmenu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__link {
    position: relative;
    padding: 12px;
    border-bottom: 2px solid transparent;
    color: var(--vt-c-indigo);
    text-decoration: none;
    transition: color 0.3s;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      height: 2px;
      width: 0%;
      background: var(--money-green);
      transition: 0s;
    }
    &::before {
      content: '';
      position: absolute;
      right: 0;
      bottom: -2px;
      height: 2px;
      width: 0%;
      background: var(--money-green);
      transition: 0.3s;
    }
    &:hover {
      &::after {
        transition: 0.3s;
        width: 100%;
      }
      &::before {
        transition: 0.3s 0.3s;
        width: 100%;
      }
    }
    &.router-link-active {
      color: var(--money-green);
    }
  }
}
.content {
  padding-block: 2.4rem;
}

.navbar-menu {
  list-style: none;
  display: flex;
}

.navbar-menu li {
  margin-right: 2rem;
}
</style>
