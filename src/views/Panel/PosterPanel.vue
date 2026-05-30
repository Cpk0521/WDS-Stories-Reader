<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useMasterlistStore } from "../../store/masterlist";
import PosterCard from "../../components/Card/PosterCard.vue";
import PanelTitle from "../../components/PanelTitle.vue";

const masterlistStore = useMasterlistStore();
const fullPosterData = computed(() => masterlistStore.poster || null);
const comicsCount = computed(() => fullPosterData.value?.length ?? 'N/A');

onMounted(()=>{
    document.title = `ポスターストーリー | World Dai Star: Yume no Stellarium`
})

</script>

<template>
    <PanelTitle 
        :Title="'ポスターストーリー'" 
        :subtitle="`合計 ${comicsCount} ポスター`" 
    />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <PosterCard 
            v-for="poster in fullPosterData" 
            :key="poster.Id" 
            :pid="poster.Id" 
            :title="poster.Name"/>
    </div>
</template>
