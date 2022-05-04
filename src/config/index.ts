export const apiPrefix = `${window.APP_CONFIG.API_HOST}/audit`;

export const UAC_PATH = `${window.APP_CONFIG.API_HOST}/auth/login?callback=${window.location.origin}${window.location.pathname}`;

export const group = window.APP_CONFIG.GROUP || '';
