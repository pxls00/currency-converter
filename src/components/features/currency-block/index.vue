<template>
  <AppField :title="getCurrencyField.selectedCurrency.title" :error-message="getCurrencyField.error_message">
    <div class="flex items-stretch gap-[10px]">
      <input
        class="py-[10px] px-[8px] w-full bg-white border border-black rounded-lg outline:none focus:outline-none text-grey-700 placeholder:text-grey-400"
        :value="getCurrencyField.amount_value"
        @input="updateFormFields"
        type="text"
        placeholder="Сумма конвертации" 
      />
    <AppSelect 
      :triggerTitle="getCurrencyField.selectedCurrency" 
      :content-list="getCurrencyListForFirst" 
      @selected="changeCurrencyField"/>
    </div>
  </AppField>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useCurrencyStore } from '@/stores/currency';
import { AppField, AppSelect } from "@/components/ui";
import type { IAppSelectItem } from "@/components/ui/app-select/index.types";


interface ICurrencyBlockProps {
  isFirst: boolean,
  formattedCurrencyList: IAppSelectItem[]
}


const currencyStore = useCurrencyStore();
const props = defineProps<ICurrencyBlockProps>();


const getCurrencyListForFirst = computed(() => {
  return props.formattedCurrencyList.filter(item => item.value !== getCurrencyReversedField.value.selectedCurrency.value)
})


const getCurrencyField = computed(() => {
  if(props.isFirst) {
    return currencyStore.currencyFieldOne
  }else {
    return currencyStore.currencyFieldSecond
  }
})

const getCurrencyReversedField = computed(() => {
  if(props.isFirst) {
    return currencyStore.currencyFieldSecond
  }else {
    return currencyStore.currencyFieldOne
  }
})

function changeCurrencyField(item: IAppSelectItem) {
  currencyStore.setFieldCurrency(item, props.isFirst)
  currencyStore.convertCurrency(props.isFirst)
}

function updateFormFields(event:Event) {
  const el = event.target as HTMLInputElement
  currencyStore.setFieldAmountValue(el.value, props.isFirst);

  // validation
  if(!!el.value && !isNaN(Number(el.value))) {
    if(!!el.value.includes(".") && !!(el.value.split(".")[1].length > 2)) {
      setInvalidFormatError()
    }else {
      clearInvalidFormatError()
      currencyStore.convertCurrency(props.isFirst)
    }
  }else {
    setInvalidFormatError()
  }
}

function setInvalidFormatError() {
  currencyStore.setFieldError('Неверный формат', props.isFirst);
}

function clearInvalidFormatError() {
  currencyStore.setFieldError('', props.isFirst);
}

</script>