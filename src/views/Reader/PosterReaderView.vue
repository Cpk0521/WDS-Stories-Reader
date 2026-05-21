<script setup lang="ts">
import { ref, onMounted, computed, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePosterData } from '../../composables/usePosterData'
import type { IPosterUnit } from '../../types/episode'
import { PosterType } from '../../utils/constants'
import Dialogue from '../../components/Dialogue.vue'

const route = useRoute()
const router = useRouter()
const { episodeData, error, fetchPosterData } = usePosterData()

const activeId = ref('0');
const episodeId = ref<number>(Number(route.params.id) || 0)
const displayContent = computed<IPosterUnit[]>(()=>{
    if(!episodeData.value) return []
    return episodeData.value.EpisodeDetail.filter((unit)=>unit.EpisodeType.toString() === activeId.value)
})
const buttonlist = computed<string[]>(() => {
    if (!episodeData.value?.EpisodeDetail) return []
    const types = episodeData.value.EpisodeDetail.map(unit => unit.EpisodeType.toString())
    return [...new Set(types)]
})


watch(
    () => episodeData.value?.Title,
    (newTitle) => {
        document.title = `${newTitle || '？？？'} | World Dai Star: Yume no Stellarium`
    },
    { immediate: true }
)

onMounted(() => {
    fetchPosterData(episodeId.value)
})

watch(() => error.value, (hasError) => {
    if (hasError) {
        router.replace({ name: 'NotFound' })
    }
})

</script>

<template>
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-gray-200/60 overflow-hidden border border-gray-100">
        <nav class="w-full bg-gray-50/80 p-4 border-b border-gray-100">
            <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <button 
                    v-for="(name, id) in PosterType" 
                    :key="id"
                    :disabled="!buttonlist.includes(id.toString())"
                    @click="activeId = id.toString()"
                    class="px-5 py-2 rounded-full text-sm font-bold transition-all border shadow-sm disabled:opacity-30"
                    :class="activeId === id.toString()
                        ? 'bg-pink-100 border-pink-200 text-[#ff5e8f]' 
                        : 'bg-white border-transparent text-gray-500 hover:bg-gray-100'"
                >
                    {{ name }}
                </button>
            </div>
        </nav>
    </div>

    <div 
        class="w-full bg-white rounded-2xl border border-gray-200/80 p-3 md:p-6 shadow-sm flex flex-col items-center"
    >
        <div class="w-full border-b border-gray-200 pb-6 flex flex-col items-center gap-6">
            <div class="text-center">
                <h1 class="text-xl md:text-2xl font-black text-gray-900 tracking-wide">{{ episodeData?.Title }}</h1>
            </div>
        </div>

        <div v-if="activeId === '5'" class="w-full md:p-4 space-y-2 md:space-y-4">
            <Dialogue 
                v-for="dialogue in displayContent"
                :key="dialogue.Id"
                :unit="(dialogue as any)"
                :isVoice="false"
            />
        </div>
        <div v-else class="w-full p-4 md:p-5 text-base md:text-lg text-left tracking-normal leading-1 whitespace-pre-line">
            {{ displayContent?.[0]?.Description?.replace(/\/n/g, '\n') || '' }}
        </div>
    </div>
</template>