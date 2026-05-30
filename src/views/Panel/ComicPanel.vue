<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMasterlistStore } from '../../store/masterlist';
import PanelTitle from "../../components/PanelTitle.vue";
import SortButton from '../../components/SortButton.vue';
import ComicCard from '../../components/Card/ComicCard.vue';

const masterlistStore = useMasterlistStore();
const fullcomicsData = computed(() => masterlistStore.comic || null);
const comicsCount = computed(() => fullcomicsData.value?.length ?? 'N/A');

const sortOrder = ref<string>('asc');
const sortedComics = computed(() => {
    const data = [...fullcomicsData.value];
    return sortOrder.value === 'desc'
        ? data.sort((a, b) => b.id - a.id)
        : data.sort((a, b) => a.id - b.id);
})

onMounted(()=>{
    document.title = `コミック | World Dai Star: Yume no Stellarium`
})

</script>

<template>
    <PanelTitle :Title="'コミック'" :subtitle="`合計 ${comicsCount} 話`">
        <SortButton v-model="sortOrder"/>
    </PanelTitle>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <ComicCard 
            v-for="comic in sortedComics" 
            :key="comic.id" 
            :cid="comic.id" 
            :title="comic.title">
        </ComicCard>
    </div>

</template>