<script setup lang="ts">
import { PhFunnel, PhCaretDown } from "@phosphor-icons/vue";
const isFilterPanelOpen = defineModel<boolean>({
    type: Boolean,
    default: false
});

</script>

<template>
    <button 
        @click="isFilterPanelOpen = !isFilterPanelOpen"
        class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border font-bold text-xs transition-all self-center sm:self-end shadow-sm"
        :class="isFilterPanelOpen ? 'bg-[#ff5e8f] border-[#ff5e8f] text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-[#ff5e8f] hover:text-[#ff5e8f]'"
    >
        <PhFunnel class="text-lg" />
        <span>フィルタ</span>
        <PhCaretDown 
            :size="12" 
            class="transform transition-transform duration-300"
            :class="isFilterPanelOpen ? 'rotate-180' : 'rotate-0'"
        />
    </button>
</template>