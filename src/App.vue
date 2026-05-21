<script setup lang="ts">
import HeaderBar from './components/Header.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <HeaderBar />
    <main class="w-full flex-grow p-4 md:p-6 md:max-w-5xl mx-auto flex flex-col gap-4">
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
