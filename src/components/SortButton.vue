<script setup lang="ts">
import { PhSortAscending, PhSortDescending  } from "@phosphor-icons/vue";

const sortOrder = defineModel<string>({
    type: String,
    default: 'asc'
});

</script>
<template>
    <div class="flex flex-wrap items-center justify-center gap-4">
        <div class="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
            <button 
                @click="sortOrder = 'asc'"
                class="px-4 py-1.5 text-xl font-bold rounded-md transition-all"
                :class="sortOrder === 'asc' ? 'bg-[#ff5e8f] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'"
            >
            <PhSortAscending/>
            </button>
            
            <button 
                @click="sortOrder = 'desc'"
                class="px-4 py-1.5 text-xl font-bold rounded-md transition-all"
                :class="sortOrder === 'desc' ? 'bg-[#ff5e8f] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'"
            >
            <PhSortDescending/>
            </button>
        </div>
    </div>
</template>