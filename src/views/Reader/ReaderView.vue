<script setup lang="ts">
import { ref, onMounted, computed, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PhX, PhPlay, PhArrowSquareOut, PhPictureInPicture } from "@phosphor-icons/vue";
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
// const videoWrapperRef = ref<HTMLIFrameElement | null>(null);
// const isPipActive = ref(false);

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

// const togglePictureInPicture = async () => {
//     const docPI = (window as any).documentPictureInPicture;
    
//     if (!docPI) {
//         alert("您的瀏覽器不支援 Picture-in-Picture");
//         return;
//     }

//     if (docPI.window) {
//         docPI.window.close();
//         isPipActive.value = false;
//         const target = document.getElementById("video-wrapper");
//         if (target && videoWrapperRef.value) {
//             target.appendChild(videoWrapperRef.value);
//         }
//         return;
//     }

//     if (!videoWrapperRef.value) return;

//     try {
//         const pipWindow = await docPI.requestWindow({
//             width: 960,
//             height: 540,
//         });

//         const style = pipWindow.document.createElement("style");
//         style.textContent = `
//             * { margin: 0; padding: 0;}
//             html, body, div { width: 100%; height: 100%; overflow: hidden; }
//             #pip-container { width: 100%; height: 100%; }
//             #pip-container iframe { width: 100%; height: 100%; border: none; }
//         `;
//         pipWindow.document.head.append(style);

//         const container = pipWindow.document.createElement("div");
//         container.id = "pip-container";
//         container.appendChild(videoWrapperRef.value);
//         pipWindow.document.body.append(container);

//         isPipActive.value = true;

//         pipWindow.addEventListener("pagehide", () => {
//             isPipActive.value = false;
//             const target = document.getElementById("video-wrapper");
//             if (target && videoWrapperRef.value) {
//                 target.appendChild(videoWrapperRef.value);
//             }
//         });
//     } catch (err) {
//         console.error("PiP error:", err);
//     }
// };

</script>

<template>
    <div class="w-full bg-white rounded-2xl border border-gray-200/80 p-3 md:p-6 shadow-sm flex flex-col items-center">
        
        <div class="w-full border-b border-gray-200 pb-6 flex flex-col items-center gap-6 mb-4">
            <!-- 故事標題 -->
            <div class="text-center">
                <h1 class="text-xl md:text-2xl font-black text-gray-900 tracking-wide">{{ epdata?.Chapter }}</h1>
                <p class="text-sm md:text-base font-bold text-gray-500 mt-2">{{ epdata?.Title }}</p>
            </div>

            <transition name="slide-fade">
                <div v-if="isVideoOpen" class="w-full overflow-hidden">
                    <div class="aspect-[16/9] w-full bg-gray-100" id="video-wrapper">
                        <iframe 
                            ref="videoWrapperRef"
                            class="w-full h-full"
                            :src="`https://cpk0521.github.io/WDS_Adv_Player/?id=${episodeId}`" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </transition>

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
                <!-- <button 
                    v-if="isVideoOpen"
                    @click="togglePictureInPicture" 
                    class="w-14 h-10 rounded-xl bg-purple-500 hover:bg-purple-600 active:scale-95 transition-all text-white flex items-center justify-center shadow hover:shadow-lg"
                >
                    <PhPictureInPicture v-if="isVideoOpen && !isPipActive" :size="22" class="text-white"/>
                    <PhX v-else-if="isVideoOpen && isPipActive" :size="22" class="text-white"/>
                </button> -->
            </div>
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