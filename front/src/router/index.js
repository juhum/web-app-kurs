import { createRouter, createWebHashHistory } from 'vue-router'
import Start from '../views/StartView.vue'
import Ringing from '../views/RingingView.vue'
import Connected from '../views/ConnectedView.vue'
import Answered from '../views/AnsweredView.vue'
import Failed from '../views/FailedView.vue'
import NotFound from '../views/NotFoundView.vue'
const routes = [
  {
    path: '/',
    name: 'start',
    component: Start
  },
  {
    path: '/ringing',
    name: 'ringing',
    component: Ringing,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/connected',
    name: 'connected',
    component: Connected,
    meta: { requiresAuth: true }
  },
  {
    path: '/answered',
    name: 'answered',
    component: Answered,
    meta: { requiresAuth: true }
  },
  {
    path: '/failed',
    name: 'failed',
    component: Failed,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const callInitiated = localStorage.getItem('callInitiated');
    if (callInitiated === 'true') {
      next();
    } else {
      next({ name: 'start' });
    }
  } else {
    next();
  }
});

export default router