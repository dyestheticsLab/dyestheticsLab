import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  globalStyles: path.join(__dirname, 'styles/index.css'),
  base: '/dyestheticsLabGHPages/',
  root: path.join(__dirname, 'docs'),
  title: 'My Site',
  icon: '/dystopian-eye.webp',
  logo: {
    light: '/dystopian-eye.webp',
    dark: '/dystopian-eye.webp',
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/web-infra-dev/rspress',
      },
    ],
  },
});
