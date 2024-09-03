<template>
<div class="max-w-[400px] w-full bg-gray overflow-hidden bg-gray-100 rounded-[14px] px-[24px] py-[12px] flex flex-col gap-[20px] min-h-[140px] relative">
  <div class="w-full flex gap-[10px]">
    <span class="text-black text-[14px] flex w-2/4">Валюта:</span>
    <span class="text-black text-[14px] flex w-2/4">Конвертация:</span>
  </div>
  <div class="w-full flex flex-col">
    <div v-for="(value, name, idx) in currencyStore.relationsToCurrentCurrency" 
      :class="[
        'w-100 flex gap-[10px] py-[6px]',
        {'border-b-2 border-gray-200': idx < Object.keys(currencyStore.relationsToCurrentCurrency).length - 1}
      ]"
    >
      <span class="text-black font-bold flex w-2/4">{{ currencyStore.getCurencyByKey(name)?.value || "" }}</span>
      <span class="text-black font-bold flex w-2/4">{{ value }}</span>
    </div>
  </div>
  <div v-if="currencyStore.relationsLoading" class="loading absolute inset-0 w-full bg-loading-bg h-full flex justify-center items-center">
    <InfiniteSpinnerLoding class="w-[100px] text-black"/>
  </div>
</div>
</template>

<script lang="ts" setup>
import InfiniteSpinnerLoding from "@/assets/svg/infinite-spinner-loading.svg?component"
import { useCurrencyStore } from "@/stores/currency";

const currencyStore = useCurrencyStore();
</script>