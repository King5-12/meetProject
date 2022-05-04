interface StorageInterface {
    storage: {
        getItem(key: string): string | null;
        setItem(key: string, value: string): void;
        removeItem(key: string): void;
    };
    get(): string;
    set(value: string): void;
    remove(): void;
}

const genStorage = (
    key: string,
    storageName: 'localStorage' | 'sessionStorage',
): StorageInterface => ({
    storage: window[storageName],

    get(): string {
        return this.storage.getItem(key) || '';
    },

    set(value: string): void {
        this.storage.setItem(key, value);
    },

    remove(): void {
        this.storage.removeItem(key);
    },
});

const genLocalStorage = (key: string) => genStorage(key, 'localStorage');
// const genSessionStorage = (key: string) => genStorage(key, 'sessionStorage');

const KEY_TOKEN = 'meetProject_token';
const KEY_EMPLOYEE_ID = 'mock_employee_id'; // 用户id的token，只用于dev和qa环境方便测试

export const tokenStorage = genLocalStorage(KEY_TOKEN);
export const employeeIdStorage = genLocalStorage(KEY_EMPLOYEE_ID);
