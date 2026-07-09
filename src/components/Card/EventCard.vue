<script setup lang="ts">
import { geteventLogoUrl } from "../../config";
import type { IEpisodeData } from "../../types";
import EpisodeCard from "./EpisodeCard.vue";

const { eid, title, date, episode, hiddenImg } = defineProps<{
    eid: number;
    title: string;
    date? : string;
    episode : IEpisodeData[]
    hiddenImg?: boolean;
}>();

</script>

<template>
    <div class="group bg-white rounded-3xl border border-gray-100 transition-all duration-500 p-4 flex flex-col items-center">
        <div class="aspect-[15/11] w-64 bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100 mx-auto"
            v-if="!hiddenImg">
            <img 
                :src="geteventLogoUrl(eid)" 
                :alt="title"
                loading="lazy"
                class="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                onerror="this.classList.add('hidden')"
            >
            <!-- 標籤 -->
            <div class="absolute top-2 left-2 z-10">
                <span class="px-3 py-1 bg-gray-900/80 backdrop-blur-md rounded-full text-[10px] font-black text-white shadow-sm">
                    {{ date }}
                </span>
            </div>
        </div>
        
        <p class="text-lg md:text-2lg font-black text-gray-800 m-2 leading-tight transition-colors">
            {{ title }}
        </p>

        <div class="w-full border-t border-gray-100"></div>

        <div class="w-full mt-2 grid grid-cols-1 gap-1.5 justify-between">
            <EpisodeCard 
                v-if="episode.length > 0"
                v-for="ep in episode" 
                :key="ep.EpisodeId" 
                :Id="ep.EpisodeId"
                :Title="ep.Title"
                :Order="ep.Order"
            />
            <p v-else class="text-sm text-gray-500 italic text-center py-4">更新待ち</p>
        </div>
    </div>
</template> 