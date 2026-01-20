import GlobalComponentsPlugin from '@mono/components';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import ComponentsPlugin from './components';
import { i18n } from './locales';
import router from './router';

import '@vant/touch-emulator';

import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

import './styles/index.less';
import './styles/tailwind.css';

const pinia = createPinia();
const app = createApp(App);

app.use(i18n).use(pinia).use(router).use(ComponentsPlugin).use(GlobalComponentsPlugin);

app.mount('#app');
