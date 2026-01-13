import exec from 'execon';

export const time = (name) => {
    exec.ifExist(console, 'time', [name]);
};
