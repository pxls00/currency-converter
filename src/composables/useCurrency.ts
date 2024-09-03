import type { ICurrencyItem, TCurrencyKey } from '@/constants/currency-list'
import { getRelationAdapter } from '@/infrastructure/getRelationAdapter';
import { getRelationData } from '@/infrastructure/getRelations';
import { useCurrencyStore } from '@/stores/currency';
import type { ICurrencyRelations } from '@/stores/currency/index.types';
import { storeToRefs } from 'pinia';

// by convention, composable function names start with "use"
export function useCurrency() {
  const currencyStore = useCurrencyStore();

  function setCurrency(key=currencyStore.currentCurrency) {
    try {
      currencyStore.startLoading();
      currencyStore.setCurrentCurrency(key);
    
      const relationsObject = getRelationAdapter(key, currencyStore.relationsCurrency);
      currencyStore.setRelationsToCurrentCurrency(relationsObject);
    
    } catch (error) {
      console.log(error);
    }finally {
      currencyStore.stopLoading();
    }
  }

  async function getRelationsCurrency() {
    try {
      currencyStore.startLoading();

      const relationsCurrency = await getRelationData();
      currencyStore.setRelationsCurrency(relationsCurrency as ICurrencyRelations)
      
      setCurrency();
    } catch (error) {
      
    } finally {
      currencyStore.stopLoading();
    }
    
  }

  return {
    getRelationsCurrency,
    setCurrency,
  }
}