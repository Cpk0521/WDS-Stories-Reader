<script setup lang="ts">
import type { IEpisodeUnit, IPosterUnit } from '../types/episode';
import { getNameById } from '../types/characterSet'

const {unit, isVoice} = defineProps<{
    unit : IEpisodeUnit & IPosterUnit,
    isVoice : boolean,
    voiceClick? : (CUEName : string) => void,
}>();

</script>

<template>
    <div class="flex items-start gap-4 md:gap-5 p-1">
        <div class="flex-none flex flex-col items-start justify-center">
            
            <div class="w-14 md:w-[78px] p-1 rounded-full relative select-none">
                <div class="w-full rounded-full">
                    <img :src="`./assets/characterlog/${(unit.SpeakerIconId ?? unit.CharacterId) ?? '1'}.png`">
                </div>
                
                <button 
                    v-show="isVoice"
                    @click="isVoice ? voiceClick?.(unit.VoiceFileName!) : ''"
                    class="absolute -bottom-1.5 -right-1 w-6 md:w-[32px] rounded-full bg-white text-gray-500 flex z-10"
                >
                    <img src="/assets/voice_btn.png">
                </button>
            </div>
        </div>

        <div class="flex-grow grid grid-rows-[25px] md:grid-rows-[30px] min-w-0">
            <span class="text-base md:text-lg row-span-1 text-gray-900 mb-1 ml-1 text-left">{{ (unit.SpeakerName ?? getNameById(unit.CharacterId)) ?? ''}}</span>

            <div class="relative w-full">
                <div class="absolute -left-2 top-3 w-2 h-4 pointer-events-none"
                    :class="(unit.SpeakerIconId ?? unit.CharacterId) === '1' ? 'text-[#4f5564]' : 'text-[#eb5c62]'">
                    <svg class="w-full h-full" viewBox="0 0 10 16" fill="currentColor">
                        <path d="M10,2 C8,4 2,7 0,8 C2,9 8,12 10,14 Z" />
                    </svg>
                </div>
                <div class="px-3 py-1.5 md:px-5 rounded-[15px] text-sm md:text-lg text-white text-left leading-relaxed tracking-tight whitespace-pre-line"
                    :class="(unit.SpeakerIconId ?? unit.CharacterId) === '1' ? 'bg-[#565867]' : 'bg-[#ee5f5f]'" >
                    {{ (unit.Phrase ?? unit.Description).replace(/(?:\/n)+/g, '\n') || ''}}
                </div>
            </div>
            
        </div>
    </div>
</template>