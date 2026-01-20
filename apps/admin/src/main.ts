import GlobalComponentsPlugin from '@mono/components';
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import 'virtual:svg-icons-register';

import App from './App.vue';
import { i18n } from './locales';
import { router } from './router';
import { useThemeStore } from './stores';

import 'ant-design-vue/dist/reset.css';
import './styles/index.less';
import './styles/tailwind.css';

const pinia = createPinia();
const app = createApp(App);

app.use(Antd).use(i18n).use(pinia).use(router).use(GlobalComponentsPlugin);

const themeStore = useThemeStore();
themeStore.initTheme();
themeStore.initColorPrimary();

app.mount('#app');
