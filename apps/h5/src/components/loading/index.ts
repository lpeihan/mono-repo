import { createApp } from 'vue';

import Loading from './Loading.vue';

let root;
let app;
let instance;

const loading = (message = '') => {
  if (root) {
    app.unmount();
  } else {
    root = document.createElement('div');
    document.body.appendChild(root);
  }

  app = createApp(Loading, {
    message,
    destroy() {
      if (app) {
        app.unmount();
        app = null;
      }

      if (root) {
        document.body.removeChild(root);
        root = null;
      }
    },
  });

  instance = app.mount(root);

  return instance;
};

export const showLoading = (message = '') => {
  loading(message).open();
};

export const closeLoading = () => {
  instance?.close();
};
