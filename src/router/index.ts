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
      redirect: (to) => {
        const pathString = Array.isArray(to.params.pathMatch) 
          ? to.params.pathMatch[0] 
          : to.params.pathMatch;
        const isValidCategory = CATEGORY_MAP.some(tab => tab.name === pathString);
        if (isValidCategory) {
          return { path: `/${pathString}` }; // 導向到 /#/Main
        }

        const pathname = window.location.pathname;
        const urlParams = new URLSearchParams(window.location.search);
        const oldId = urlParams.get('id');

        if (pathname.endsWith('comic.html') && oldId) {
          return { name: 'ComicViewer', params: { id: oldId } };
        }
        if (pathname.endsWith('viewer.html') && oldId) {
          return { name: 'BaseViewer', params: { id: oldId } };
        }

        return { name: 'RealNotFound' };
      }
    },
    {
      path: '/not-found',
      name: 'RealNotFound',
      component: () => import('../views/NotFound.vue'),
    }
  ],
  scrollBehavior(_to, _from, _savedPosition){
    return { top: 0, behavior: 'instant' }
  }
})


export default router