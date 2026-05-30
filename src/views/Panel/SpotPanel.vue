<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useMasterlistStore } from '../../store/masterlist';
import SpotCard from '../../components/Card/SpotCard.vue';
import PanelTitle from "../../components/PanelTitle.vue";
import { spotTypes } from "../../types/spotTypes";
import FilterButton from '../../components/FilterButton.vue';
import FilterSelection from '../../components/FilterSelection.vue';

const masterlistStore = useMasterlistStore();
const fullSpotData = computed(() => masterlistStore.spot || null);
const filteredSpots = computed(() => {
    return fullSpotData.value.filter(spot => {
        const matchesSpotType = selectedSpot.value === 'All' || spot.Spot === selectedSpot.value;
        return matchesSpotType;
    });
})

const isFilterPanelOpen = ref(false);
const selectedSpot = ref('All');

onMounted(()=>{
    document.title = `スポットストーリー | World Dai Star: Yume no Stellarium`
})

</script>

<template>
    <PanelTitle :Title="'スポットストーリー'" :subtitle="`合計 ${fullSpotData.length} スポット`">
        <FilterButton v-model="isFilterPanelOpen" />
    </PanelTitle>

    <FilterSelection 
        v-model:isFilterPanelOpen="isFilterPanelOpen"
        v-model:selectedItem="selectedSpot"
        :items="spotTypes"
    />
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <SpotCard 
            v-for="spot in filteredSpots" 
            :key="spot.EpisodeId" 
            :sid="spot.EpisodeId" 
            :title="spot.Title"
            :spot="spot.Spot"
            :members="spot.CharacterIds"
        />
    </div>

</template>