<template>
  <div class="wrapper">
    <div class="wrapper__content min-h-screen min-w-screen bg-white flex flex-col relative">
      <Header />
      <div class="wrapper__inner flex-grow w-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import {Header} from '@/components/widgets';
import { useCurrency } from '@/composables/useCurrency';

export default defineComponent({
  name: "MainLayout",
  components: {
    Header
  },
  setup() {
    const {getRelationsCurrency} = useCurrency()
    const intervalId = ref<number | undefined | NodeJS.Timeout>(undefined);
    const updateCurrencyRelationsTimeMs = 1000 * 20

    onMounted(async () => {
      await getRelationsCurrency();
      intervalId.value = setInterval(async () => {
        await getRelationsCurrency();
      }, updateCurrencyRelationsTimeMs)
    })
    
    onUnmounted(() => {
      clearInterval(intervalId.value)
    })
  }
})
</script>