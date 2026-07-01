import { ref } from "vue";
import type { IEpisodeModel } from "../types/episode";
import { getEpisodeDataUrl } from "../config";

export function useEpisodeData() {
    const episodeData = ref<IEpisodeModel | null>(null);
    const error = ref<Error | null>(null);

    const fetchEpisodeData = async (episodeId: number) => {
        try {
            const response = await fetch(getEpisodeDataUrl(episodeId));
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const data = await response.json();
            episodeData.value = data as IEpisodeModel;
            return episodeData.value;
        } catch (e) {
            error.value = e as Error;
        }
    };

    return {
        episodeData,
        error,
        fetchEpisodeData,
    };
}
