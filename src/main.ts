import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr.js';

dayjs.extend(RelativeTime);
dayjs.locale('fr');

import { router } from './router.ts';

createApp(App).use(router).mount('#app');
