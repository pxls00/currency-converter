import type { ICurrencyItem, IRelationsToCurrentCurrency, TCurrencyKey } from "@/constants/currency-list";
import type { ICurrencyRelations } from "@/stores/currency/index.types";
import { CURRENCY_LIST } from "@/constants/currency-list";
import formatNumber from "@/utils/formatNumber";


export function getRelationAdapter(relatedCurrency: TCurrencyKey, currencyRelations: ICurrencyRelations) {
  try {
    const relationsToCurrency = {} as IRelationsToCurrentCurrency;

    CURRENCY_LIST.forEach((item) => {
      if(item.key !== relatedCurrency) {
        relationsToCurrency[item.key] = formatNumber(currencyRelations[`${item.key}-${relatedCurrency}`])
      }
    })

    return JSON.parse(JSON.stringify(relationsToCurrency))
  } catch (error) {
    console.log(error);    
  }
}