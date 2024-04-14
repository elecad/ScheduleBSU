export const debounce = (mainFunction, delay) => {
    let timer: number
    return function (...args) {
        console.log(timer)
        clearTimeout(timer);
        timer = setTimeout(() => {
            mainFunction(...args);
        }, delay) as unknown as number;
    };
};