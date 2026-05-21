<script setup lang="ts">
import { PhCaretRight } from "@phosphor-icons/vue";

const { Id, Title, Order } = defineProps<{
    Id : number
    Title? : string;
    Order : number
}>();

</script>

<template>
    <RouterLink 
        :to="`/v/${Id}`"
        class="group/item flex items-center bg-gray-50 hover:bg-white border border-transparent hover:border-pink-200 px-2.5 py-1.5 rounded-xl transition-all duration-300 shadow-episode"
    >
        <div class="ml-2.5 flex-grow overflow-hidden pr-1">
            <p class="text-[9px] font-bold text-gray-400 group-hover/item:text-[#00a6f4] transition-colors uppercase tracking-wider mb-0.5">EPISODE {{ Order.toString().padStart(2, '0') }}</p>
            <h4 class="text-xs font-bold text-gray-700 group-hover/item:text-gray-900 transition-colors truncate">
                {{ !Title || Title === '' ? Id : Title }}
            </h4>
        </div>
        <PhCaretRight :size="12" class="text-[#ff5e8f] flex-none opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
    </RouterLink>
</template>