interface ImportMetaEnv {
  readonly VITE_API_BASE: string;
  readonly VITE_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
