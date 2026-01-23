/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly ENV_WEBSITE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
