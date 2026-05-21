import { createRouter, createWebHashHistory } from 'vue-router'
import { CATEGORY_MAP } from "../utils/constants";

const routeMap = CATEGORY_MAP.map((tab) => {
  return {
    path: `/${tab.name}`,
    name: tab.name,
    component: () => import(`../views/Panel/${tab.name}Panel.vue`),
  };
});

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/Main',
    },
    ...routeMap,
    {
      path: '/v/:id',
      name: 'BaseViewer',
      component: () => import('../views/Reader/ReaderView.vue'),
    },
    {
      path: '/c/:id',
      name: 'ComicViewer',
      component: () => import('../views/Reader/ComicReaderView.vue'),
    },
    {
      path: '/p/:id',
      name: 'PosterViewer',
      component: () => import('../views/Reader/PosterReaderView.vue'),
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    }
  ],
  scrollBehavior(_to, _from, _savedPosition){
    return { top: 0, behavior: 'instant' }
  }
})


export default router