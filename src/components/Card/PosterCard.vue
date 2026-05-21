<script setup lang="ts">
import { PhCaretRight } from "@phosphor-icons/vue";
import { getposterIconUrl } from "../../config";

const props = defineProps<{
    pid: number;
    title: string;
}>();

</script>

<template>
    <RouterLink 
        :to="`/p/${props.pid}`"
        class="group flex items-center bg-white border border-gray-100 rounded-xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(251,100,148,0.15)] hover:border-[#ff5e8f]/30 transition-all duration-300"
    >
        <div class="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-none relative border border-gray-100">
            <img 
                :src="getposterIconUrl(props.pid)" 
                :alt="props.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            >
        </div>

        <div class="ml-4 flex-grow overflow-hidden">
            <h3 class="text-sm lg:text-base font-bold text-gray-700 group-hover:text-gray-900 transition-colors truncate">
                {{ props.title }}
            </h3>
        </div>

        <div class="flex-none opacity-0 -translate-x-2 group-hover:text-[#ff5e8f] group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            <PhCaretRight :size="16" />
        </div>
    </RouterLink>
</template>