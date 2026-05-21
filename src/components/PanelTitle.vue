<script setup lang="ts">

const { Title, subtitle } = defineProps<{
    Title: string;
    subtitle?: string;
}>();

</script>
<template>
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:mb-4">
        <div class="text-center md:text-left">
            <h1 
                class="text-3xl md:text-4xl font-black text-gray-900"
                :class="!subtitle || subtitle === '' ? 'mb-6' : 'mb-2'"
            >{{ Title }}</h1>
            <p class="text-gray-400 font-medium italic text-sm">{{ subtitle }}</p>
        </div>
        <slot></slot>
    </div>
</template>