import type { IAppSelectItem } from "@/components/ui/app-select/index.types";
import type {TCurrencyKey, ICurrencyItem, IRelationsToCurrentCurrency} from "@/constants/currency-list"

export interface ICurrencyRelations {
  [key: string]: number;
}

export interface ICurrencyField {
  amount_value: number | string,
  error_message: string
  selectedCurrency: IAppSelectItem
}

export interface IAppStore {
  currentCurrency: TCurrencyKey,
  currencyList: Readonly<ICurrencyItem[]>,
  relationsToCurrentCurrency: IRelationsToCurrentCurrency | {},
  relationsLoading: boolean,
  relationsCurrency: ICurrencyRelations,
  currencyFieldOne: ICurrencyField,
  currencyFieldSecond: ICurrencyField,
}