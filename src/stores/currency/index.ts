import { defineStore } from "pinia";
import type { IAppStore, ICurrencyField, ICurrencyRelations } from "./index.types";
import {CURRENCY_LIST, DEFAULT_CURRENCY, type ICurrencyItem, type IRelationsToCurrentCurrency, type TCurrencyKey} from "@/constants/currency-list"
import formatNumber from "@/utils/formatNumber";

export const useCurrencyStore = defineStore({
  id: "currency",
  state: (): IAppStore => ({
    currencyList: CURRENCY_LIST,
    currentCurrency: DEFAULT_CURRENCY,
    relationsToCurrentCurrency: {},
    relationsLoading: false,
    relationsCurrency: {},
    currencyFieldOne: {
      amount_value: 0,
      error_message: "",
      selectedCurrency: {
        title: "",
        value: "",
      }
    },
    currencyFieldSecond: {
      amount_value: 0,
      error_message: "",
      selectedCurrency: {
        title: "",
        value: "",
      }
    }
  }),
  actions: {
    setRelationsToCurrentCurrency(relationsObject: IRelationsToCurrentCurrency) {
      this.relationsToCurrentCurrency = relationsObject
    },
    setCurrentCurrency(currencyKey: IAppStore["currentCurrency"]) {
      this.currentCurrency = currencyKey;
    },
    setRelationsCurrency(relations: ICurrencyRelations) {
      this.relationsCurrency = relations
    },
    startLoading() {
      this.relationsLoading = true
    },
    stopLoading() {
      this.relationsLoading = false
    },
    setFieldAmountValue(value: string | number, isFirst: boolean) {
      if(isFirst) {
        this.currencyFieldOne.amount_value = value
      }else {
        this.currencyFieldSecond.amount_value = value
      }
    },
    setFieldError(value: string, isFirst: boolean) {
      if(isFirst) {
        this.currencyFieldOne.error_message = value
      }else {
        this.currencyFieldSecond.error_message = value
      }
    },
    setFieldCurrency(item: ICurrencyField["selectedCurrency"], isFirst:boolean) {
      if(isFirst) {
        this.currencyFieldOne.selectedCurrency = item
      }else {
        this.currencyFieldSecond.selectedCurrency = item
      }
    },
    convertCurrency(isFirst: boolean) {
      if(isFirst) {
        const currencyRelation = this.relationsCurrency[`${this.currencyFieldOne.selectedCurrency.value}-${this.currencyFieldSecond.selectedCurrency.value}`]
        this.currencyFieldSecond.amount_value = formatNumber(Number(this.currencyFieldOne.amount_value) * currencyRelation)
      }else {
        const currencyRelation = this.relationsCurrency[`${this.currencyFieldSecond.selectedCurrency.value}-${this.currencyFieldOne.selectedCurrency.value}`]
        this.currencyFieldOne.amount_value = formatNumber(Number(this.currencyFieldSecond.amount_value) * currencyRelation)

      }
    }
  },
  getters: {
    getCurrentCurrency: (state) => state.currencyList.find(item => item.key === state.currentCurrency) as ICurrencyItem,
    getCurencyByKey: (state) => {
      return (currencyKey: TCurrencyKey) => state.currencyList.find((item) => item.key === currencyKey)
    }
  }
});
