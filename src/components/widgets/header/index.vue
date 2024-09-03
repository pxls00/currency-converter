<template>
  <header class="bg-gray-100">
    <div class="container">
      <div class="header__inner w-full flex items-center py-[20px] justify-between">
        <AppNav />
        
        <CurrencySelect />
      </div>

    </div>
  </header>
</template>

<script lang="ts">
import { AppNav } from "@/components/ui"
import { CurrencySelect } from "@/components/features/index";
import { defineComponent } from 'vue';

export default defineComponent({
  name: "HeaderWidget",
  components: {
    CurrencySelect,
    AppNav,
  },
  setup() {
  }
})
</script>

<style src="./index.scss"></style>