export const CONFIG = {
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  PORT: import.meta.env.VITE_PORT || 2112,
  APP_URL: import.meta.env.VITE_APP_URL || '',
  PUBLIC_KEY: import.meta.env.VITE_PUBLIC_KEY || ''
};
