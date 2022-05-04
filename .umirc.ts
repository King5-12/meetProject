import { defineConfig } from 'umi';

const WINDOW_CONFIG = {
    API_HOST: process.env.API_HOST || 'http://172.20.90.123:10020',
};

const htmlExtraScript =
    process.env.NODE_ENV === 'development'
        ? `window.APP_CONFIG = ${JSON.stringify(WINDOW_CONFIG)}`
        : `<%- htmlExtraScript %>`;

export default defineConfig({
    dynamicImport: {},
    nodeModulesTransform: {
        type: 'none',
    },
    headScripts: [htmlExtraScript],
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
