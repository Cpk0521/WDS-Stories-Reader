<script setup lang="ts">
import { computed, type PropType} from 'vue';
import { PhX } from "@phosphor-icons/vue";
const props = defineProps({
    items: {
        type: [Array, Object] as PropType<string[] | Record<string, string>>,
        default: () => {}
    }
});

const normalizedItems = computed(() => {
    if (props.items && typeof props.items === 'object' && !Array.isArray(props.items)) {
        return props.items
    }

    if (Array.isArray(props.items)){
        return props.items.reduce((acc, curr) => {
            acc[curr] = curr
            return acc
        }, {} as Record<string, string>)
    }
    return {};
});

const isFilterPanelOpen = defineModel<boolean>('isFilterPanelOpen', {
    type: Boolean,
    default: false
});

const selectedItem = defineModel<string>('selectedItem', {
    type: String,
    default: 'All'
});

const onSelectItem = (item: string) => {
    selectedItem.value = item;
};

</script>

<template>
    <transition name="slide-fade">
        <div 
            v-show="isFilterPanelOpen"
            class="mb-2 bg-white rounded-3xl p-6 shadow-filter border border-gray-100 flex flex-col gap-2"
        >
            <div class="flex items-center justify-end border-b border-gray-50 relative">
                <button @click="isFilterPanelOpen = false" class="text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-100 p-2 absolute right-0 top-1/2">
                    <PhX class="text-lg" />
                </button>
            </div>
            
            <div>
                <div class="flex items-center gap-2 mb-3">
                    <div class="w-1 h-4 bg-[#00a6f4] rounded-full"></div>
                    <h2 class="font-bold text-sm text-gray-500 uppercase tracking-wider">フィルタ</h2>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button 
                        @click="onSelectItem('All')"
                        class="px-4 py-1.5 rounded-full text-xs font-bold transition-all border"
                        :class="selectedItem === 'All' ? 'bg-gray-800 text-white border-gray-800 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'"
                    >
                        全部
                    </button>
                    <button 
                        v-for="(i, k) in normalizedItems" 
                        :key="k"
                        @click="onSelectItem(k)"
                        class="px-4 py-1.5 rounded-full text-xs font-bold transition-all border"
                        :class="selectedItem === k ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'"
                    >
                        {{ i }}
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

