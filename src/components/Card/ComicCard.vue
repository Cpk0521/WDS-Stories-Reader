<script setup lang="ts">
import { PhCaretRight } from "@phosphor-icons/vue";

const { cid, title } = defineProps<{
    cid: number;
    title: string;
}>();

</script>

<template>
    <RouterLink 
        :to="`/c/${cid}`"
        class="group flex items-center bg-white border border-gray-100 rounded-xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(251,100,148,0.15)] hover:border-[#ff5e8f]/30 transition-all duration-300"
    >
        <div class="flex-none w-12 h-12 bg-gray-50 border border-gray-100 group-hover:bg-pink-50 rounded-lg flex flex-col items-center justify-center transition-colors">
            <span class="text-[9px] font-bold text-gray-400 group-hover:text-[#ff5e8f] uppercase">EP</span>
            <span class="text-lg font-black text-gray-700 group-hover:text-[#ff5e8f] leading-none">{{ cid }}</span>
        </div>

        <div class="ml-4 flex-grow overflow-hidden">
            <h3 class="text-sm lg:text-base font-bold text-gray-700 group-hover:text-gray-900 transition-colors truncate">
                {{ title.split('話　')[1] ?? '...' }}
            </h3>
        </div>

        <div class="flex-none opacity-0 -translate-x-2 group-hover:text-[#ff5e8f] group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            <PhCaretRight :size="16" />
        </div>
    </RouterLink>
</template> 