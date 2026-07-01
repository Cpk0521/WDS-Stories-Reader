<script setup lang="ts">
import { ref, onMounted, computed, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PhX, PhPlay, PhArrowSquareOut } from "@phosphor-icons/vue";
import { useEpisodeData } from '../../composables/useEpisodeData'
import type { IEpisodeModel } from '../../types/episode'
import Dialogue from '../../components/Dialogue.vue'
import { usePackVoicePlayer } from '../../composables/usePackVoicePlayer';

const route = useRoute()
const router = useRouter()
const { episodeData, error, fetchEpisodeData} = useEpisodeData()
const { fetchVoicePack, indexTable, playVoice} = usePackVoicePlayer()

const episodeId = ref<number>(Number(route.params.id) || 0)
const isVideoOpen = ref(false);

const epdata = computed<IEpisodeModel | null>(() => episodeData.value)

const init = (id: number) => {
    isVideoOpen.value = false
    episodeData.value = null 
    fetchEpisodeData(id)
    fetchVoicePack(id)
}

onMounted(() => {
    init(episodeId.value)
})

watch(
    () => episodeData.value,
    (newData) => {
        if (newData && newData.StoryType === 5) {
            router.replace(`/p/${episodeId.value}`)
        }
    },
    { deep: true }
)

watch(
    () => episodeData.value?.Title,
    (newTitle) => {
        document.title = `${newTitle || '？？？'} | World Dai Star: Yume no Stellarium`
    },
    { immediate: true }
)

watch(
    () => route.params.id, 
    (newId) => {
        episodeId.value = Number(newId) || 0
        init(episodeId.value)
    }
)

watch(() => error.value, (hasError) => {
    if (hasError) {
        router.replace({ name: 'NotFound' })
    }
})

const toggleVideo = () => {
    isVideoOpen.value = !isVideoOpen.value;
};

</script>

<template>
    <div class="w-full bg-white rounded-2xl border border-gray-200/80 p-3 md:p-6 shadow-sm flex flex-col items-center">
        
        <div class="w-full border-b border-gray-200 pb-6 flex flex-col items-center gap-6">
            <!-- 故事標題 -->
            <div class="text-center">
                <h1 class="text-xl md:text-2xl font-black text-gray-900 tracking-wide">{{ epdata?.Chapter }}</h1>
                <p class="text-sm md:text-base font-bold text-gray-500 mt-2">{{ epdata?.Title }}</p>
            </div>

            <div class="z-10 flex-row flex items-center gap-4">
                <button 
                    @click="toggleVideo" 
                    class="w-14 h-10 rounded-xl bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white flex items-center justify-center shadow hover:shadow-lg"
                >
                    <PhPlay v-if="!isVideoOpen" :size="22" class="text-white"/>
                    <PhX v-else :size="22" class="text-white"/>
                </button>
                <a 
                    v-if="isVideoOpen"
                    @click="toggleVideo" 
                    :href="`https://cpk0521.github.io/WDS_Adv_Player/?id=${episodeId}`"
                    target="_blank"
                    class="w-14 h-10 rounded-xl bg-green-400 hover:bg-green-300 active:scale-95 transition-all text-white flex items-center justify-center shadow hover:shadow-lg"
                >
                    <PhArrowSquareOut :size="22" class="text-white"/>
                </a>
            </div>

            <transition name="slide-fade">
                <div v-if="isVideoOpen" class="w-full overflow-hidden mb-4">
                    <div class="aspect-[16/9] w-full ">
                        <iframe 
                            class="w-full h-full bg-gray-100"
                            :src="`https://cpk0521.github.io/WDS_Adv_Player/?id=${episodeId}`" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </transition>
        </div>

        <div class="w-full md:p-4 space-y-2 md:space-y-4">
            <Dialogue 
                v-for="dialogue in (episodeData?.EpisodeDetail)?.filter((ep) => ep.Phrase !== '')"
                :key="dialogue.Id"
                :unit="(dialogue as any)"
                :isVoice="Object.keys(indexTable).includes(dialogue.VoiceFileName!) ?? false"
                :voiceClick="playVoice"
            />
        </div>

        <div class="mt-8 pt-6 md:px-2 border-t border-gray-200 flex flex-cols-2 justify-between w-full text-base text-gray-500 font-bold">
            <RouterLink 
                v-if="!!episodeData?.Prev"
                :to="`/v/${episodeData?.Prev}`"
                class="hover:text-[#ff5e8f] transition-colors pl-6 mr-auto">
                前のストーリー
            </RouterLink>
            <RouterLink 
                v-if="!!episodeData?.Next"
                :to="`/v/${episodeData?.Next}`"
                class="hover:text-[#ff5e8f] transition-colors pr-6 ml-auto">
                次のストーリー
            </RouterLink>
        </div>
    </div>
</template>