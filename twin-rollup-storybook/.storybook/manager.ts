import { addons } from '@storybook/manager-api';

const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

addons.setConfig({
  theme: {
    base: preferredTheme,
    brandTitle: 'twin.macro rollup',
    brandUrl: '/',
    // brandImage: '/logo.svg',
    brandTarget: '_self',
  },
});