import type { App, Plugin } from 'vue';

export { SvgIcon } from './SvgIcon';
export type { SvgIconProps } from './SvgIcon';
export { ModalManager } from './ModalManager';

import ModalManager from './ModalManager';
import SvgIcon from './SvgIcon';

export const ComponentsPlugin: Plugin = {
  install(app: App) {
    app.component('SvgIcon', SvgIcon);
    app.component('ModalManager', ModalManager);
  },
};

export default ComponentsPlugin;
