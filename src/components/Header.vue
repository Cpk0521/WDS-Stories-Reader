<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from "vue-router";
import { CATEGORY_MAP } from "../utils/constants";
import { useMasterlistStore } from '../store/masterlist';
import { PhGithubLogo, PhX, PhList, PhClock } from "@phosphor-icons/vue";
const route = useRoute();

const masterlistStore = useMasterlistStore();
const updatedDate = computed(() => masterlistStore.date || 'N/A');

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

</script>

<template>
    <header class="bg-white/80 backdrop-blur-md border-b border-slate-200 z-20 shadow-sm transition-all ">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16 gap-4">

                <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    <div class="lg:hidden flex-none">
                        <button @click="toggleSidebar" class="p-2 rounded-md border border-slate-200 hover:bg-gray-100 text-slate-500 focus:outline-none transition-colors">
                            <PhList a="w-8 h-8" />
                        </button>
                    </div>
                    
                    <div class="flex items-center gap-3 flex-shrink-0 cursor-pointer" >
                        <img
                            src="/assets/logo/logo_999.png"
                            alt="Logo"
                            class="h-10 flex items-center justify-center"
                        />
                    </div>
                </div>

                <!-- 右側 -->
                <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    <div class="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                        <PhClock class="text-sm text-primary" />
                        <span>Latest update: {{ updatedDate }}</span>
                    </div>

                    <a href="https://github.com/Cpk0521/WDS-Stories-Reader" target="_blank" 
                    class="flex items-center justify-center w-10 h-10 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors bg-gradient-to-tr from-primary to-secondary shadow-md shadow-primary/20" title="GitHub Repository">
                        <PhGithubLogo class="text-2xl" />
                    </a>
                </div>
            </div>

            <div class="hidden lg:block">
                <ul class="flex max-w-6xl mx-auto justify-between">
                    <li v-for="tab in CATEGORY_MAP" :key="tab.name" class="relative group cursor-pointer">
                        <RouterLink 
                            :key="tab.name"
                            :to="`/${tab.name}`"
                            class="block py-3 text-2sm font-bold whitespace-nowrap transition-colors duration-200"
                            :class="route.name === tab.name ? 'text-[#00a6f4]' : 'text-gray-500 hover:text-gray-800'"
                        >
                            {{ tab.label }}
                        </RouterLink>
                        <div 
                            class="absolute bottom-0 left-0 w-full h-1 bg-[#00a6f4] transition-opacity duration-300"
                            :class="route.name === tab.name ? 'opacity-100' : 'opacity-0'"
                        ></div>
                    </li>
                </ul>
            </div>
        </div>
    </header>

    <div>
        <div v-if="isSidebarOpen" @click="toggleSidebar" class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden"></div>
        <div 
            class="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden"
            :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        >
            <div class="flex items-center justify-end p-4 border-gray-200 text-gray-500">
                <button @click="toggleSidebar" class="p-2 rounded-md hover:bg-gray-100">
                    <PhX class="w-6 h-6" />
                </button>
            </div>
            <div class="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 mx-6 px-3 py-1.5 rounded-full border border-slate-200 md:hidden">
                <PhClock class="text-sm text-primary" />
                <span>Latest update: {{ updatedDate }}</span>
            </div>
            <ul class="py-2 text-center ">
                <li v-for="tab in CATEGORY_MAP" :key="tab.name">
                    <RouterLink 
                        :key="tab.name"
                        :to="`/${tab.name}`"
                        class="w-full block px-6 py-4 text-4sm font-bold transition-colors text-left"
                        :class="route.name === tab.name ? 'text-[#00a6f4] bg-blue-50 border-l-4 border-[#00a6f4]' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'"
                    >
                        {{ tab.label }}
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
