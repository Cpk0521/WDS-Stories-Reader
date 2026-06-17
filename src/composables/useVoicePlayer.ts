import { onUnmounted } from 'vue'
import { getVoiceUrl } from '../config';

let voicePlayer: HTMLAudioElement | null = null;

export function useVoicePlayer() {
    const playVoice = (storyId: number, voiceFileName: string) => {
        voicePlayer = voicePlayer || new Audio();
        
        if (!voicePlayer.paused) {
            voicePlayer.pause()
            voicePlayer.currentTime = 0
        }

        voicePlayer.src = `${getVoiceUrl(storyId, voiceFileName)}`
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
        playVoice,
        stopVoice
    }
}