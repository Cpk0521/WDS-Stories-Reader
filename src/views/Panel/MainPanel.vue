<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { PhCaretDown } from "@phosphor-icons/vue";
import { useMasterlistStore } from '../../store/masterlist';
import EventCard from '../../components/Card/EventCard.vue';
import PanelTitle from "../../components/PanelTitle.vue";
import type { IMainStoryData } from '../../types';
import { CompanyMaster } from '../../utils/constants';

const masterlistStore = useMasterlistStore();
// const fullMainData = computed(() => masterlistStore.main || null);
const data = computed(()=>{
    let newlist : { CompanyId : number , Groups : IMainStoryData[]}[] = []
    masterlistStore.main.forEach((v)=>{
        let found = newlist.find((x)=> x.CompanyId === v.CompanyId)
        if(!found){
            newlist.push({
                CompanyId : v.CompanyId,
                Groups : [v]
            })
        }
        else{
            found.Groups.push(v);
        }
    })

    return newlist
})

const expandedUnit = ref<{[key:string]:boolean}>({});

const isExpanded = (id : number) => {
    return !!expandedUnit.value[id.toString()];
};

const toggleUnitExpand = (id:number) => {
    expandedUnit.value[id.toString()] = !expandedUnit.value[id.toString()];
};

onMounted(()=>{
    document.title = `Stories Archive Reader | World Dai Star: Yume no Stellarium`
})

</script>

<template>
    <PanelTitle :Title="'メインストーリー'" />
    <div 
        v-for="gp in data"
        @click="toggleUnitExpand(gp.CompanyId)"
        class="flex flex-col gap-4 scroll-mt-28"
    >
        <div class="bg-white rounded-xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03),0_2px_8px_-1px_rgba(0,0,0,0.02)] flex items-stretch overflow-hidden relative min-h-[76px] group">
            <div class="bg-[#ff5e8f] w-3 flex-none"></div>

            <div class="flex flex-grow items-center justify-between px-6 py-4">
                <div class="flex items-center gap-4">
                    <div class="aspect-[127/33] w-64 rounded-2xl border border-gray-200/80 bg-slate-50 flex items-center justify-center text-xs font-black text-gray-400 overflow-hidden flex-none">
                        <img 
                            :src="`./assets/logo/logo_${gp.CompanyId}.png`"
                            class="w-auto h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    </div>

                    <div class="relative">
                        <div class="flex flex-col items-baseline gap-1 relative z-10">
                            <h2 class="text-xl font-black text-gray-800 tracking-wide">
                                {{ CompanyMaster[gp.CompanyId] }}
                            </h2>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <PhCaretDown
                        class="text-xl text-gray-400 group-hover:text-[#ff5e8f] transform transition-transform duration-300"
                        :class="isExpanded(gp.CompanyId) ? 'rotate-180' : 'rotate-0'"
                    />
                </div>
            </div>
        </div>
        <transition name="slide-fade">
            <div v-if="isExpanded(gp.CompanyId)" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <EventCard 
                    v-for="event in gp.Groups" 
                    :key="event.Id" 
                    :eid="event.Id" 
                    :title="`第 ${event.ChapterOrder} 章`"
                    :episode="event.Episode"
                    :hiddenImg="true"
                />
            </div>
        </transition>
    </div>
</template>


