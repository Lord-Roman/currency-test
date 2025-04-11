<template>
  <div class="about">
    <h1 class="title">Конвертация</h1>
    <form class="form__exchange">
      <div class="exchange">
        <input
          class="exchange__text exchange__input"
          v-model="alphaCurrency"
          @input="alphaCurrencyInput"
          type="number"
          min="0"
          inputmode="numeric"
          pattern="\d*"
        />
        <div class="separetor" />
        <CurrencySelect
          class="exchange__text exchange__currency-state"
          :value="alphaCurrencyState"
          @OnChange="alphaCurrencyOnChange"
        />
      </div>
      <div class="exchange">
        <input
          class="exchange__text exchange__input"
          v-model="omegaCurrency"
          @input="omegaCurrencyInput"
          type="number"
          min="0"
          inputmode="numeric"
          pattern="\d*"
        />
        <div class="separetor" />
        <CurrencySelect
          class="exchange__text exchange__currency-state"
          :value="omegaCurrencyState"
          @OnChange="omegaCurrencyOnChange"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import CurrencySelect from '@/components/CurrencySelect.vue'
import { currencies, currencyGetUrl as url } from '@/utils/helper.ts'
import { ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/mainStore'

const main = useMainStore()
const alphaCurrency = ref<number>(0)
const omegaCurrency = ref<number>(0)

const alphaCurrencyState = ref<string>(main.selectedCurrency)
const omegaCurrencyState = ref<string>(
  alphaCurrencyState.value === currencies[0] ? currencies[1] : currencies[0],
)

const coefficientAlphaToOmega = ref<number>(1)
const coefficientOmegaToAlpha = ref<number>(1)

interface CurrencyResponse {
  [key: string]: number
}

const currencyOnChange = async (): Promise<void> => {
  try {
    const response = await fetch(url)
    const result: CurrencyResponse = await response.json()

    coefficientAlphaToOmega.value =
      result[`${alphaCurrencyState.value}-${omegaCurrencyState.value}`.toLowerCase()] || 1
    coefficientOmegaToAlpha.value =
      result[`${omegaCurrencyState.value}-${alphaCurrencyState.value}`.toLowerCase()] || 1
  } catch (e: unknown) {
    console.warn(e)
  }
}

const alphaCurrencyOnChange = async (event: Event): Promise<void> => {
  alphaCurrencyState.value = (event.target as HTMLSelectElement).value
  await currencyOnChange()
  alphaCurrencyInput()
}

const omegaCurrencyOnChange = async (event: Event): Promise<void> => {
  omegaCurrencyState.value = (event.target as HTMLSelectElement).value
  await currencyOnChange()
  omegaCurrencyInput()
}

const alphaCurrencyInput = (): void => {
  omegaCurrency.value = Math.round(alphaCurrency.value * coefficientAlphaToOmega.value * 100) / 100
}

const omegaCurrencyInput = (): void => {
  alphaCurrency.value = Math.round(omegaCurrency.value * coefficientOmegaToAlpha.value * 100) / 100
}

onMounted(async (): Promise<void> => {
  await currencyOnChange()
})
</script>

<style lang="scss" scoped>
/* Стили остаются без изменений */
input[type='number']::-webkit-inner-spin-button {
  display: none;
}

.form {
  &__exchange {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

.exchange {
  border: 1px solid var(--vt-c-divider-dark-1);
  display: inline-flex;
  border-radius: 8px;
  background: #fff;
  transition: 0.3s;
  caret-color: var(--money-green);
  &::selection {
    background: var(--money-green);
  }

  &:hover {
    border-color: #000;
  }

  &:not(:last-child) {
    margin-bottom: 12px;
  }
  &__text {
    font-size: 20px;
    border: none;
    background: transparent;
    outline: none;
    padding: 8px 12px;
  }
  &__currency-state {
    padding-left: 16px;
    margin-right: 8px;
    cursor: pointer;
  }
}
.separetor {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 4px;
    bottom: 4px;
    width: 1px;
    background: var(--vt-c-divider-dark-1);
  }
}
</style>
