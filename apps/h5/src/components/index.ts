import type { App, Plugin } from 'vue';

export * from './loading';

import InfiniteLoading from './InfiniteLoading.vue';
import LocalePicker from './LocalePicker.vue';
import Tabbar from './tabbar/Tabbar.vue';

export { Tabbar, InfiniteLoading, LocalePicker };

const ComponentsPlugin: Plugin = {
  install(app: App) {
    app.component('Tabbar', Tabbar);
    app.component('InfiniteLoading', InfiniteLoading);
    app.component('LocalePicker', LocalePicker);
  },
};

export default ComponentsPlugin;
