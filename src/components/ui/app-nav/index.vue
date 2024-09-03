<template>
  <nav class="flex gap-[20px]">
    <router-link v-for="(link, idx) in navLinks" :key="idx"
      class="transition ease-in-out transition-all duration-300"
      :to="{name: link.value}"
    >{{ link.title }}</router-link>
  </nav>
</template>

<script lang="ts" setup>
import type {ILinkItem} from "./index.types"
const navLinks:ILinkItem[] = [
  {
    title: "Главная",
    value: "home",
  },
  {
    title: "Конвертация",
    value: "convert",
  },
]
</script>

<script lang="ts" setup></script>