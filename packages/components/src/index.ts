import type { App, Plugin } from 'vue';

export { SvgIcon } from './SvgIcon';
export type { SvgIconProps } from './SvgIcon';

import SvgIcon from './SvgIcon';

export const ComponentsPlugin: Plugin = {
  install(app: App) {
    app.component('SvgIcon', SvgIcon);
  },
};

export default ComponentsPlugin;
