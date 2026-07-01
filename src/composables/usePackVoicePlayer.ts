import { ref, onUnmounted } from 'vue'
import { getEpisodeVoicePackUrl } from '../config';

let voicePlayer: HTMLAudioElement | null = null;
let mimeType : string = 'audio/mpeg';
let audioMap : Map<string, any> = new Map();

export function usePackVoicePlayer() {
    const VoicePackError = ref<Error | null>(null);
    const indexTable = ref<Record<string, { offset: number; length: number }>>({})
    
    const fetchVoicePack = async(episodeId : number) => {
        try {
            const response = await fetch(getEpisodeVoicePackUrl(episodeId));
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const arrayBuffer = await response.arrayBuffer();

            const view = new DataView(arrayBuffer);
            const jsonLength = view.getUint32(0, true); 

            const jsonUint8Array = new Uint8Array(arrayBuffer, 4, jsonLength);
            const decoder = new TextDecoder('utf-8');
            const metaJSON = JSON.parse(decoder.decode(jsonUint8Array));
            indexTable.value = metaJSON;

            const audioBlockStartOffset = 4 + jsonLength;
            const totalBlob = new Blob([arrayBuffer]);

            for (const cueName in metaJSON) {
                const { offset, length } = metaJSON[cueName];
                const absoluteOffset = audioBlockStartOffset + offset;
                const audioSegmentBlob = totalBlob.slice(absoluteOffset, absoluteOffset + length, mimeType);
                const blobUrl = URL.createObjectURL(audioSegmentBlob);
                audioMap.set(cueName, blobUrl);
            }

        }catch (e) {
            console.log(e)
            VoicePackError.value = e as Error;
        }
    }

    const playVoice = (cueName : string) => {
        voicePlayer = voicePlayer || new Audio();

        if (!voicePlayer.paused) {
            voicePlayer.pause()
            voicePlayer.currentTime = 0;
        }

        voicePlayer.src = audioMap.get(cueName);
        voicePlayer.play();
    }

    const stopVoice = () => {
        if (voicePlayer) {
            voicePlayer.pause()
        }
    }

    onUnmounted(() => {
        stopVoice()
    })

    return {
        fetchVoicePack,
        VoicePackError,
        playVoice,
        stopVoice,
        audioMap,
        indexTable
    }
}