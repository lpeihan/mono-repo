/// <reference types="vite/client" />

// vite-plugin-svg-icons 类型声明
declare module 'virtual:svg-icons-register' {
  const component: any;
  export default component;
}

declare module 'virtual:svg-icons-names' {
  const iconsNames: string[];
  export default iconsNames;
}
