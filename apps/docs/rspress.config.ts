import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  globalStyles: path.join(__dirname, 'styles/index.css'),
  base: '/dyestheticsLabGHPages/',
  root: path.join(__dirname, 'docs'),
  title: 'Dyesthetics Lab',
  icon: '/dystopian-eye.webp',
  logo: {
    light: '/dystopian-eye.webp',
    dark: '/dystopian-eye.webp',
  },
  head: [
    ['meta', { name: 'keywords', content: 'dyesthetics, dyesthetics lab, desing system, react, tailwind, tailwind variants, tailwind utils, react component creators' }]
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/dyestheticsLab/dyestheticsLab',
      },
    ],
  },
});
