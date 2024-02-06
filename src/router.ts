import { createRouter, createWebHistory, NavigationGuardWithThis } from 'vue-router';
import Home from './routes/Home.vue';
import Token from './routes/Token.vue';
import { parseAuthentication } from './modules/auth/auth.ts';

const authenticationGuard: NavigationGuardWithThis<undefined> = (to) => {
  if (to.path === '/token') {
    const token = parseAuthentication(window.location.hash.slice(1));
    if (token) {
      return { path: '/' };
    } else {
      return { path: '/403' };
    }
  }
};

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/token', component: Token },
  ],
});

router.beforeEach(authenticationGuard);
