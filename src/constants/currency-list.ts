export const CURRENCY_LIST = [
  { value: "RUB", key: "rub" },
  { value: "USD", key: "usd" },
  { value: "EUR", key: "eur" },

] as const;

export const DEFAULT_CURRENCY = CURRENCY_LIST[0].key

export type TCurrencyValue = typeof CURRENCY_LIST[number]["value"];
export type TCurrencyKey = typeof CURRENCY_LIST[number]["key"];

export interface ICurrencyItem {
  value: TCurrencyValue;
  key: TCurrencyKey;
}

export type IRelationsToCurrentCurrency = {
  [key in TCurrencyKey]: number;
}
