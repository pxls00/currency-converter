import axios from "axios";

import type { ICurrencyRelations } from "@/stores/currency/index.types";

export async function getRelationData() {
  try {
    const relationsList: {data: ICurrencyRelations} = await axios.get("https://status.neuralgeneration.com/api/currency")

    return relationsList.data
  } catch (error) {
    console.log(error);    
  }
}