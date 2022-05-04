/**
 * @param {function} fn 需要防抖的方法
 * @param {number} interval 时间间隔
 * @return {Function} 返回防抖后的方法
 */
export const debounce = (fn: Function, interval = 300) => {
    let timer: any = null;

    return function(...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, interval);
    };
};
