import { defineConfig } from 'umi';

export default defineConfig({
    dynamicImport: {},
    nodeModulesTransform: {
        type: 'none',
    },
    title: 'meetProject',
    favicon: '/favicon.ico',
    hash: true,
    theme: {
        'primary-color': '#4961AB',
        'border-radius-base': '4px',
    },
    fastRefresh: {},

    ignoreMomentLocale: true,
});
