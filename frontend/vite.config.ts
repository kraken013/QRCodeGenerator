import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'], 
      manifest: {
        name: 'QR Code Generator',
        short_name: 'QR Code Generator',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/public/assets/qrcode_icon_b.png',
            sizes: '128x128',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
