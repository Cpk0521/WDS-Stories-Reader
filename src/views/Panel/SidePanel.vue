<script setup lang="ts">
import { computed, ref } from 'vue';
import { PhCaretDown } from "@phosphor-icons/vue";
import { useMasterlistStore } from '../../store/masterlist';
import PanelTitle from "../../components/PanelTitle.vue";
import SideCard from '../../components/Card/SideCard.vue';
import { CompanyMaster } from '../../utils/constants';

const masterlistStore = useMasterlistStore();
const data = computed(() => masterlistStore.side || null);
const expandedChars = ref<{[key:string]:boolean}>({});


const isExpanded = (id : number) => {
    return !!expandedChars.value[id.toString()];
};

const toggleStories = (id:number) => {
    expandedChars.value[id.toString()] = !expandedChars.value[id.toString()];
};

</script>

<template>
    <PanelTitle :Title="'サイドストーリー'"/>
    <div 
        v-for="side in data"
        class="flex flex-col gap-4 scroll-mt-28"
    >   
        <div @click="toggleStories(side.Id)" class="bg-white rounded-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03),0_2px_8px_-1px_rgba(0,0,0,0.02)] flex items-stretch overflow-hidden relative min-h-[76px] group cursor-pointer">
            <div class="bg-[#ff5e8f] w-3 flex-none"></div>

            <div class="flex flex-grow items-center justify-between px-6 py-4">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-full border border-gray-200/80 bg-slate-50 flex items-center justify-center text-xs font-black text-gray-400 overflow-hidden flex-none">
                        <img :src="`./assets/characterbases/${side.Id}.png`">
                    </div>
                    <div class="relative">
                        <div class="flex flex-col items-baseline gap-1 relative z-10">
                             <span class="py-1 px-4 text-[8px] font-bold bg-pink-50 text-gray-800 rounded-full border border-pink-100 uppercase tracking-widest">
                                {{ CompanyMaster[side.CompanyMasterId] }}
                            </span>
                            <h2 class="text-xl font-black text-gray-800 tracking-wide">
                                {{ side.Name }}
                            </h2>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <PhCaretDown
                        class="text-xl text-gray-400 group-hover:text-[#ff5e8f] transform transition-transform duration-300"
                        :class="isExpanded(side.Id) ? 'rotate-180' : 'rotate-0'"
                    />
                </div>
            </div>
        </div>
        <transition name="slide-fade">
            <div v-if="isExpanded(side.Id)" class="mb-4 px-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SideCard 
                v-for="card in side.Groups"
                :key="card.Id"
                :sid="card.Id"
                :title="card.Title"
                :episode="card.Episode"
            />
        </div>
        </transition>
        
    </div>
</template>