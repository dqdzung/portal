import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [svgr(), react()],
    define: {
      'process.env': process.env
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: 'localhost',
      port: +env.VITE_PORT,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_APP_URL,
          secure: false,
          changeOrigin: true
        }
        // "/api/hrm": {
        // 	target: env.VITE_APP_HRM_URL,
        // 	secure: false,
        // 	changeOrigin: true,
        // },
      }
    },
    esbuild: {
      drop: mode !== 'development' ? ['console', 'debugger'] : []
    }
  };
});
