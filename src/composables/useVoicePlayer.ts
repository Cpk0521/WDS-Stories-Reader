import { onUnmounted } from 'vue'
import { getVoiceUrl } from '../config';

const voicePlayer = new Audio();

export function useVoicePlayer() {
    const playVoice = (storyId: number, voiceFileName: string) => {
        if (!voicePlayer.paused) {
            voicePlayer.pause()
            voicePlayer.currentTime = 0
        }

        voicePlayer.src = `${getVoiceUrl(storyId, voiceFileName)}`
        voicePlayer.play();
    }

    const stopVoice = () => {
        voicePlayer.pause()
    }

    onUnmounted(() => {
        stopVoice()
    })

    return {
        playVoice,
        stopVoice
    }
}