<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useMasterlistStore } from '../../store/masterlist';
import EventCard from '../../components/Card/EventCard.vue';
import PanelTitle from "../../components/PanelTitle.vue";
import SortButton from '../../components/SortButton.vue';
import FilterButton from '../../components/FilterButton.vue';
import FilterSelection from '../../components/FilterSelection.vue';

const masterlistStore = useMasterlistStore();
const fullEventData = computed(() => masterlistStore.event || null);
const eventCount = computed(() => fullEventData.value?.length ?? 'N/A');
const sortedEvents = computed(() => {
    const data = [...fullEventData.value];
    const fitlered = data.filter(event => {
        const matchesYear = selectedYear.value === 'All' || event.Date.toString().startsWith(selectedYear.value);
        return matchesYear;
    });
    return sortOrder.value === 'desc'
        ? fitlered.sort((a, b) => b.Date.toString().localeCompare(a.Date.toString()))
        : fitlered.sort((a, b) => a.Date.toString().localeCompare(b.Date.toString()));
});

const isFilterPanelOpen = ref(false);
const selectedYear = ref('All');
const sortOrder = ref('asc');

onMounted(()=>{
    document.title = `Stories Archive Reader | World Dai Star: Yume no Stellarium`
})

</script>

<template>
    <PanelTitle :Title="'イベントストーリー'" :subtitle="`合計 ${eventCount} イベント`">
        <div class="flex flex-wrap items-center justify-center gap-2">
            <FilterButton v-model="isFilterPanelOpen" />
            <SortButton v-model="sortOrder" />
        </div>
    </PanelTitle>

     <FilterSelection 
        v-model:isFilterPanelOpen="isFilterPanelOpen"
        v-model:selectedItem="selectedYear"
        :items="['2023', '2024', '2025', '2026']"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <EventCard 
            v-for="event in sortedEvents" 
            :key="event.Id" 
            :eid="event.Id"
            :title="event.Title"
            :date="event.Date"
            :episode="event.Episode">
        </EventCard>
    </div>
</template>
