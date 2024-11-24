import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';

import relativeLinks from 'astro-relative-links';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [solidJs(), relativeLinks()]
});