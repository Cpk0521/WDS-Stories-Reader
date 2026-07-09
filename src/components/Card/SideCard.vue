<script setup lang="ts">
import { getCardIconUrl } from "../../config";
import type { IEpisodeData } from "../../types";

const { sid, title, episode } = defineProps<{
    sid: number;
    title: string;
    episode : IEpisodeData[]
}>();

</script>

<template>
    <div class="rounded-xl p-4 flex gap-4 border group bg-white border-gray-100 hover:border-pink-200 hover:shadow-hover-light">
        <div class="w-20 h-20 my-auto rounded-lg flex-none overflow-hidden transition-colors bg-gray-50">
                <img 
                    :src="getCardIconUrl(sid)"
                    loading="lazy"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                >
        </div>

        <div class="flex flex-col justify-between flex-grow">
            
            <div class="my-auto">
                <h3 class="font-bold text-base transition-colors text-gray-700 tracking-tight line-clamp-2">
                    {{ title }}
                </h3>
            </div>
            
            <div class="grid grid-cols-2 gap-2 my-2">
                <RouterLink 
                    v-if="episode.length > 0"
                    v-for="ep in episode"
                    :to="`/v/${ep.EpisodeId}`"
                    class="py-1.5 px-3 text-center rounded-lg text-xs font-bold text-gray-700 transition-all border flex items-center justify-center gap-1 shadow-sm bg-gray-50 hover:bg-[#ff5e8f]/10 hover:text-gray-900 border-gray-100 hover:border-[#ff5e8f]/20"
                >
                    <span>{{ ep.Order === 1 ? '前編' : '後編'}}</span>
                </RouterLink>
                <p v-else class="text-sm text-gray-400 italic py-1.5">更新待ち</p>
            </div>
        </div>
    </div>
</template>