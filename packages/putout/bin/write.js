import process from 'node:process';

const {stdout} = process;
const write = stdout.write.bind(stdout);
const noop = () => {};

export const createWrite = (parentPort) => {
    if (!parentPort)
        return write;
    
    return noop;
};
