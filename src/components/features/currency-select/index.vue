<template>
  <AppSelect :triggerTitle="selectedLanguage" :contentList="selectCurrencyList" @selected="selectCurrency"/>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useCurrencyStore } from '@/stores/currency';

import {AppSelect} from '@/components/ui';
import type {AppSelectTypes} from '@/components/ui'
import type { TCurrencyKey } from '@/constants/currency-list';
import { useCurrency } from '@/composables/useCurrency';

const currencyStore = useCurrencyStore();
const {setCurrency} = useCurrency();

const selectCurrencyList = currencyStore.currencyList.map(item => {
  return {
    title: item.value,
    value: item.key,
  }
}) as AppSelectTypes.IAppSelectItem[]

const selectedLanguage = computed<AppSelectTypes.IAppSelectItem>(() => {
  return {
    title: currencyStore.getCurrentCurrency.value as string,
    value: currencyStore.getCurrentCurrency.key as string,
  }
});


function selectCurrency(item:AppSelectTypes.IAppSelectItem) {
  setCurrency(item.value as TCurrencyKey);
}
</script>