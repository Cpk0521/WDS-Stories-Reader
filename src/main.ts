import './index.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from "pinia";
import { useMasterlistStore } from './store/masterlist';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

const masterlistStore = useMasterlistStore();
masterlistStore.loadMasterlist().then(() => {
  console.log('Masterlist loaded in App.vue');
}).catch((error) => {
  console.error('Failed to load masterlist:', error);
});

app.use(router).mount('#app');