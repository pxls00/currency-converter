<template>
  <div class="relative inline-block text-left">
  <div class="h-full">
    <slot v-if="props.isCustomTriggerSlot" name="trigger-slot" @click="triggerSelect" />
    <button v-else @click="triggerSelect" type="button" class="h-full inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-xxs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
      {{ props.triggerTitle?.title ?? "" }}
      <CollapseArrow class="-mr-1 h-5 w-5 text-gray-400"/>
    </button>
  </div>
  <Transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
    <div 
      v-if="isSelectActive" 
      :class="[
        'absolute z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
        getSelectPositionClass
      ]" 
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <slot v-if="props.isCustomTriggerSlot" />
      <div v-else class="py-1">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <button 
          v-for="(item, idx) in props.contentList"
          :key="idx"
          type="button"
          :class="[
            'block px-4 py-2 text-[14px] text-gray-700',
            {'bg-gray-100 text-gray-900': item.value == props.triggerTitle?.value}
          ]"
          role="menuitem" 
          tabindex="-1"
          @click="selectedOption(item)"
        >{{ item.title }}</button>
      </div>
    </div>
  </Transition>
</div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import CollapseArrow from "@/assets/svg/collapse-arrow.svg?component"
import type {IAppSelectItem, TAppSelectPostion} from "./index.types";

interface IAppSelectProps {
  isCustomTriggerSlot?: boolean
  triggerTitle?: IAppSelectItem,
  isCustomContentSlot?: boolean,
  contentList?: IAppSelectItem[],
  position?: TAppSelectPostion
}

interface IAppSelectemits {
  (e: 'selected', item: IAppSelectItem): void
}

const props = withDefaults(defineProps<IAppSelectProps>(), {
  isCustomTriggerSlot: false,
  isCustomContentSlot: false,
  position: "bottom-right",
})

const emits = defineEmits<IAppSelectemits>()

const isSelectActive = ref<boolean>(false);
const getSelectPositionClass = computed(() => {
  let postitionClass = "";
  switch(props.position) {
    case "bottom-right":
      postitionClass = "right-0 transform translate-y-[8px]"
      break;
    case "bottom-left": 
      postitionClass = "left-0 transform translate-y-[8px]"
      break;
    case "top-right": 
      postitionClass = "right-0 bottom-[100%] transform translate-y-[-8px]"
      break;
    case "top-left": 
      postitionClass = "left-0 bottom-[100%] transform translate-y-[-8px]"
      break;
    case "right":
      postitionClass = "left-[100%] top-[50%] transform translate-x-[8px] translate-y-[-50%]"
    case "left":
      postitionClass = "right-[100%] top-[50%] transform translate-x-[-8px] translate-y-[-50%]"
  }
  return postitionClass 
})

function triggerSelect() {
  isSelectActive.value = !isSelectActive.value
}

function selectedOption(item: IAppSelectItem) {
  emits("selected", item)
  triggerSelect();
}
</script>