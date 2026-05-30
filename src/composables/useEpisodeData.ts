import { ref } from 'vue'
import type { IEpisodeModel } from '../types/episode'
import { getEpisodeDataUrl, getEpisodeVoiceDataUrl } from '../config'

export function useEpisodeData() {
    const episodeData = ref<IEpisodeModel | null>(null)
    const voiceData = ref<string[] | null>(null)
    const error = ref<Error | null>(null);
    const VoiceError = ref<Error | null>(null);

    const fetchEpisodeData = async (episodeId : number) => {
        try {
            const response = await fetch(getEpisodeDataUrl(episodeId));
            const data = await response.json();
            episodeData.value = data as IEpisodeModel;
            return episodeData.value
        }catch (e) {
            error.value = e as Error;
        }
    }

    const fetchVoiceData = async(episodeId : number) => {
        try {
            const response = await fetch(getEpisodeVoiceDataUrl(episodeId));
            const data = await response.json();
            voiceData.value = data;
        }catch (e) {
            VoiceError.value = e as Error;
        }
    }

    return {
        episodeData,
        voiceData,
        error,
        VoiceError,
        fetchEpisodeData,
        fetchVoiceData
    }  
}