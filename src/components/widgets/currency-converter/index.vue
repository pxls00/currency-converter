<template>
  <div class="max-w-[600px] relative w-full bg-gray bg-gray-100 rounded-[14px] px-[24px] py-[12px] flex flex-col">
    <CurrencyBlock :isFirst="true" :formattedCurrencyList="formattedCurrencyList"/>
    <CurrencyBlock :isFirst="false" :formattedCurrencyList="formattedCurrencyList"/>
    <!-- <div v-if="currencyStore.relationsLoading" class="loading absolute inset-0 w-full bg-loading-bg h-full flex justify-center items-center">
      <InfiniteSpinnerLoding class="w-[100px] text-black"/>
    </div> --> 
  </div>
</template>

<script lang="ts" setup>
// import InfiniteSpinnerLoding from "@/assets/svg/infinite-spinner-loading.svg?component"
import { CurrencyBlock } from '@/components/features';
import type { IAppSelectItem } from '@/components/ui/app-select/index.types';
import { useCurrencyStore } from '@/stores/currency';
import { onMounted } from 'vue';

const currencyStore = useCurrencyStore()

const formattedCurrencyList = currencyStore.currencyList.map(item => {
  return {
    title: item.value,
    value: item.key,
  }
}) as IAppSelectItem[]

function setCurrencyKeys() {
  currencyStore.setFieldCurrency({
    title: currencyStore.getCurrentCurrency.value,
    value: currencyStore.getCurrentCurrency.key,
  }, true);
 
  currencyStore.setFieldCurrency({
    title: currencyStore.getCurencyByKey("usd")?.value as string,
    value: currencyStore.getCurencyByKey("usd")?.key as string
  }, false);
}

onMounted(() => {
  setCurrencyKeys()
})
</script>