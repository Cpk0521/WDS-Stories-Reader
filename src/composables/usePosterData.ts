import { ref } from 'vue'
import type { IPosterModel } from '../types/episode'
import { getEpisodeDataUrl } from '../config'

export function usePosterData() {
    const episodeData = ref<IPosterModel | null>(null)
    const error = ref<Error | null>(null);

    const fetchPosterData = async (episodeId : number) => {
        try {
            const response = await fetch(getEpisodeDataUrl(episodeId));
            const data = await response.json();
            episodeData.value = data as IPosterModel;
            return episodeData.value
        }catch (e) {
            error.value = e as Error;
        }
    }

    return {
        episodeData,
        error,
        fetchPosterData
    }  
}