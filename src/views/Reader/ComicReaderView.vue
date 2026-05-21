<script setup lang="ts">
import { ref, computed, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMasterlistStore } from '../../store/masterlist';
import type { IComicData } from '../../types';
import { getComicDataUrl } from '../../config';
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'

const route = useRoute()
const router = useRouter()
const masterlistStore = useMasterlistStore();

const comicId = ref<number>(Number(route.params.id) || 0)
const comicdata = computed<IComicData | null>(() => {
    const list = masterlistStore.comic
    if (!list) return null
    return list.find(c => c.id === comicId.value) || null
})
const fullcomicdata = computed(() => masterlistStore.comic || null)

watch(
    () => comicdata.value?.title,
    (newTitle) => {
        document.title = `${newTitle || '？？？'} | World Dai Star: Yume no Stellarium`
    },
    { immediate: true }
)

watch(
    [() => fullcomicdata, () => comicdata.value],
    ([storeComic, currentComic]) => {
        let isApiLoaded = storeComic && storeComic.value.length > 0;
        if (isApiLoaded && !currentComic) {
            router.replace({ name: 'NotFound' })
        }
    },
    { immediate: true }
)

watch(
    () => route.params.id, 
    (newId) => {
        comicId.value = Number(newId) || 0
    }
)

const onSelectEpisode = () => {
    if (comicId.value) {
        router.push(`/c/${comicId.value}`)
    }
}

</script>

<template>
    <div class="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden pb-8">
        <h1 class="text-2xl font-bold text-center p-3">{{ comicdata?.title }}</h1>
        <img :src="getComicDataUrl(comicdata?.filename)" alt="{{ comicdata?.title }}" class="w-full xl:max-w-xl mx-auto object-contain" v-if="comicdata?.filename"/>
        
        <div class="flex items-center justify-between w-full mt-6 pt-4 px-4 border-t border-gray-100 gap-3">
            <RouterLink 
                :to="`/c/${comicId - 1}`"
                class="flex-1"
            >
                <button
                    :disabled="comicId === 1"
                    class="w-full py-3 px-4 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold text-gray-600 active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center gap-1.5"
                >
                    <PhCaretLeft :size="16" class="text-gray-600"/>
                    <span>上一話</span>
                </button>
            </RouterLink>
            
            <!-- 選擇話數選單 -->
            <div class="relative flex-1">
                <select 
                    v-model="comicId"
                    @change="onSelectEpisode"
                    
                    class="w-full py-3 px-3 rounded-xl border border-[#ff5e8f]/20 text-xs font-black text-[#ff5e8f] text-center appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff5e8f]"
                >
                    <option v-for="comic in fullcomicdata" :key="comic.id" :value="comic.id" >
                        第 {{ comic.id }} 話
                    </option>
                </select>
            </div>

            <RouterLink 
                :to="`/c/${comicId + 1}`"
                 class="flex-1"
            >
                <button
                    :disabled="comicId === fullcomicdata.length"
                    class="w-full py-3 px-4 rounded-xl bg-[#ff5e8f] text-sm font-bold text-white active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                    <span>下一話</span>
                    <PhCaretRight :size="16" class="text-white" />
                </button>
            </RouterLink>

        </div>
    </div>
</template>