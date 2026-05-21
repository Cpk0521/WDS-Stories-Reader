<script setup lang="ts">
import { computed, onMounted} from 'vue';
import { useMasterlistStore } from '../../store/masterlist';
import EventCard from '../../components/Card/EventCard.vue';
import PanelTitle from "../../components/PanelTitle.vue";

const masterlistStore = useMasterlistStore();
const data = computed(() => masterlistStore.special || null);

onMounted(()=>{
    document.title = `Stories Archive Reader | World Dai Star: Yume no Stellarium`
})

</script>

<template>
    <PanelTitle 
        :Title="'限定ストーリー'" 
        :subtitle="`合計 ${data?.length ?? 'N/A'} ストーリー`"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <EventCard 
            v-for="event in data" 
            :key="event.Id" 
            :eid="event.Id" 
            :title="event.Title"
            :episode="event.Episode"
            :hiddenImg="true"
        />
    </div>
</template>