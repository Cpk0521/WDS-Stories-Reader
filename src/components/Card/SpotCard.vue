<script setup lang="ts">
import { PhCaretRight } from "@phosphor-icons/vue";
import { spotTypes } from "../../types/spotTypes";

const props = defineProps<{
    sid: number;
    title: string;
    spot: string;
    members : number[];
}>();

</script>

<template>
    <RouterLink 
        :to="`/v/${props.sid}`"
        class="group flex items-center bg-white border border-gray-100 rounded-xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(251,100,148,0.15)] hover:border-[#ff5e8f]/30 transition-all duration-300"
    >
        <div class="w-1/3 flex flex-col justify-between border-r border-gray-100 pr-3">
            <span 
                class="text-center px-3 py-1 rounded-full text-xs font-bold shadow-sm bg-indigo-50 text-indigo-600 border-indigo-200"
            >
                {{ spotTypes[props.spot as keyof typeof spotTypes] || '???' }}
            </span>

            <div class="flex flex-wrap gap-1 mt-2">
                <div 
                    v-for="mid in props.members" 
                    :key="mid"
                    class="h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 overflow-hidden relative"
                >
                    <img :src="`./assets/characterlog/${mid}.png`" class="w-full h-full object-cover">
                </div>
            </div>
        </div>

        <div class="ml-2 flex-grow overflow-hidden">
            <h3 class="text-sm lg:text-base font-bold text-gray-700 group-hover:text-gray-900 transition-colors truncate">
                {{ props.title }}
            </h3>
        </div>

        <div class="flex-none opacity-0 -translate-x-2 group-hover:text-[#ff5e8f] group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            <PhCaretRight :size="16" />
        </div>
    </RouterLink>
</template> 